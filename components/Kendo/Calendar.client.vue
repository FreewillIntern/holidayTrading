<template>
  <div
    class="grid overflow-auto items-center w-full h-full bg-slate-50"
    :class="{
      'grid-cols-4': columns >= 4,
      'grid-cols-3': columns == 3,
      'grid-cols-2': columns == 2,
      'grid-cols-1': columns == 1,
    }"
  >

    <!-- Calendar 12 month -->
    <calendar
      :class="'p-[3%]'"
      v-for="month in months"
      :monthlyLeave="monthlyLeave[month]"
      :month="month"
      :year="year"
      :key="month"
      @click-left="clickShowCell"
      @click-right="clickEventCell"
    />
    
    <!-- Dialog Event -->
    <Dialog
      :dialogVisible="dialogVisible"
      :dataFromCell="dataFromCell"
      @state-dialog="updateDialogState"
    ></Dialog>

  </div>
</template>

<script>
import singleCalendarClient from "~~/components/Kendo/SingleCalendar.client.vue";
import { useMainStore } from "~~/stores/data";
import { useWindowSize } from "@vueuse/core";

export default {
  components: {
    calendar: singleCalendarClient,
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
      dialogVisible: false,
    };
  },
  computed: {
    columns() {
      let widthWindow = this.window.width * 0.6;
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
    marketCode() {
      return this.store.getDataInserted[0].mktcode;
    },
  },
  methods: {
    clickEventCell(data) {
      this.dataFromCell = data;
      this.dataFromCell.cantrade = this.store.getDataInserted[0].cantrade;
      this.dataFromCell.mktcode = this.marketCode;
      this.dialogVisible = true;
    },
    clickShowCell(data) {
      alert(
        `Date: ${data.date}
      Description: ${data.description}`
      );
    },
    updateDialogState() {
      this.dialogVisible = false;
      this.dataFromCell = {};
    },
  },
};
</script>
