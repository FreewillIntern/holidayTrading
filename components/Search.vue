<template>
  <div class="w-full h-full">
    <div v-show="!loading"
      class="w-full h-full bg-[rgba(32,32,32,0.95)] shadow-[_3px_3px_15px_rgba(0,0,0,0.8)] rounded-xl"></div>
    <div v-show="loading"
      class="w-full h-full bg-[rgba(32,32,32,0.95)] shadow-[_3px_3px_15px_rgba(0,0,0,0.8)] rounded-xl overflow-auto flex items-center text-white">
      <div class="w-full flex">
        <!-- Pc -->
        <div class="h-full w-full flex justify-evenly" v-show="window.width >= 550">
          <div class="flex items-center">
            <p class="min-w-fit">Year :</p>
            <i-select v-model="year" :options="filterYears" autocomplete placeholder="20XX" @search="onSearchYear"
              @input="onInputYear" />
          </div>

          <div class="flex items-center">
            <p class="min-w-fit">Market :</p>
            <i-select class="mr-2" v-model="market" :options="filterMarketCodes" autocomplete placeholder="Code"
              @search="onSearchMarket" @input="onInputMarket" />
            <p v-if="window.width > 1200">:</p>
            <p class="ml-2 w-[200px] h-[26px] min-w-fit border-b-2 border-[rgb(84,84,84)]" v-if="window.width > 1200">
              {{ getMktFullName?.mktname }}
            </p>
          </div>

          <div class="flex items-center">
            <p @click="search"
              class="px-[15px] py-[4px] bg-[rgba(221,226,228,1)] hover:bg-[rgba(255,255,255,1)] text-black shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer rounded-3xl">
              Search
            </p>
          </div>
        </div>
        <!-- Pc -->

        <!-- Mobile -->
        <div class="h-full w-full flex justify-evenly items-center" v-show="window.width < 550">
          <div class="flex-col">
            <p class="text-[14px]">Year :</p>
            <i-select class="w-[100]" v-model="year" :options="filterYears" autocomplete placeholder="20XX"
              @search="onSearchYear" @input="onInputYear" />
          </div>

          <div class="flex-col">
            <p class="text-[14px]">Market :</p>
            <i-select class="mr-2" v-model="market" :options="filterMarketCodes" autocomplete placeholder="Code"
              @search="onSearchMarket" @input="onInputMarket" />
          </div>

          <div class="flex">
            <p @click="search"
              class="px-[15px] py-[4px] bg-[rgba(221,226,228,1)] hover:bg-[rgba(255,255,255,1)] text-black shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer rounded-3xl">
              Search
            </p>
          </div>
        </div>
        <!-- Mobile -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from "../stores/data";
import { useWindowSize } from "@vueuse/core";
import { defineComponent } from "vue";

interface DataType {
  url: string;
  window: {
    width: globalThis.Ref<number>;
    height: globalThis.Ref<number>;
  }
  years: Inkline[];
  markets: Markets[];
  marketCodes: Inkline[];
  year: Inkline;
  market: Inkline;
  filterYears: object[];
  filterMarketCodes: object[];
  loading: boolean;
}

interface Markets {
  mktcode: string;
  mktname: string;
}

interface Inkline {
  id: number;
  label: string;
}

export default defineComponent({
  setup() {
    const store = useMainStore();
    return { store };
  },
  data(): DataType {
    return {
      url: useRuntimeConfig().public.apiBase,
      window: useWindowSize(),
      years: [],
      markets: [],
      marketCodes: [],
      year: { id: 0, label: "" },
      market: { id: 0, label: "" },
      filterYears: [],
      filterMarketCodes: [],
      loading: false,
    };
  },
  mounted() {
    fetch(`${this.url}market`)
      .then((response) => response.json())
      .then((result) => {
        this.markets = result.data;
        for (let i = 0; i < result.data.length; i++) {
          this.marketCodes.push({ id: i + 1, label: result.data[i].mktcode });
          this.filterMarketCodes.push({
            id: i + 1,
            label: result.data[i].mktcode,
          });
          if (i === 0) {
            this.market = { id: i + 1, label: result.data[i].mktcode };
          }
        }
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
      if ((setYear - (11 - i)).toString() === new Date().getFullYear().toString()) {
        this.year = { id: i, label: (setYear - (11 - i)).toString() };
      }
    }

    this.store.year = new Date().getFullYear().toString();

    this.loading = true;
  },
  methods: {
    search() {
      if (this.year != null && this.market != null) {
        fetch(
          `${this.url}holiday?mkt=${this.market.label}&year=${this.year.label}`
        )
          .then((response) => response.json())
          .then((result) => (this.store.holidays = result.data));

        this.store.year = this.year.label;
        this.store.marketCode = this.market.label;

        const res = this.markets.find(
          (mkt) => mkt.mktcode === this.market.label
        )?.mktname;

        if (res != undefined) {
          this.store.marketName = res;
        }

        gtag("event", "search", {
          search_year_market:
            "Year: " + this.year.label + ", Market Code: " + this.market.label,
        });
      }
    },
    onInputYear(event: InputEvent) {
      if (event.target != null) {
        const value = (event.target as HTMLInputElement).value;

        (event.target as HTMLInputElement).value = value.replace(/\D/g, "");
        if (value.length >= 4) {
          (event.target as HTMLInputElement).value = value.slice(0, 4);
        }
      }
    },
    onSearchYear(query: string) {
      if (query != null) {
        query = query.slice(0, 4);
      }
      this.filterYears = this.years.filter((option) => {
        return option.label.toLowerCase().includes((query || "").toLowerCase());
      });
    },
    onInputMarket(event: InputEvent) {
      if (event.target != null) {
        const value = (event.target as HTMLInputElement).value;

        (event.target as HTMLInputElement).value = value.toUpperCase();
        if (value.length >= 20) {
          (event.target as HTMLInputElement).value = value.slice(0, 20);
        }
      }
    },
    onSearchMarket(query: string) {
      this.filterMarketCodes = this.marketCodes.filter((option) => {
        return option.label.toLowerCase().includes((query || "").toLowerCase());
      });
    },
  },
  computed: {
    getMktFullName() {
      return (
        this.markets.find((mkt) => mkt.mktcode === this.market.label)
      );
    },
  },
});
</script>

<style>
.input {
  width: 180px;
  height: 30px;
  margin-left: 8px;
}

.input-wrapper.-dark {
  ----background: var(--color--light);
  ----background--disabled: var(--color--light-40);
  ----border-color: var(--color--light-45);
  ----border-color--hover: var(--color--light-40);
  ----border-color--focus: var(--color--primary);
  ----color: var(--contrast-color-for-light-background);
  ----color--disabled: var(--color--gray-35);
  ----clear--background: transparent;
  ----clear--background--hover: var(--color--light-35);
  ----clear--background--active: var(--color--light-30);
  ----clear--color: var(--color--light-30);
  ----placeholder--color: var(--color--dark-25);
  ----prefix-suffix--color: var(--color--light-25);
  ----prepend-append--background: var(--color--light);
}

.select-wrapper.-dark {
  ----background: var(--color--light);
  ----border-top-color: var(--color--light-45);
  ----border-right-color: var(--color--light-45);
  ----border-bottom-color: var(--color--light-45);
  ----border-left-color: var(--color--light-45);
  ----color: var(--contrast-color-for-light-background);
  ----option--background--hover: var(--color--light-45);
  ----option--background--disabled: transparent;
  ----option--color--disabled: var(--color--light-25);
  ----header--background: var(--color--light-55);
  ----footer--background: var(--color--light-55);
}

@media only screen and (max-width: 1400px) {
  .input {
    width: 130px;
  }
}

@media only screen and (max-width: 549px) {
  .input {
    width: 85px;
    margin-left: 0px;
  }

  .input input {
    padding-left: 6px !important;
    padding-right: 6px !important;
  }

  .input-suffix {
    padding-left: 4px !important;
    padding-right: 4px !important;
  }
}
</style>
