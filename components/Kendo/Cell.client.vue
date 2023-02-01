<template>
  <td
    @click="clickHandler"
    :class="['k-calendar-td', cellClass]"
    :style="style"
  >
    <span class="k-link">
      {{ formattedValue }}
    </span>
  </td>
</template>

<script>
// import { CalendarCell } from "@progress/kendo-vue-dateinputs";

export default {
  // props: CalendarCell.props,
  props: {
    formattedValue: { type: String, require: true },
    isWeekend: { type: Boolean, require: true },
    isHoliday: { type: Boolean, require: true },
    isFocused: { type: Boolean, require: false },
    isSelected: { type: Boolean, require: false },
    holidays: { type: Array, require: false },
    month: { type: Number, require: false },
    // isDisabled: { require: false },
    // view: { require: false },
    // id: { require: false },
    // isInRange: { require: false },
    // isRangeStart: { require: false },
    // isRangeEnd: { require: false },
    // isRangeMid: { require: false },
    // isRangeSplitEnd: { require: false },
    // isRangeSplitStart: { require: false },
    // isToday: { require: false },
    // title: { require: false },
    // value: { require: false },
  },
  emits: {
    clickOnCell: null,
  },
  data() {
    return {
      mount: false,
      onlyHoliday: null,
      style: {
        backgroundColor: this.isWeekend ? "yellow" : "white",
        color: "black",
      },
    };
  },
  mounted() {
    this.checkHoliday();
  },
  computed: {
    // cellStyle() {
    //   return {
    //     // cursor: "pointer",
    //     backgroundColor: "white",
    //     color: "black",
    //     // backgroundColor: this.$props.isToday ? "yellow" : "green",
    //     // visibility: this.$props.isWeekend ? "hidden" : "visible",
    //   };
    // },
    // cellStyleWeekEnd() {
    //   return {
    //     backgroundColor: "#F7F701",
    //     color: "white",
    //   };
    // },
    // cellStyleHolidays() {
    //   return {
    //     // cursor: "pointer",
    //     backgroundColor: this.isWeekend ? "yellow" : "rgb(255,0,0,0.5)",
    //     color: "black",
    //   };
    // },
    cellClass() {
      return {
        "k-state-selected": this.$props.isSelected,
        "k-state-focused": this.$props.isFocused,
      };
    },
  },
  methods: {
    clickHandler(e) {
      if (!this.$props.isWeekend) {
        this.$emit("clickOnCell", this.$props.value, e);
      }
    },
    checkHoliday() {
      if (this.isHoliday) {
        this.style = {
          backgroundColor: "rgb(255,0,0,0.5)",
          color: "black",
        };
      } 
      // else if () {
      //   this.style = {
      //     backgroundColor: "#F7F701",
      //     color: "white",
      //   };
      // }
      // else {
      //   this.style = this.style = {
      //     backgroundColor: "blue",
      //     color: "white",
      //   };
      // }
    },
  },
};
</script>

<!-- <style>
.k-link:hover {
  background-color: black !important;
}
</style> -->
