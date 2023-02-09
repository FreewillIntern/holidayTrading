<template>
  <div
    class="grid overflow-auto items-center w-full h-full"
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

    <!-- Dialog Event -->
    <EventDialog
      v-if="eventDialogVisible"
      :dialogVisible="eventDialogVisible"
      :dataFromCell="dataFromCell"
      @state-event-dialog="updateEventDialogState"
    ></EventDialog>
  </div>
</template>

<script>
import singleCalendarClient from "~~/components/Kendo/SingleCalendar.client.vue";
import DialogEventHoliday from "~~/components/Dialog/EventHoliday.vue";
import { useMainStore } from "~~/stores/data";
import { useWindowSize } from "@vueuse/core";

export default {
  components: {
    calendar: singleCalendarClient,
    EventDialog: DialogEventHoliday,
  },
  setup() {
    const store = ref(useMainStore());
    return { store };
  },
  data() {
    return {
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      window: useWindowSize(),
      dataFromCell: {},
      eventDialogVisible: false,
      showDialogVisible: false,
    };
  },
  computed: {
    columns() {
      let widthWindow = this.window.width * 0.65;
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
      if (this.store.getDataInserted.length > 0) {
        for (const data of this.store.getDataInserted) {
          const splitDate = data.holidaydate.split("-");
          obJectHolidays[Number(splitDate[1]) - 1].push({
            id: data.id,
            date: Number(splitDate[2]),
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
      this.dataFromCell = data;
      if (this.store.getDataInserted.length > 0) {
        this.dataFromCell.cantrade = this.store.getDataInserted[0].cantrade;
        this.dataFromCell.mktcode = this.store.getDataInserted[0].mktcode;
      } else {
        this.dataFromCell.cantrade = "N";
        this.dataFromCell.mktcode = "SET";
      }
      this.eventDialogVisible = true;
    },
    clickShowCell(data) {
      alert(
        `Date: ${data.date}
      Description: ${data.description}`
      );
    },
    updateEventDialogState() {
      this.eventDialogVisible = false;
      this.dataFromCell = {};
      console.log("update store");

      fetch(`https://10.22.26.103/beam/holiday?mkt=SET&year=2000`)
        .then((response) => response.json())
        .then((result) => (this.store.holidays = result));
      window.location.reload();
    },
  },
};
</script>
