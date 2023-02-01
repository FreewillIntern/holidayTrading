<template>
  <div class="w-full h-full bg-slate-300 rounded-3xl">
    <div class="h-full w-full  flex justify-evenly items-center">
      <div class="flex">
        <h1>Year :</h1>
        <input list="years" v-model="year" v-maska data-maska="####"
          class="ml-2 w-[180px] border-b-2 border-black bg-transparent outline-none" />
        <datalist id="years">
          <option v-for="(y, i) in years" :key="i" :value="y"></option>
        </datalist>
      </div>

      <div class="flex">
        <h1>Market :</h1>
        <input list="markets" v-model="market" v-maska data-maska="HHHHHHHHHHHHHHHHHHHH"
          data-maska-tokens="H:[a-zA-Z0-9]"
          class="ml-2 w-[240px] border-b-2 border-black bg-transparent outline-none uppercase" />
        <datalist id="markets">
          <option v-for="(m, i) in markets" :key="i" :value="m.mktcode"></option>
        </datalist>
      </div>

      <div class="flex">
        <button @click="search" class="px-[15px] py-[2px] bg-slate-400 hover:bg-slate-500 rounded-3xl">
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
      years: ["2013", "2014", "2015", "2016", "2017","2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
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
  },
  methods: {
    search() {
      const apiSearch = fetch(`https://10.22.26.103/beam/holiday?mkt=${this.market}&year=${this.year}`)
        .then((response) => response.json())
        .then((result) => this.store.holidays = result);
    }
  },
};
</script>

<style>

</style>
