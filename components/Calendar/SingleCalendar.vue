<template>
  <customCalendar
    :class-name="'single-calendar rounded mb-5'"
    :cell="'CustomCell'"
    :header-title="'CustomHeaderTitle'"
    :min="minDate"
    :max="maxDate"
  >
    <template v-slot:CustomHeaderTitle="{ props }">
      <p class="title-calendar">
        {{ props.value }}
      </p>
    </template>

    <!-- code send id of date to cell ==> :idHoliday="idHoliday(props.formattedValue)" -->
    <template v-slot:CustomCell="{ props }">
      <customCell
        :formatted-value="props.formattedValue"
        :is-weekend="props.isWeekend"
        :isHoliday="isHoliday(props.formattedValue)"
        :cantrade="cantradeHoliday(props.formattedValue)"
        :value="props.value"
        :description="desHoliday(props.formattedValue)"
        @click-left-cell="handleLeftClick"
        @click-right-cell="handleRightClick"
      ></customCell>
    </template>
  </customCalendar>
</template>

<script>
import { Calendar } from "@progress/kendo-vue-dateinputs";
import Cell from "~~/components/Calendar/Cell.vue"

export default {
  components: {
    customCalendar: Calendar,
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
    // idHoliday(date) {
    //   try {
    //     return this.monthlyLeave.find((value) => value.date == date).id;
    //   } catch (error) {
    //     return null;
    //   }
    // },

    isHoliday(date) {
      return (
        this.monthlyLeave.find((value) => value.date == date) !== undefined
      );
    },
    cantradeHoliday(date) {
      const arr = this.monthlyLeave.find((value) => value.date == date);
      if (arr !== undefined) {
        return arr.cantrade;
      } else return null;
    },
    desHoliday(date) {
      const arr = this.monthlyLeave.find((value) => value.date == date);
      if (arr !== undefined) {
        return arr.description;
      } else return null;
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
.title-calendar {
  /* outline: solid blue; */
  color: white;
  font-size: 1.25rem;
  margin: 0.15rem 0.31rem 0rem 0.62rem;
}

.k-calendar-nav {
  display: none !important;
}

.single-calendar {
  /* outline: solid green; */
  width: 23rem;
  height: 22rem;
  background-color: rgba(32,32,32,0.95);
  border-radius: 1.25rem;
  padding: 0.62rem 1.25rem;
}

.single-calendar table {
  border-collapse: separate !important;
  border-spacing: 0.31rem !important;
}

.single-calendar table td {
  width: 1.25rem;
  overflow: hidden;
  white-space: nowrap;
}

.k-calendar-view {
  background-color: white !important;
  border-radius: 1.25rem;
  padding: 0.62rem 1.25rem;
}
</style>
