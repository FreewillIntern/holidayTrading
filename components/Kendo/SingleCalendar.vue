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
        v-if="isHoliday(props.formattedValue)"
        :idCell="id(props.formattedValue)"
        :formatted-value="props.formattedValue"
        :is-weekend="props.isWeekend"
        :isHoliday="isHoliday(props.formattedValue)"
        :is-focused="props.isFocused"
        :value="props.value"
        :description="description(props.formattedValue)"
        @click-left-cell="handleLeftClick"
        @click-right-cell="handleRightClick"
      />
      <customCell
        v-else
        :formatted-value="props.formattedValue"
        :is-weekend="props.isWeekend"
        :isHoliday="isHoliday(props.formattedValue)"
        :is-focused="props.isFocused"
        :value="props.value"
        @click-left-cell="handleLeftClick"
        @click-right-cell="handleRightClick"
      />
    </template>
  </Calendar>
</template>

<script>
import { Calendar } from "@progress/kendo-vue-dateinputs";
import Cell from "~~/components/Kendo/Cell.vue";

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
  data() {
    return { findHoliday: [] };
  },
  computed: {
    minDate() {
      return new Date(this.year, this.month, 1);
    },
    maxDate() {
      return new Date(this.year, this.month + 1, 0);
    },
    returndate() {
      let data = [
        { id: 132, date: 21, des: "hi 21" },
        { id: 133, date: 23, des: "hi 23" },
      ];
      let getdata = data.find((value) => {
        if (value.date == "21") {
          return 1;
        }
      });
      return getdata;
    },
  },
  methods: {
    isHoliday(date) {
      return (
        this.monthlyLeave.find((value) => value.date == date) !== undefined
      );
    },
    id(date) {
      return this.monthlyLeave.find((value) => value.date == date).id;
    },
    description(date) {
      return this.monthlyLeave.find((value) => value.date == date).description;
    },
    handleLeftClick(data) {
      this.$emit("click-left", data);
    },
    handleRightClick(data) {
      this.$emit("click-right", data);
    },
  },
  emits: ["click-left", "click-right"],
};
</script>

<style>
.k-calendar-nav {
  display: none !important;
}
</style>
