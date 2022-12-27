import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import initSqlJs from "sql.js";
import SqlJsWasm from 'sql.js/dist/sql-wasm.wasm?url';

const SQL = await initSqlJs({
    locateFile: () => SqlJsWasm
});

createApp(App).mount('#app')

export { SQL };