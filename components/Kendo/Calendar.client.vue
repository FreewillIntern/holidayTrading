<template>
  <div class="grid grid-cols-4 gap-10 overflow-auto w-full h-full bg-slate-50 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] rounded-lg">
    <calendar
      v-for="month in months"
      :monthlyLeave="monthlyLeave[month]"
      :month="month"
      :year="year"
      :key="month"
    />
  </div>
</template>

<script>
import singleCalendarClient from "~~/components/Kendo/SingleCalendar.client.vue";
import { useMainStore } from "~~/stores/data";

export default {
  components: {
    calendar: singleCalendarClient,
  },
  setup() {
    const store = useMainStore();
    return { store };
  },
  data() {
    return {
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    };
  },
  computed: {
    year() {
      if (this.store.year === "") {
        return new Date().getFullYear();
      } else {
        return Number(this.store.year);
      }
    },
    holidays() {
      if (this.store.yearOld === "") {
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
};
</script>
