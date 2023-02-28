<template>
  <i-modal
    v-model="dialogVisible"
    color="white"
    size="lg"
    :hideOnClickOutside="false"
    :showClose="false"
  >
    <template #header> Date information </template>

    <template #default v-if="isHoliday">
      <p>Date: {{ formatDDMMYY }}</p>
      <p>Weekend: {{ dataDateSelected?.isWeekend ? "Yes" : "No" }}</p>
      <p>Holiday: {{ dataDateSelected?.isHoliday ? "Yes" : "No" }}</p>
      <p>Trade type: {{ cantradeDescription }}</p>
      <p>Description: {{ dataDateSelected?.description }}</p>
    </template>
    <template #default v-else>
      <p>Date: {{ formatDDMMYY }}</p>
      <p>Weekend: {{ dataDateSelected.isWeekend ? "Yes" : "No" }}</p>
      <p>Holiday: {{ dataDateSelected.isHoliday ? "Yes" : "No" }}</p>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog"> Cancel </el-button>
      </span>
    </template>
  </i-modal>
</template>

<script lang="ts">
interface DataShowDate {
  date: Date;
  isWeekend: boolean;
  isHoliday: boolean;
  cantrade?: string;
  description?: string;
}

interface ObjectCantrade {
  [key: string]: string;
}

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
    },
    dataDateSelected: {
      type: Object as PropType<DataShowDate>,
      require: true,
    },
  },

  emits: ["stateInformationDialog"],

  computed: {
    isHoliday(): boolean {
      return <boolean>this.dataDateSelected?.isHoliday;
    },
    formatDDMMYY(): string {
      let date = (this.dataDateSelected?.date as Date).getDate();
      let month = (this.dataDateSelected?.date.getMonth() as number) + 1;
      let year = this.dataDateSelected?.date.getFullYear();
      return `${("0" + date).slice(-2)}/${("0" + month).slice(-2)}/${year}`;
    },
    cantradeDescription(): string {
      let des = "";
      let cantradeChoise: ObjectCantrade = {
        N: "No Trading and Settlement",
        T: "Trade only ( No settlement )",
        S: "Settlement only ( No Trading )",
      };
      const arr = Object.keys(cantradeChoise);
      arr.forEach((type) => {
        if (type === this.dataDateSelected?.cantrade) {
          des = cantradeChoise[type];
        }
      });
      return des;
    },
  },

  data() {
    return {
      dialogVisible: this.dialogVisible,
    };
  },

  methods: {
    closeDialog(): void {
      this.$emit("stateInformationDialog");
    },
  },
};
</script>
