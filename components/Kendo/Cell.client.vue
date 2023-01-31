<template>
  <td
    @click="clickHandler"
    :class="['k-calendar-td', cellClass]"
    :style="cellStyle"
  >
    <span class="k-link">
      {{ formattedValue }}
    </span>
  </td>
</template>
<script>
import { CalendarCell } from "@progress/kendo-vue-dateinputs";

export default {
  props: CalendarCell.props,
  emits: {
    clickOnCell: null,
  },
  data() {
    return {};
  },
  computed: {
    cellStyle() {
      return {
        cursor: "pointer",
        opacity: this.$props.isWeekend ? 0.6 : 1,
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
