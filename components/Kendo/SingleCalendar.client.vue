<template>
  <div class="calendar">
    <Calendar
      :cell="'CustomCell'"
      :default-active-view="'month'"
      :min="minDate"
      :max="maxDate"
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
    monthlyLeave: {
      type: Array,
      required: true,
      default: [],
    },
  },
  computed: {
    minDate() {
      return new Date(this.year, this.month, 1);
    },
    maxDate() {
      return new Date(this.year, this.month + 1, 0);
    },
  },
  methods: {
    isHoliday(date) {
      return this.monthlyLeave.includes(Number(date));
    },
  },
};
</script>
