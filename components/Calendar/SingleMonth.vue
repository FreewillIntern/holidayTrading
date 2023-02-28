<template>
  <Calendar
    :class-name="'single-calendar mb-5'"
    :cell="'CustomCell'"
    :header-title="'CustomHeaderTitle'"
    :min="minDate"
    :max="maxDate"
    :views="month"
  >
    <template v-slot:CustomHeaderTitle="{ props }">
      <p class="title-calendar">
        {{ props.value }}
      </p>
    </template>

    <template v-slot:CustomCell="{ props }">
      <CellDate
        :formatted-value="props.formattedValue"
        :is-weekend="props.isWeekend"
        :isHoliday="isHoliday(props.formattedValue)"
        :cantrade="cantradeHoliday(props.formattedValue)"
        :value="props.value"
        :description="desHoliday(props.formattedValue)"
        @click-left-cell="handleLeftClick"
        @click-right-cell="handleRightClick"
      />
    </template>
  </Calendar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Calendar } from "@progress/kendo-vue-dateinputs";
import CellDate from "./CellDate.vue";

type StringNull = string | undefined;

export default defineComponent({
  components: {
    Calendar,
    CellDate,
  },

  props: {
    month: {
      type: Number,
      required: true,
      readonly: true,
    },
    year: {
      type: Number,
      required: true,
      readonly: true,
    },
    monthlyLeave: {
      type: Array,
      required: true,
      readonly: true,
    },
  },

  emits: ["click-left", "click-right"],

  computed: {
    minDate(): Date {
      return new Date(this.year, this.month, 1);
    },
    maxDate(): Date {
      return new Date(this.year, this.month + 1, 0);
    },
  },

  methods: {
    isHoliday(date: Date): boolean {
      return (
        this.monthlyLeave.find((value: any) => value.date == date) !== undefined
      );
    },
    cantradeHoliday(date: Date): StringNull {
      const arr: any = this.monthlyLeave.find(
        (value: any): any => value.date == date
      );
      if (arr !== undefined) {
        return arr.cantrade;
      } else return undefined;
    },
    desHoliday(date: Date): StringNull {
      const arr: any = this.monthlyLeave.find(
        (value: any) => value.date == date
      );
      if (arr !== undefined) {
        return arr.description;
      } else return undefined;
    },
    handleLeftClick(data: Date): void {
      this.$emit("click-left", data);
    },
    handleRightClick(data: Date): void {
      this.$emit("click-right", data);
    },
  },
});
</script>

<style scope>
.single-calendar .title-calendar {
  color: white;
  font-size: 1.25rem;
  margin: 0rem;
}

.single-calendar .k-calendar-nav {
  display: none !important;
}

.single-calendar {
  width: 17rem;
  height: 18rem;
  background-color: rgba(32, 32, 32, 0.95);
  border-radius: 0.7rem;
  padding: 0.62rem 1.25rem;
  margin: 1rem auto;
}

.single-calendar table {
  width: 90%;
  height: 80%;
  padding: 0rem;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0.3rem;
}

.single-calendar table thead {
  padding: 0rem;
  margin: 0rem;
  justify-content: center;
}

.single-calendar table thead th {
  text-align: center;
  justify-content: center;
  font-size: 0.9rem;
  padding: 0rem;
  margin: 0rem;
  min-width: 14%;
  max-width: 14%;
}

.single-calendar table td {
  justify-content: center;
  text-align: center;
  font-size: 0.75rem;
  border-radius: 0.4rem;
  padding: 0rem;
  margin: 0rem;
  min-width: 14%;
  max-width: 14%;
}

.single-calendar .k-calendar-view {
  background-color: white;
  margin: auto;
  border-radius: 0.7rem;
  padding: 0rem;
  width: 100%;
  max-width: 100%;
  min-height: 80%;
  max-height: 80%;
}
</style>
