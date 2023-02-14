<template>
  <div
    class="w-full h-full bg-[rgba(32,32,32,0.95)] shadow-[_3px_3px_15px_rgba(0,0,0,0.8)] rounded-xl overflow-auto flex items-center text-white">
    <div class="w-full flex">
      <!-- Pc -->
      <div class="h-full w-full flex justify-evenly" v-show="window.width >= 550">
        <div class="flex items-center">
          <h1 class="min-w-fit">Year :</h1>
          <i-select v-model="year" :options="filterYears" autocomplete placeholder="Select Year" @search="onSearchYear"
            @input="onInputYear" />
        </div>

        <div class="flex items-center">
          <h1 class="min-w-fit">Market :</h1>
          <i-select class="mr-2" v-model="market" :options="filterMarketCodes" autocomplete placeholder="Code" @search="onSearchMarket" @input="onInputMarket"/>
          <h1>:</h1>
          <h1 class="ml-2 w-[200px] h-[26px] min-w-fit border-b-2 border-[rgb(84,84,84)]" v-if="window.width > 1200">
            {{ getMktFullName.mktname }}
          </h1>
        </div>

        <div class="flex items-center">
          <h1 @click="search"
            class="px-[15px] py-[4px] bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)] shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer rounded-3xl">
            Search
          </h1>
        </div>
      </div>
      <!-- Pc -->

      <!-- Mobile -->
      <div class="h-full w-full flex justify-evenly items-center" v-show="window.width < 550">
        <div class="flex-col">
          <h1 class="text-[14px]">Year :</h1>
          <select v-model="year"
            class="px-[5px] py-[2px] rounded-full bg-[rgb(255,255,255)] shadow-[0_0_10px_rgba(0,0,0,0.3)]">
            <option v-for="(y, i) in years" :key="i" :value="y">
              {{ y }}
            </option>
          </select>
        </div>

        <div class="flex-col">
          <h1 class="text-[14px]">Market :</h1>
          <select v-model="market"
            class="px-[5px] py-[2px] rounded-full bg-[rgb(255,255,255)] shadow-[0_0_10px_rgba(0,0,0,0.3)]">
            <option v-for="(m, i) in markets" :key="i" :value="m.mktcode">
              {{ m.mktcode }}
            </option>
          </select>
        </div>

        <div class="flex">
          <button @click="search"
            class="px-[15px] py-[2px] bg-[rgb(255,255,255)] shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-3xl">
            Search
          </button>
        </div>
      </div>
      <!-- Mobile -->
    </div>
  </div>
</template>

<script>
import { vMaska } from "maska";
import { useMainStore } from "~~/stores/data";
import { useWindowSize } from "@vueuse/core";
import { ComboBox } from "@progress/kendo-vue-dropdowns";
import { filterBy } from "@progress/kendo-data-query";
import { fontSizeIcon, paddingTopIcon } from "@progress/kendo-svg-icons";

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  directives: { maska: vMaska },
  components: {
    combobox: ComboBox,
  },
  data() {
    return {
      url: useRuntimeConfig().public.apiBase,
      window: useWindowSize(),
      years: [],
      markets: [],
      marketCodes: [],
      year: null,
      market: null,
      filterYears: [],
      filterMarketCodes: [],
    };
  },
  mounted() {
    fetch(`${this.url}market`)
      .then((response) => response.json())
      .then((result) => {
        this.markets = result.data;
        for (let i = 0; i < result.data.length; i++) {
          this.marketCodes.push({id: i+1, label: result.data[i].mktcode})
          this.filterMarketCodes.push({id: i+1, label: result.data[i].mktcode})
        };
        this.store.marketCode = result.data[0].mktcode;
        this.store.marketName = result.data[0].mktname;
        this.store.markets = result.data;
        fetch(
          `${this.url}holiday?mkt=${this.markets[0].mktcode}&year=${new Date()
            .getFullYear()
            .toString()}`
        )
          .then((response) => response.json())
          .then((result) => (this.store.holidays = result.data));
      });

    const setYear = new Date().getFullYear();
    for (let i = 1; i < 14; i++) {
      this.years.push({ id: i, label: (setYear - (11 - i)).toString() });
      this.filterYears.push({ id: i, label: (setYear - (11 - i)).toString() });
    }

    this.store.year = new Date().getFullYear().toString();
  },
  methods: {
    search() {
      if (
        this.year != null &&
        this.market != null
      ) {
        fetch(`${this.url}holiday?mkt=${this.market.label}&year=${this.year.label}`)
          .then((response) => response.json())
          .then((result) => (this.store.holidays = result.data));

        this.store.year = this.year.label;
        this.store.marketCode = this.market.label
        this.store.marketName = this.markets.find(
          (mkt) => mkt.mktcode === this.market.label
        ).mktname;

        gtag("event", "search", {
          search_term: "Year: " + this.year.label + ", Market Code: " + this.market.label,
        });
      }
    },
    onInputYear(event) {
      const value = event.target.value;
      event.target.value = value.replace(/[^0-9]/g, "");
      if (value.length >= 4) {
        event.target.value = value.substr(0, 4);
      }
    },
    onSearchYear(query) {
      if (query != null) {
        query = query.substr(0, 4);
      }
      this.filterYears = this.years
        .filter((option) => {
          return option.label.toLowerCase().includes((query || '').toLowerCase());
        });
    },
    onInputMarket(event) {
      const value = event.target.value;
      event.target.value = value.toUpperCase();
      if (value.length >= 20) {
        event.target.value = value.substr(0, 20);
      }
    },
    onSearchMarket(query) {
      this.filterMarketCodes = this.marketCodes
        .filter((option) => {
          return option.label.toLowerCase().includes((query || '').toLowerCase());
        });
    },
  },
  computed: {
    getMktFullName() {
      return this.markets.find((mkt) => mkt.mktcode === this.market.label) || "";
    },
  },
};
</script>

<style>
.input {
  width: 180px;
  height: 30px;
  margin-left: 8px;
}

@media only screen and (max-width: 1400px) {
  .input {
    width: 120px;
  }

  .inputMarket {
    width: 120px;
  }
}
</style>
