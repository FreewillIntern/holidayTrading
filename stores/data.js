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
    getDataMarket(state) {
      return state.markets;
    },
  },

  actions: {
    updateHolidays() {
      fetch(
        `https://10.22.26.103/beam/holiday?mkt=${this.marketCode}&year=${this.year}`
      )
        .then((response) => response.json())
        .then((result) => {
          this.holidays = result;
          console.log("this.holidays.length: ", this.holidays.length);
        });
    },
  },
});
