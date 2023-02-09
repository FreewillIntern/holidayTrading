<template>
  <Calendar
    :class-name="'single-calendar'"
    :cell="'CustomCell'"
    :header-title="'customHeaderTitle'"
    :min="minDate"
    :max="maxDate"
  >
    <template v-slot:customHeaderTitle="{ props }">
      <p class="calendar-nav">{{ props.value }}</p>
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
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    monthlyLeave: {
      type: Array,
      required: true,
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
.calendar-nav {
  margin: 20px 0px -10px 30px;
}
.single-calendar {
  width: 280px;
  height: 300px;
}
</style>
