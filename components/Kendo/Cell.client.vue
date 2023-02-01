<template>
  <td
    @click="clickHandler"
    :class="['k-calendar-td', cellClass]"
    :style="styleCss"
  >
    <span class="k-link">
      {{ formattedValue }}
    </span>
  </td>
</template>

<script>
export default {
  props: {
    formattedValue: { type: String, require: true },
    isWeekend: { type: Boolean, require: true },
    isHoliday: { type: Boolean, require: true },
    isFocused: { type: Boolean, require: false },
    isSelected: { type: Boolean, require: false },
  },
  emits: {
    clickOnCell: null,
  },
  computed: {
    styleCss() {
      if (!this.isHoliday && !this.isWeekend) {
        return this.cellStyle;
      } else {
        if ((this.isHoliday && this.isWeekend) || this.isWeekend) {
          return this.cellStyleWeekEnd;
        } else {
          return this.cellStyleHolidays;
        }
      }
    },
    cellStyle() {
      return {
        backgroundColor: "white",
        color: "black",
      };
    },
    cellStyleWeekEnd() {
      return {
        backgroundColor: "#F7F701",
        color: "black",
      };
    },
    cellStyleHolidays() {
      return {
        backgroundColor: "rgb(255,0,0,0.5)",
        color: "black",
      };
    },
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
  },
};
</script>
