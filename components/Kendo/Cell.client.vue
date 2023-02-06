<template>
  <td
    :class="'k-calendar-td'"
    :style="styleCss"
    @click.left="handleLeftClick($event)"
    @click.right="handleRightClick($event)"
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
    value: { type: Date, require: true },
    isFocused: { type: Boolean, default: false, require: false },
    isSelected: { type: Boolean, default: false, require: false },
  },
  emits: ["click-left-cell", "click-right-cell"],
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
    handleLeftClick(event) {
      event.preventDefault();
      const value = this.value;
      const data = {
        ObjectDate: {
          day: value.getDay(),
          date: value.getDate(),
          month: value.getMonth(),
          year: value.getFullYear(),
        },
        date: this.value,
        isWeekend: this.isWeekend,
        isHoliday: this.isHoliday,
        description: this.description,
      };
      this.$emit("click-left-cell", data);
    },
    handleRightClick(event) {
      event.preventDefault();
      const value = this.value;
      const data = {
        ObjectDate: {
          date: value.getDate(),
          month: value.getMonth(),
          year: value.getFullYear(),
        },
        date: this.value,
        description: this.description,
      };
      if (this.isHoliday) {
        data.eventType = "edit";
      } else {
        data.eventType = "add";
      }
      this.$emit("click-right-cell", data);
    },
  },
};
</script>
