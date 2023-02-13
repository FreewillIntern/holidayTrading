import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    holidays: [],
    markets: [],
    marketCode: "",
    marketName: "",
    year: "",
  }),

  getters: {
    getDataInserted(state) {
      return state.holidays;
    },
    getDataHolidays(state) {
      return state.holidays;
    },
    getDataMarket(state) {
      return state.markets;
    },
  },

  actions: {
    updateHolidays(holidays) {
      if (holidays !== undefined) {
        this.holidays = holidays;
      } else {
        this.holidays = [];
      }
    },
  },
});
