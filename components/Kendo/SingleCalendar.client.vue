<template>
  <div class="calendar">
    <Calendar
      :cell="'CustomCell'"
      :min="minDate"
      :max="maxDate"
      :default-active-view="'month'"
    >
      <template v-slot:CustomCell="{ props }">
        <custom
          :formatted-value="props.formattedValue"
          :is-weekend="props.isWeekend"
          :isHoliday="isHoliday(props.formattedValue)"
          :is-focused="props.isFocused"
          :is-selected="true"
        />
      </template>
    </Calendar>
  </div>
</template>

<script>
import { Calendar } from "@progress/kendo-vue-dateinputs";
import Cell from "~~/components/Kendo/Cell.client.vue";

export default {
  components: {
    Calendar,
    custom: Cell,
  },
  props: {
    month: {
      type: Number,
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    holidays: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      value: null,
      monthlyLeave: [],
    };
  },
  computed: {
    minDate() {
      return new Date(this.year, this.month, 1);
    },
    maxDate() {
      return new Date(this.year, this.month + 1, 0);
    },
  },
  mounted() {
    for (const day of this.holidays) {
      if (day.getMonth() === this.month) {
        this.monthlyLeave.push(day.getDate().toString());
      }
    }
  },
  methods: {
    isHoliday(date) {
      return this.monthlyLeave.includes(date);
    },
  },
};
</script>
