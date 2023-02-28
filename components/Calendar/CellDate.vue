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

<script lang="ts">
import { defineComponent, StyleValue } from "vue";

interface DataEventDate {
  date: Date;
  isHoliday: boolean;
  cantrade?: string;
  description?: string;
}
interface DataShowDate extends DataEventDate {
  isWeekend: boolean;
}

export default defineComponent({
  props: {
    formattedValue: {
      type: String,
      require: true,
      readonly: true,
    },
    isWeekend: {
      type: Boolean,
      require: true,
      readonly: true,
    },
    isHoliday: {
      type: Boolean,
      require: true,
      readonly: true,
    },
    value: {
      type: Date,
      require: true,
      readonly: true,
    },
    cantrade: {
      type: String,
      require: true,
      readonly: true,
    },
    description: {
      type: String,
      require: true,
      readonly: true,
    },
  },

  emits: ["click-left-cell", "click-right-cell"],

  computed: {
    styleCss(): StyleValue {
      if (this.isHoliday) {
        return this.cellStyleHolidays;
      } else if (this.isWeekend) {
        return this.cellStyleWeekEnd;
      } else {
        return this.cellStyle;
      }
    },
    cellStyle(): StyleValue {
      return {
        backgroundColor: "rgba(228,228,228,0.3)",
        color: "black",
      };
    },
    cellStyleWeekEnd(): StyleValue {
      return {
        backgroundColor: "rgba(215,215,215,1)",
        color: "black",
      };
    },
    cellStyleHolidays(): StyleValue {
      const style = {
        color: "black",
        backgroundColor: "",
      };
      if (this.cantrade === "N") {
        style.backgroundColor = "rgba(255,153,153)";
      } else if (this.cantrade === "T") {
        style.backgroundColor = "rgba(255,255,153)";
      } else if (this.cantrade === "S") {
        style.backgroundColor = "rgba(153,204,255)";
      }
      return style;
    },
  },

  methods: {
    handleLeftClick(): void {
      const data: DataShowDate = {
        date: <Date>this.value,
        isWeekend: this.isWeekend,
        isHoliday: this.isHoliday,
      };
      if (this.isHoliday) {
        data.cantrade = this.cantrade;
        data.description = this.description;
      }
      this.$emit("click-left-cell", data);
    },
    handleRightClick(event: Event): void {
      event.preventDefault();
      const data: DataEventDate = {
        date: <Date>this.value,
        isHoliday: this.isHoliday,
      };
      if (this.isHoliday) {
        data.cantrade = this.cantrade;
        data.description = this.description;
      }
      this.$emit("click-right-cell", data);
    },
  },
});
</script>
