import {createApp} from 'vue'
import './style.scss'
import App from './App.vue'
import initSqlJs from "sql.js";
import SqlJsWasm from 'sql.js/dist/sql-wasm.wasm?url';
import {createPinia} from "pinia";

const SQL = await initSqlJs({
    locateFile: () => SqlJsWasm
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');

export {SQL};