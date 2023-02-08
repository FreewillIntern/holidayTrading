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
    idHoliday: {
      type: Number,
      require: false,
      defualt: null,
    },
    formattedValue: {
      type: String,
      require: true,
    },
    isWeekend: {
      type: Boolean,
      require: true,
    },
    isHoliday: {
      type: Boolean,
      require: true,
    },
    value: {
      type: Date,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },
  },

  emits: ["click-left-cell", "click-right-cell"],

  computed: {
    styleCss() {
      if (this.isHoliday) {
        return this.cellStyleHolidays;
      } else if (this.isWeekend) {
        return this.cellStyleWeekEnd;
      } else {
        return this.cellStyle;
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
      const data = {
        date: this.value,
        isWeekend: this.isWeekend,
        isHoliday: this.isHoliday,
      };
      if (this.isHoliday) {
        data.id = this.idHoliday;
        data.description = this.description;
      }
      this.$emit("click-left-cell", data);
    },
    handleRightClick(event) {
      event.preventDefault();
      const data = {
        date: this.value,
      };
      if (this.isHoliday) {
        data.id = this.idHoliday;
        data.description = this.description;
        data.eventType = "edit";
      } else {
        data.eventType = "add";
      }
      this.$emit("click-right-cell", data);
    },
  },
};
</script>

<style>
.k-calendar-td {
  width: 0px !important;
  height: 30px !important;
  margin: 30px !important;
  border-collapse: separate !important;
  border-spacing: 15px !important;
}
</style>
