import {defineStore} from "pinia";
import {useDatabaseStore} from "./database";

export type Location = { latitude: number, longitude: number };

export type Mood = {
    mood: number;
    text: string | null;
    location: Location | null;
    image: Blob | null;
    timestamp: string;
};

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

            const databaseStore = useDatabaseStore();

            if (this.mood === null) {
                throw Error("Mood is not set");
            }
            if (this.timestamp === null) {
                throw Error("Timestamp is not set");
            }

            const mood: Mood = {
                mood: this.mood,
                text: this.text,
                location: this.location,
                image: this.image,
                timestamp: this.timestamp,
            };
            databaseStore.insertEntry(mood).then(() => this.sqlQuery = true);
        },
    },
});
