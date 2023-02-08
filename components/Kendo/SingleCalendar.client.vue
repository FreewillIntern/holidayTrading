<template>
  <Calendar
    :class-name="'single-calendar'"
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
        :idHoliday="idHoliday(props.formattedValue)"
        :formatted-value="props.formattedValue"
        :is-weekend="props.isWeekend"
        :isHoliday="isHoliday(props.formattedValue)"
        :value="props.value"
        :description="desHoliday(props.formattedValue)"
        @click-left-cell="handleLeftClick"
        @click-right-cell="handleRightClick"
      ></customCell>
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

  emits: ["click-left", "click-right"],
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
      return (
        this.monthlyLeave.find((value) => value.date == date) !== undefined
      );
    },
    idHoliday(date) {
      try {
        return this.monthlyLeave.find((value) => value.date == date).id;
      } catch (error) {
        return null;
      }
    },
    desHoliday(date) {
      try {
        return this.monthlyLeave.find((value) => value.date == date)
          .description;
      } catch (error) {
        return null;
      }
    },
    handleLeftClick(data) {
      this.$emit("click-left", data);
    },
    handleRightClick(data) {
      this.$emit("click-right", data);
    },
  },
};
</script>

<style>
.k-calendar-nav {
  display: none !important;
}
</style>
