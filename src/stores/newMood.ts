import {defineStore} from "pinia";

export type Location = { latitude: number, longitude: number };

type NewMoodStore = {
    mood: number | null;
    text: string | null;
    location: Location | null;
    image: Blob | null;
    // Did the sql query to insert mood worked?
    sqlQuery: boolean | null;
    timestamp: string | null;
}

export const useNewMoodStore = defineStore('newMood', {
    state: (): NewMoodStore => ({
        mood: null,
        text: null,
        location: null,
        image: null,
        sqlQuery: null,
        timestamp: null,
    }),
    getters: {
        isMoodSaved: (state) => state.sqlQuery === true,
        getDate: (state) => {
            if (state.timestamp === null) {
                return null;
            }
            return state.timestamp.split("T")[0];
        }
    },
    actions: {
        setMood(value: number) {
            this.mood = value;
        },
        setText(value: string) {
            this.text = value;
        },
        noText() {
            this.text = null;
        },
        setLocation(value: Location) {
            this.location = value;
        },
        setImage(value: Blob) {
            this.image = value;
        },
        setTimestamp() {
            this.timestamp = new Date().toISOString();
        },
        save() {
            this.setTimestamp();

            // make sql query to save here

            this.sqlQuery = true;
        },
    },
});
