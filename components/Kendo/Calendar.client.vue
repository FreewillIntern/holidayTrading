<template>
  <div class="grid grid-cols-4 gap-10 overflow-auto">
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

export default {
  components: {
    calendar: singleCalendarClient,
  },
  data() {
    return {
      year: 2021,
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      holidays: [
        // Example Holidays
        new Date(2021, 0, 20),
        new Date(2022, 0, 12),
        new Date(2022, 6, 4),
        new Date(2023, 0, 1),
        new Date(2023, 0, 2),
        new Date(2023, 0, 3),
        new Date(2023, 0, 4),
        new Date(2023, 0, 5),
        new Date(2023, 0, 6),
        new Date(2023, 0, 7),
        new Date(2023, 0, 8),
        new Date(2023, 0, 9),
        new Date(2023, 0, 10),
        new Date(2023, 1, 1),
        new Date(2023, 1, 4),
        new Date(2023, 2, 15),
        new Date(2023, 3, 12),
      ],
      monthlyLeave: {
        // Boject of monthly holidays
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
      },
    };
  },
  mounted() {
    this.addHolidays();
  },
  methods: {
    addHolidays() {
      for (const day of this.holidays) {
        if (day.getFullYear() === this.year) {
          this.monthlyLeave[day.getMonth()].push(day.getDate());
        }
      }
    },
  },
};
</script>
