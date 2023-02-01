<template>
  <div class="grid grid-cols-1 gap-10 overflow-auto">
    <calendar
      v-for="month in months"
      :holidays="holidays"
      :key="month"
      :month="month"
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
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      holidays: [
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
    };
  },
};
</script>
