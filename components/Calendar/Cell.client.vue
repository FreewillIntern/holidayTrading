<template>
  <td
    :class="'custom-cell k-calendar-td'"
    :style="styleCss"
    @click.left="handleLeftClick()"
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
    // idHoliday: {
    //   type: Number,
    //   require: false,
    //   defualt: null,
    // },
    
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
    cantrade: {
      type: String,
      require: false,
      defualt: null,
    },
    description: {
      type: String,
      require: false,
      defualt: null,
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
        backgroundColor: "rgb(228,228,228,0.3)",
        color: "black",
      };
    },
    cellStyleWeekEnd() {
      return {
        backgroundColor: "rgb(255,255,153)",
        color: "black",
      };
    },
    cellStyleHolidays() {
      const style = {
        color: "black",
      };
      if (this.cantrade === "N") {
        style.backgroundColor = "rgb(255,153,153)";
      } else if (this.cantrade === "T") {
        style.backgroundColor = "rgb(188,255,110,0.7)";
      } else if (this.cantrade === "S") {
        style.backgroundColor = "rgb(153,204,255)";
      }
      return style;
    },
  },

  methods: {
    handleLeftClick() {
      const data = {
        date: this.value,
        isWeekend: this.isWeekend,
        isHoliday: this.isHoliday,
      };
      if (this.isHoliday) {
        data.cantrade = this.cantrade;
        data.description = this.description;
      }
      this.$emit("click-left-cell", data);
    },
    handleRightClick(event) {
      event.preventDefault();
      const data = {
        date: this.value,
        isHoliday: this.isHoliday,
      };
      if (this.isHoliday) {
        data.cantrade = this.cantrade;
        data.description = this.description;
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
