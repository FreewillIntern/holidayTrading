<!-- <template>
  <div id="vueapp" class="vue-app">
    <div class="example-config">
      <calendar :value="date">
        <template v-slot:myTemplate="{ props }">
          <customCell
            :data-item="props.dataItem"
            :is-weekend="props.isWeekend"
            :is-focused="props.isFocused"
            :is-selected="props.isSelected"
            :value="props.value"
            :formatted-value="props.formattedValue"
            @click="changeHandler"
          >
          </customCell>
        </template>
      </calendar>
    </div>
  </div>
</template>
<script>
import { Calendar } from "@progress/kendo-vue-dateinputs";
import CellClient from "~~/components/Kendo/Cell.client.vue";

export default {
  components: {
    calendar: Calendar,
    customCell: CellClient,
  },
  props: {
    date: {
      type: Date,
      default: "",
    },
    month: {
      type: Number,
      required: true,
    },
  },
};
</script> -->

<template>
  <div class="calendar">
    <Calendar
      :cell="'CustomCell'"
      :value="value"
      :min="new Date(year, month, 1)"
      :max="new Date(year, month, 28)"
      @change="changeHandler"
    >
      <template v-slot:CustomCell="{ props }">
        <custom
          :data-item="props.dataItem"
          :is-weekend="props.isWeekend"
          :is-focused="props.isFocused"
          :is-selected="props.isSelected"
          :value="props.value"
          :formatted-value="props.formattedValue"
          @clickOnCell="changeHandler"
        />
      </template>
    </Calendar>
  </div>
</template>
<script>
import { Calendar } from "@progress/kendo-vue-dateinputs";
import Cell from "~~/components/Kendo/Cell.client.vue";

export default {
  components: {
    Calendar,
    custom: Cell,
  },
  props: {
    // date: {
    //   type: Date,
    //   default: new Date(),
    // },
    month: {
      type: Number,
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
  },
  data: function () {
    return {
      value: null,
    };
  },
  methods: {
    changeHandler: function (value) {
      alert(value);
      const dayOfWeek = value.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        this.value = value;
      }
    },
  },
};
</script>
