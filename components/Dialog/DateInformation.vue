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
      <p>Date: {{ dataDateSelected.date }}</p>
      <p>Weekend: {{ dataDateSelected.isWeekend }}</p>
      <p>Holiday: {{ dataDateSelected.isHoliday }}</p>
      <p>Trade type: {{ dataDateSelected.cantrade }}</p>
      <p>Description: {{ dataDateSelected.description }}</p>
    </template>
    <template #default v-else>
      <p>Date: {{ dataDateSelected.date }}</p>
      <p>Weekend: {{ dataDateSelected.isWeekend }}</p>
      <p>Holiday: {{ dataDateSelected.isHoliday }}</p>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog"> Cancel </el-button>
      </span>
    </template>
  </i-modal>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
    },
    dataDateSelected: {
      type: Object,
      require: true,
    },
  },
  emits: ["stateInformationDialog"],

  computed: {
    isHoliday() {
      return this.dataDateSelected.isHoliday;
    },
  },

  data() {
    return {
      dialogVisible: this.dialogVisible,
    };
  },

  methods: {
    closeDialog() {
      this.$emit("stateInformationDialog");
    },
  },
};
</script>
