<template>
  <div class="w-[71vw] h-full bg-slate-50 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] rounded-lg overflow-auto">
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
        <h1 class="ml-2 min-w-fit">: {{ getMktFullName.mktname }}</h1>
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
    };

    this.store.year = 2000;
  },
  methods: {
    search() {
      if (this.year === "" || this.market === "") {

      };
      const apiSearch = fetch(`https://10.22.26.103/beam/holiday?mkt=${this.market}&year=${this.year}`)
        .then((response) => response.json())
        .then((result) => this.store.holidays = result);

      this.store.year = this.year;

      this.year = "";
      this.market = "";
    },
  },
  computed: {
    getMktFullName() {
      return this.markets.find(market => market.mktcode === this.market) || ""
    }
  }
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
