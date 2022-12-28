import {defineStore} from 'pinia';
import {SQL} from "../main";
import {Database} from "sql.js";


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

            // TODO: get name from db, put in store
        },
        createNew() {
            this.database = new SQL.Database();

            // TODO: sql to create table
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
        selectAll() {
            if (this.database === null) {
                throw Error("MoodTracker file is not present");
            }

            const moods = this.database.exec("select * from mood");
            console.log(moods);
        }
    }
});