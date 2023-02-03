<template>
  <td :class="'k-calendar-td'" :style="styleCss" @click="handleClick">
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
    value: { type: Date, require: true },
    isFocused: { type: Boolean, default: false, require: false },
    isSelected: { type: Boolean, default: false, require: false },
  },
  data() {
    return { description: "" };
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
  },
  methods: {
    handleClick() {
      const data = {
        holidayadate: this.value,
        description: this.description,
      };
      this.$emit("clickCell", data);
    },
  },
};
</script>
