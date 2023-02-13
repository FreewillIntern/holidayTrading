<template>
  <customCalendar
    :class-name="'single-calendar rounded mb-5'"
    :cell="'CustomCell'"
    :header-title="'CustomHeaderTitle'"
    :min="minDate"
    :max="maxDate"
  >
    <template v-slot:CustomHeaderTitle="{ props }">
      <p class="ml-6 mt-2 pl-5 pr-5 pt-2 pb-2 bg-slate-800 text-white rounded">
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
import Cell from "~~/components/Kendo/Cell.client.vue";

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
