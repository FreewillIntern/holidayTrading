<template>
  <div
    class="grid overflow-auto items-center w-full h-full bg-slate-50"
    :class="{
      'grid-cols-4': columns === 4,
      'grid-cols-3': columns === 3,
      'grid-cols-2': columns === 2,
      'grid-cols-1': columns === 1,
    }"
  >
    <calendar
      :class="'p-[3%]'"
      v-for="month in months"
      :monthlyLeave="monthlyLeave[month]"
      :month="month"
      :year="year"
      :key="month"
      @clickLeft="showDataCell"
      @clickRight="editCell"
    />
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
    };
  },
  computed: {
    columns() {
      let widthWindow = this.window.width * 0.6;
      let widthCalendar = 260;
      let cols =
        Math.floor(widthWindow / widthCalendar) < 1
          ? 1
          : Math.floor(widthWindow / widthCalendar);
      return cols;
    },
    year() {
      if (this.store.year === "") {
        return new Date().getFullYear();
      } else {
        return Number(this.store.year);
      }
    },
    holidays() {
      if (this.store.year === "") {
        return [];
      } else {
        const arrayOfHolidays = [];
        const days = this.store.holidays;
        for (let i = 0; i < days.length; i++) {
          arrayOfHolidays.push(days[i].holidaydate);
        }
        return arrayOfHolidays;
      }
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
      const holidays = this.holidays;
      if (holidays.length > 0) {
        for (const day of holidays) {
          const splitDate = day.split("-");
          obJectHolidays[Number(splitDate[1]) - 1].push(Number(splitDate[2]));
        }
      }
      return obJectHolidays;
    },
  },
  methods: {
    editCell(data) {
      data.cell = "Edit";
      alert(JSON.stringify(data));
    },
    showDataCell(data) {
      data.cell = "show";
      alert(JSON.stringify(data));
    },
  },
};
</script>
