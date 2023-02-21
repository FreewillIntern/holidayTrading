<template>
  <div
    class="holiday-description grid grid-cols-3 w-[100%] h-[8%] flex justify-evenly mx-auto bg-[rgba(32,32,32,0.95)] rounded-xl items-center text-white shadow-[rgba(0,0,0,0.45)_0px_25px_20px_-20px]"
  >
    <div class="cantrade-des ct-n flex justify-center items-center">
      <div
        class="cantrade-des-header m-2 justify-center items-center bg-[rgb(255,153,153)] text-black"
      >
        <p>N</p>
      </div>
      <div class="cantrade-des-body">
        <p class="equal-symbol">=</p>
        <p>No Trading and Settlement</p>
      </div>
    </div>
    <div class="cantrade-des ct-t flex justify-center items-center">
      <div
        class="cantrade-des-header m-2 justify-center items-center bg-[rgba(255,255,153)] text-black"
      >
        <p>T</p>
      </div>
      <div class="cantrade-des-body">
        <p class="equal-symbol">=</p>
        <p>Trade only ( No settlement )</p>
      </div>
    </div>
    <div class="cantrade-des ct-s flex justify-center items-center">
      <div
        class="cantrade-des-header m-2 justify-center items-center bg-[rgba(153,204,255)] text-black"
      >
        <p>S</p>
      </div>
      <div class="cantrade-des-body">
        <p class="equal-symbol">=</p>
        <p>Settlement only ( No Trading )</p>
      </div>
    </div>
  </div>
  <div class="h-[2%]"></div>
  <div class="main-calendar overflow-auto h-[83%]">
    <div
      class="grid w-[100%]"
      :class="{
        'grid-cols-4': columns >= 4,
        'grid-cols-3': columns == 3,
        'grid-cols-2': columns == 2,
        'grid-cols-1': columns == 1,
      }"
    >
      <!-- Calendar 12 month -->
      <CalendarSingleCalendar
        v-for="month in months"
        :monthlyLeave="monthlyLeave[month]"
        :month="month"
        :year="year"
        :key="month"
        @click-left="clickShowCell"
        @click-right="clickEventCell"
      ></CalendarSingleCalendar>

      <!-- Dialog Information -->
      <DialogDateInformation
        v-if="informationDialogVisible"
        :dialogVisible="informationDialogVisible"
        :dataDateSelected="dataDateSelected"
        @state-information-dialog="updateInformationDialogState"
      />

      <!-- Dialog Event -->
      <DialogEventHoliday
        v-if="eventDialogVisible"
        :dialogVisible="eventDialogVisible"
        :dataDateSelected="dataDateSelected"
        @state-event-dialog="updateEventDialogState"
      />
    </div>
  </div>
</template>

<script>
import { useMainStore } from "~~/stores/data";
import { useWindowSize } from "@vueuse/core";

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },

  data() {
    return {
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      window: useWindowSize(),
      dataDateSelected: {},
      eventDialogVisible: false,
      informationDialogVisible: false,
    };
  },

  computed: {
    columns() {
      let widthWindow = this.window.width * 0.63;
      let widthCalendar = 300;
      let cols =
        Math.floor(widthWindow / widthCalendar) < 1
          ? 1
          : Math.floor(widthWindow / widthCalendar);
      return cols;
    },
    monthlyLeave() {
      const obJectHolidays = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
      };
      if (this.store.getDataHolidays.length > 0) {
        for (const data of this.store.getDataHolidays) {
          const splitDate = data.holidaydate.split("/");
          obJectHolidays[Number(splitDate[1]) - 1].push({
            id: data.id,
            date: Number(splitDate[0]),
            cantrade: data.cantrade,
            description: data.description,
          });
        }
      }
      return obJectHolidays;
    },
    year() {
      if (this.store.year === "") {
        return new Date().getFullYear();
      } else {
        return Number(this.store.year);
      }
    },
  },

  methods: {
    clickEventCell(data) {
      this.dataDateSelected = data;
      this.dataDateSelected.mktcode = this.store.getMarketCode;
      this.eventDialogVisible = true;
    },
    clickShowCell(data) {
      this.dataDateSelected = data;
      this.informationDialogVisible = true;
    },
    updateInformationDialogState() {
      this.informationDialogVisible = false;
      this.dataDateSelected = {};
    },
    updateEventDialogState() {
      this.eventDialogVisible = false;
      this.dataDateSelected = {};
    },
  },
};
</script>

<style>
div.main-calendar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f500;
}

div.main-calendar::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f500;
}

div.main-calendar::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(20, 20, 20, 0.582);
  background-color: #000000e3;
}

.cantrade-des-header {
  display: flex;
  border-radius: 50%;
  min-width: 2rem;
  max-width: 2rem;
  min-height: 2rem;
  max-height: 2rem;
}

.cantrade-des-body {
  display: flex;
}
.equal-symbol {
  margin-right: 0.35rem;
  margin-left: -0.1rem;
}

@media (max-width: 93.75rem) {
  .cantrade-des {
    max-height: 80% !important;
    display: grid;
    align-self: center;
    justify-self: center;
    justify-content: center;
    font-size: 1vw;
  }

  .cantrade-des-header {
    margin: 0rem;
    align-self: center;
    justify-self: center;
    border-radius: 50%;
    min-width: 1.4rem;
    max-width: 1.4rem;
    min-height: 1.4rem;
    max-height: 1.4rem;
  }

  .cantrade-des-body {
    align-self: center;
    justify-self: center;
    padding: 0.1rem;
  }

  .equal-symbol {
    display: none;
  }
}

@media (max-width: 900px) {
  .holiday-description {
    height: 20% !important;
  }
  .cantrade-des {
    font-size: 0.65rem !important;
  }
}
</style>
