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
import { defineComponent } from "vue";

type StringNull = string | undefined | null;

interface DataShowDate {
  date: Date | undefined;
  isWeekend: boolean;
  isHoliday: boolean;
  cantrade?: StringNull;
  description?: StringNull;
}
interface DataEventDate {
  date: Date | undefined;
  isHoliday: boolean;
  cantrade?: StringNull;
  description?: StringNull;
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
      require: false,
      defualt: null,
      readonly: true,
    },
    description: {
      type: String,
      require: false,
      defualt: null,
      readonly: true,
    },
  },

  emits: ["click-left-cell", "click-right-cell"],

  computed: {
    styleCss(): any {
      if (this.isHoliday) {
        return this.cellStyleHolidays;
      } else if (this.isWeekend) {
        return this.cellStyleWeekEnd;
      } else {
        return this.cellStyle;
      }
    },
    cellStyle(): object {
      return {
        backgroundColor: "rgba(228,228,228,0.3)",
        color: "black",
      };
    },
    cellStyleWeekEnd(): object {
      return {
        backgroundColor: "rgba(215,215,215,1)",
        color: "black",
      };
    },
    cellStyleHolidays(): object {
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
    handleRightClick(event: Event): void {
      event.preventDefault();
      const data: DataEventDate = {
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
});
</script>
