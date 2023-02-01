<template>
  <div class="calendar">
    <calendar
      :min="minDate"
      :max="maxDate"
      :value="holidays"
      @click="hanlerClick"
    >
    </calendar>
  </div>
</template>
<script>
import { Calendar } from "@progress/kendo-vue-dateinputs";
import Cell from "~~/components/Kendo/Cell.client.vue";

export default {
  components: {
    Calendar,
  },
  props: {
    date: {
      type: Date,
      require: false,
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
  methods: {
    checkHoliday(cellValue) {
      alert(cellValue.getDay());
      if (
        cellValue.getDay() === 0 ||
        cellValue.getDay() === 6 ||
        this.holidays.includes(
          `${("0" + cellValue.getDate()).slice(-2)}-${(
            "0" +
            (cellValue.getMonth() + 1)
          ).slice(-2)}-${cellValue.getFullYear()}`
        )
      ) {
        this.value = this.value;
      } else {
        this.value = cellValue;
      }
    },
    hanlerClick() {
      this.$emit("click-date");
    },
  },
};
</script>
