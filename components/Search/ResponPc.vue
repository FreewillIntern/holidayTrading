<template>
    <div class="w-full h-full bg-slate-50 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] rounded-lg overflow-auto">
      <div class="h-full w-full flex justify-evenly items-center">
        <div class="flex">
          <h1 class="min-w-fit">Year :</h1>
          <input list="years" v-model="year" v-maska data-maska="####"
            class="inputYear ml-2 w-[180px] border-b-2 border-[rgb(84,84,84)] bg-transparent outline-none" />
          <datalist id="years">
            <option v-for="(y, i) in years" :key="i" :value="y"></option>
          </datalist>
        </div>
  
        <div class="flex">
          <h1 class="min-w-fit">Market :</h1>
          <input list="markets" v-model="market" v-maska data-maska="HHHHHHHHHHHHHHHHHHHH"
            data-maska-tokens="H:[a-zA-Z0-9]"
            class="inputMarket ml-2 w-[240px] border-b-2 border-[rgb(84,84,84)] bg-transparent outline-none uppercase" />
          <datalist id="markets">
            <option v-for="(m, i) in markets" :key="i" :value="m.mktcode"></option>
          </datalist>
          <h1 class="ml-2 min-w-fit" v-if="window.width > 1100">: {{ getMktFullName.mktname }}</h1>
        </div>
  
        <div class="flex">
          <button @click="search" class="px-[15px] py-[2px] bg-[rgb(255,255,255)] shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-3xl">
            Search
          </button>
        </div>
      </div>
    </div>
</template>
  
<script>
import { vMaska } from "maska";
import { useMainStore } from "~~/stores/data";
import { useWindowSize } from "@vueuse/core";
export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  directives: { maska: vMaska },
  data() {
    return {
      window: useWindowSize(),
      years: [],
      markets: [],
      year: "",
      market: "",
    };
  },
  mounted() {
    fetch(`https://10.22.26.103/beam/market`)
      .then((response) => response.json())
      .then((result) => {
        this.markets = result;
        this.store.markets = result;
      });
    fetch(
      `https://10.22.26.103/beam/holiday?mkt=SET&year=2000`
    )
      .then((response) => response.json())
      .then((result) => (this.store.holidays = result));
    const setYear = new Date().getFullYear();
    for (let i = 1; i < 14; i++) {
      this.years.push((setYear - (11 - i)).toString());
    }
    this.store.year = 2000;
  },
  methods: {
    search() {
      if (
        this.year != "" &&
        this.market != "" &&
        this.markets.find((mkt) => mkt.mktcode === this.market) != undefined
      ) {
        fetch(
          `https://10.22.26.103/beam/holiday?mkt=${this.market}&year=${this.year}`
        )
          .then((response) => response.json())
          .then((result) => (this.store.holidays = result));
        this.store.year = this.year;
        gtag("event", "search", {
          search_term: "Year: " + this.year + ", Market Code: " + this.market,
        });
        this.year = "";
        this.market = "";
      } else if (this.year == "" && this.market == "") {
        alert("Please enter the year and market.");
      } else if (this.year == "") {
        alert("Please enter the year.");
      } else if (this.market == "") {
        alert("Please enter the market.");
      }
      // else if (this.years.includes(this.year) === false) {
      //   alert("Sorry, the year you selected does not exist.");
      // }
      else if (
        this.markets.find((mkt) => mkt.mktcode === this.market) === undefined
      ) {
        alert("Sorry, the market you selected does not exist.");
      }
    },
  },
  computed: {
    getMktFullName() {
      return this.markets.find((mkt) => mkt.mktcode === this.market) || "";
    },
  },
};
</script>

<style>
@media only screen and (max-width: 1260px) {

  .inputYear {
    width: 90px;
  }

  .inputMarket {
    width: 120px;
  }

}
</style>
