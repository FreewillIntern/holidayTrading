<template>
  <div>
    <calendar
      class="grid grid-col-4 grid-flow-col gap-4"
      v-for="month in months"
      :key="month"
      :month="month"
      :date="new Date()"
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
    };
  },
};
</script>
