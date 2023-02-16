<template>
  <td
    :class="'custom-cell'"
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
        backgroundColor: "rgba(228,228,228,0.3)",
        color: "black",
      };
    },
    cellStyleWeekEnd() {
      return {
        backgroundColor: "rgba(215,215,215,1)",
        color: "black",
      };
    },
    cellStyleHolidays() {
      const style = {
        color: "black",
      };
      if (this.cantrade === "N") {
        style.backgroundColor = "rgba(255,153,153)";
      } else if (this.cantrade === "T") {
        style.backgroundColor = "rgba(255,255,153)";
      } else if (this.cantrade === "S") {
        style.backgroundColor = "rgba(153,204,255)"; // blue "rgba(153,204,255)"
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

<style scope>
.custom-cell {
  min-width: 1.9rem;
  max-width: 1.9rem;
  min-height: 1.9rem;
  max-height: 1.9rem;
  border-radius: 0.3rem;
}

table td {
  min-width: 1.9rem;
  max-width: 1.9rem;
  height: 1.9rem;
  font-size: 0.6rem !important;
  justify-content: center;
}

table td span {
  min-width: 1.9rem;
  max-width: 1.9rem;
  height: 1.9rem;
  font-size: 0.6rem !important;
  text-align: center;
}

</style>
