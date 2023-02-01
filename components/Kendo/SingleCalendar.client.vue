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
          :data-item="props.dataItem"
          :is-weekend="props.isWeekend"
          :is-focused="props.isFocused"
          :is-selected="true"
          :isHoliday="isHoliday(props.formattedValue)"
          :month="month"
          :mode="props.mode"
          :formatted-value="props.formattedValue"
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
    date: {
      type: Array,
      default: [new Date(2023, 4, 12), new Date(2023, 2, 1)],
    },
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
        // console.log(typeof day.getDate());
        this.monthlyLeave.push(day.getDate().toString());
      }
    }
  },
  methods: {
    isHoliday(date) {
      // console.log(`isHoliday m.${this.month}---->${date}:${this.monthlyLeave}`);
      // console.log(`Result: ${this.monthlyLeave.includes(date)}`);
      // console.log(typeof this.monthlyLeave);
      return this.monthlyLeave.includes(date);
    },
  },
};
</script>
