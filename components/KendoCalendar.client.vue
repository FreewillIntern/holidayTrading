<template>
  <div
    class="holiday-description w-[97%] h-[10%] flex justify-evenly mx-auto bg-[rgba(32,32,32,0.95)] rounded-xl items-center text-white shadow-[rgba(0,0,0,0.45)_0px_25px_20px_-20px]"
  >
    <div class="flex justify-center items-center">
      <div
        class="flex m-2 w-[40px] h-[40px] justify-center items-center bg-[rgb(255,153,153)] text-black rounded-full"
      >
        <p>N</p>
      </div>
      <div>
        <p>= No Trading and Settlement</p>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <div
        class="flex m-2 w-[40px] h-[40px] justify-center items-center bg-[rgba(255,255,153)] text-black rounded-full"
      >
        <p>T</p>
      </div>
      <div>
        <p>= Trade only ( No settlement )</p>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <div
        class="flex m-2 w-[40px] h-[40px] justify-center items-center bg-[rgba(153,204,255)] text-black rounded-full"
      >
        <p>S</p>
      </div>
      <div>
        <p>= Settlement only ( No Trading )</p>
      </div>
    </div>
  </div>
  <div class="h-[2%]"></div>
  <div
    class="main-calendar grid justify-items-center overflow-auto items-center h-[88%]"
  >
    <div
      class="grid gap-4"
      :class="{
        'grid-cols-4': columns >= 4,
        'grid-cols-3': columns == 3,
        'grid-cols-2': columns == 2,
        'grid-cols-1': columns == 1,
      }"
    >
      <!-- Calendar 12 month -->
      <calendar
        v-for="month in months"
        :monthlyLeave="monthlyLeave[month]"
        :month="month"
        :year="year"
        :key="month"
        @click-left="clickShowCell"
        @click-right="clickEventCell"
      ></calendar>

      <!-- Dialog Information -->
      <DialogDateInformation
        v-if="informationDialogVisible"
        :dialogVisible="informationDialogVisible"
        :dataDateSelected="dataDateSelected"
        @state-information-dialog="updateInformationDialogState"
      />

      <!-- Dialog Event -->
      <EventDialog
        v-if="eventDialogVisible"
        :dialogVisible="eventDialogVisible"
        :dataDateSelected="dataDateSelected"
        @state-event-dialog="updateEventDialogState"
      />
    </div>
  </div>
</template>

<script>
import singleCalendarClient from "~~/components/Calendar/SingleCalendar.vue";
import DialogEventHoliday from "~~/components/Dialog/EventHoliday.vue";
import { useMainStore } from "~~/stores/data";
import { useWindowSize } from "@vueuse/core";

export default {
  components: {
    calendar: singleCalendarClient,
    EventDialog: DialogEventHoliday,
  },

  setup() {
    const store = useMainStore();
    const { updateHolidays } = useMainStore();
    return { store, updateHolidays };
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
      let widthWindow = this.window.width * 0.6;
      let widthCalendar = 380;
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
</style>
