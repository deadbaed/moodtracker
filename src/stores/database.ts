import {defineStore} from 'pinia';
import {SQL} from "../main";
import {Database} from "sql.js";
import {Mood} from "./newMood";

type DatabaseStore = {
    database: Database | null;
    name: string | null;
}

export const useDatabaseStore = defineStore('database', {
    state: (): DatabaseStore => ({database: null, name: null}),
    getters: {
        isDatabaseSet: (state) => state.database !== null,
        isNameSet: (state) => state.name !== null,
        setupIsComplete(): boolean {
            return this.isDatabaseSet && this.isNameSet;
        }
    },
    actions: {
        loadFromFile(arrayBuffer: ArrayBuffer) {
            // convert arrayBuffer to uint8array
            const uInt8Array = new Uint8Array(arrayBuffer);
            // open sqlite database
            this.database = new SQL.Database(uInt8Array);

            // get settings from database, put in store
            const stmt = this.database.prepare("select * from settings");
            stmt.step();
            const settings = stmt.getAsObject();

            if (settings.name === null) {
                throw Error("Invalid MoodTracker file");
            }
            this.setNameInStore(settings.name.toString());

            // free memory
            stmt.free();
        },
        createNew() {
            this.database = new SQL.Database();

            // create table to store moods
            const sql =
                "create table mood(timestamp text not null default current_timestamp, text text, image blob, latitude real, longitude real, mood integer not null);";
            this.database.run(sql);
        },
        setName(name: string) {
            if (this.database === null) {
                throw Error("MoodTracker file is not present");
            }
            // create table to store name
            this.database.run("create table settings (name text not null unique);")

            // insert name
            const stmt = this.database.prepare("insert into settings (name) values (?)")
            stmt.bind([name]);
            stmt.run();

            this.setNameInStore(name);

            // free memory
            stmt.free();
        },
        setNameInStore(name: string) {
            this.name = name;
        },
        download(): Blob {
            if (this.database === null) {
                throw Error("MoodTracker file is not present");
            }
            return new Blob([this.database.export()], {type: "application/vnd.sqlite3"});
        },
        async insertEntry(mood: Mood) {
            if (this.database === null) {
                throw Error("MoodTracker file is not present");
            }

            // Image preparation
            const imageArrayBuffer = await mood.image?.arrayBuffer();
            const image = (imageArrayBuffer !== undefined) ?  new Uint8Array(imageArrayBuffer) : null;

            // Location preparation
            const latitude = mood.location?.latitude || null;
            const longitude = mood.location?.longitude || null;

            // insert record
            const stmt = this.database.prepare("insert into mood (timestamp, text, image, latitude, longitude, mood) values (?, ?, ?, ?, ?, ?)")
            stmt.bind([mood.timestamp, mood.text, image, latitude, longitude, mood.mood]);
            stmt.run();

            // free memory
            stmt.free();
        },
    }
});