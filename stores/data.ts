import { defineStore } from "pinia";

interface StateType {
  holidays: Holiday[];
  markets: Market[];
  marketCode: string;
  marketName: string;
  year: string;
}

interface Holiday{
  mktcode: string,
  cantrade: string,
  description: string,
  holidaydate: string
}

interface Market {
  mktcode: string;
  mktname: string;
}

export const useMainStore = defineStore("main", {
  state: ():StateType => ({
    holidays: [],
    markets: [],
    marketCode: "",
    marketName: "",
    year: "",
  }),

  getters: {
    getAllMarket(state) {
      return state.markets;
    },
    getMarketCode(state) {
      return state.marketCode;
    },
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
    updateHolidays(holidays: Holiday[]) {
      if (holidays !== undefined) {
        this.holidays = holidays;
      } else {
        this.holidays = [];
      }
    },
  },
});
