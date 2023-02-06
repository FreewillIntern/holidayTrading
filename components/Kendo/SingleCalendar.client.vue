<template>
  <Calendar
    :cell="'CustomCell'"
    :header-title="'customHeaderTitle'"
    :min="minDate"
    :max="maxDate"
  >
    <template v-slot:customHeaderTitle="{ props }">
      <p>{{ props.value }}</p>
    </template>
    <template v-slot:CustomCell="{ props }">
      <customCell
        :formatted-value="props.formattedValue"
        :is-weekend="props.isWeekend"
        :isHoliday="isHoliday(props.formattedValue)"
        :is-focused="props.isFocused"
        :is-selected="true"
        :value="props.value"
        @clickLeftCell="handleLeftClick"
        @clickRightCell="handleRightClick"
      />
    </template>
  </Calendar>
</template>

<script>
import { Calendar } from "@progress/kendo-vue-dateinputs";
import Cell from "~~/components/Kendo/Cell.client.vue";

export default {
  components: {
    Calendar,
    customCell: Cell,
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
    handleLeftClick(data) {
      this.$emit("clickLeft", data);
    },
    handleRightClick(data) {
      this.$emit("clickRight", data);
    },
  },
};
</script>

<style>
.k-calendar-nav {
  display: none !important;
}
</style>
