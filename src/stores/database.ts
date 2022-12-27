import {defineStore} from 'pinia';
import {SQL} from "../main";
import {Database} from "sql.js";

export const useDatabaseStore = defineStore('database', {
    state: (): { database: Database | null } => ({database: null}),
    getters: {
        present: (state) => state.database !== null,
    },
    actions: {
        reset() {
            this.database = null;
        },
        loadFromFile(arrayBuffer: ArrayBuffer) {
            // convert arrayBuffer to uint8array
            const uInt8Array = new Uint8Array(arrayBuffer);
            // open sqlite database
            this.database = new SQL.Database(uInt8Array);
        },
        createNew() {
            this.database = new SQL.Database();

            // TODO: sql to create tables
        },
        selectAll() {
            // TODO: wrapper around this (null check)
            const moods = this.database?.exec("select * from mood");
            console.log(moods);
        }
    }
});