<template>
  <div
    class="grid justify-items-center overflow-auto overflow-y-auto items-center w-full h-full pt-5"
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
</template>

<script>
import singleCalendarClient from "~~/components/Calendar/SingleCalendar.client.vue";
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
      let widthCalendar = 370;
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
          const splitDate = data.holidaydate.split("-");
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
