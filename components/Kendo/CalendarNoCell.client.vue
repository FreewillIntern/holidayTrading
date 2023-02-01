<template>
  <div class="grid grid-cols-1 gap-10 overflow-auto">
    <calendar
      v-for="month in months"
      :holidays="holidays"
      :key="month"
      :month="month"
      :date="new Date()"
    />
  </div>
</template>

<script>
import singleCalendarNoCellClient from "~~/components/Kendo/SingleCalendarNoCell.client.vue";

export default {
  components: {
    calendar: singleCalendarNoCellClient,
  },
  data() {
    return {
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      holidays: [],
    };
  },
  mounted() {
    this.holidays = [new Date(2023, 2, 30), new Date(2023, 3, 15)];
    // this.holidays = holiday.holiday;
  },
  methods: {
    
  },
};
</script>
