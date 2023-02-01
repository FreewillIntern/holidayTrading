<template>
  <div class="w-full h-full bg-slate-50 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] rounded-lg">
    <div class="h-full w-full  flex justify-evenly items-center">
      <div class="flex">
        <h1>Year :</h1>
        <input list="years" v-model="year" v-maska data-maska="####"
          class="ml-2 w-[180px] border-b-2 border-[rgb(84,84,84)] bg-transparent outline-none" />
        <datalist id="years">
          <option v-for="(y, i) in years" :key="i" :value="y"></option>
        </datalist>
      </div>

      <div class="flex">
        <h1>Market :</h1>
        <input list="markets" v-model="market" v-maska data-maska="HHHHHHHHHHHHHHHHHHHH"
          data-maska-tokens="H:[a-zA-Z0-9]"
          class="ml-2 w-[240px] border-b-2 border-[rgb(84,84,84)] bg-transparent outline-none uppercase" />
        <datalist id="markets">
          <option v-for="(m, i) in markets" :key="i" :value="m.mktcode"></option>
        </datalist>
      </div>

      <div class="flex">
        <button @click="search" class="px-[15px] py-[2px] bg-[rgb(120,120,120)] hover:bg-[rgb(84,84,84)] rounded-3xl">
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { vMaska } from "maska";
import { useMainStore } from "~~/stores/data";

export default {
  setup() {
    const store = useMainStore()
    return { store };
  },
  directives: { maska: vMaska },
  data() {
    return {
      years: [],
      markets: [],
      year: "",
      market: "",
      fetchApiBeam: null
    };
  },
  mounted() {
    const apiMarkets = fetch(`https://10.22.26.103/beam/market`)
      .then((response) => response.json())
      .then((result) => this.markets = result);

    const apiFirst = fetch(`https://10.22.26.103/beam/holiday?mkt=SET&year=2000`)
      .then((response) => response.json())
      .then((result) => this.store.holidays = result);

    const setYear = new Date().getFullYear();
    for (let i = 1; i < 14; i++) {
      this.years.push(
        (setYear - (11-i)).toString()
      );
    }
  },
  methods: {
    search() {
      if (this.year === "" || this.market === "") {

      };
      const apiSearch = fetch(`https://10.22.26.103/beam/holiday?mkt=${this.market}&year=${this.year}`)
        .then((response) => response.json())
        .then((result) => this.store.holidays = result);
      this.year = "";
      this.market = "";
    }
  },
};
</script>

<style></style>
