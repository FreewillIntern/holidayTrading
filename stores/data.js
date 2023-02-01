import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({
        holidays: []
    }),

    getters: {
        getDataInserted(state) {
            return state.holidays;
        },
    },

    actions: {
        reset() {
            this.counter = 0
        },
    },
})
