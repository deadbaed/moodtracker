import {defineStore} from "pinia";

export type Location = { latitude: number, longitude: number };

type NewMoodStore = {
    mood: number | null;
    text: string | null;
    location: Location | null;
    // TODO: define image
    image: any | null;
}

export const useNewMoodStore = defineStore('newMood', {
    state: (): NewMoodStore => ({
        mood: null,
        text: null,
        location: null,
        image: null,
    }),
    getters: {
    },
    actions: {
        setMood(value: number) {
            this.mood = value;
        }
    },
});
