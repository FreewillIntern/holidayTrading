<template>
  <div class="dialog-add rounded">
    <!-- Add Form -->
    <el-dialog
      v-model="addCell"
      :before-close="closeDialog"
      title="Add holiday date"
    >
      <p class="pb-5">Date: {{ formatDDMMYY }}</p>
      <el-form :model="enteredDialog">
        <el-form-item label="Description">
          <el-input v-model="enteredDialog.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Market code" :rules="[{ required: true }]">
          <el-select
            v-model="enteredDialog.marketType"
            placeholder="Please select a type of market"
          >
            <el-option
              v-for="value in store.getDataMarket"
              :key="value"
              :label="value.mktcode"
              :value="value.mktcode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="type" :rules="[{ required: true }]">
          <el-select
            v-model="enteredDialog.cantrade"
            placeholder="Please select a type of market"
          >
            <el-option
              v-for="value in cantradeArray"
              :key="value"
              :label="value"
              :value="value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addHoliday"> Add </el-button>
          <el-button @click="closeDialog"> Cancel </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Edit form -->
    <el-dialog
      v-model="editCell"
      :before-close="closeDialog"
      title="Edit holiday date"
    >
      <p class="pb-5">Date: {{ formatDDMMYY }}</p>
      <el-form :model="enteredDialog">
        <el-form-item label="Description">
          <el-input v-model="enteredDialog.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Market code" :rules="[{ required: true }]">
          <el-select
            v-model="enteredDialog.marketType"
            placeholder="Please select a type of market"
          >
            <el-option
              v-for="value in store.getDataMarket"
              :key="value"
              :label="value.mktcode"
              :value="value.mktcode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="type" :rules="[{ required: true }]">
          <el-select
            v-model="enteredDialog.cantrade"
            placeholder="Please select a type of market"
          >
            <el-option
              v-for="value in cantradeArray"
              :key="value"
              :label="value"
              :value="value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="editHoliday"> Edit </el-button>
          <el-button @click="closeDialog"> Cancel </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { useMainStore } from "~~/stores/data";
import { addDate, editDate } from "~~/composables/FetchAPI";
export default {
  setup() {
    const store = useMainStore();
    const { updateHolidays } = useMainStore();
    return { store, updateHolidays };
  },

  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
    },
    dataFromCell: {
      type: Object,
      require: true,
    },
  },

  emits: ["stateEventDialog"],

  data() {
    return {
      date: this.dataFromCell.date,
      enteredDialog: {
        marketType: this.dataFromCell.mktcode,
        description: this.dataFromCell.description,
        cantrade: this.dataFromCell.cantrade,
      },
    };
  },

  computed: {
    cantradeArray() {
      return ["N", "T", "S"];
    },
    addCell() {
      return this.dialogVisible && this.dataFromCell.eventType === "add";
    },
    editCell() {
      return this.dialogVisible && this.dataFromCell.eventType === "edit";
    },
    formatYYMMDD() {
      let date = this.dataFromCell.date.getDate();
      let month = this.dataFromCell.date.getMonth() + 1;
      let year = this.dataFromCell.date.getFullYear();
      return `${year}-${("0" + month).slice(-2)}-${("0" + date).slice(-2)}`;
    },
    formatDDMMYY() {
      let date = this.dataFromCell.date.getDate();
      let month = this.dataFromCell.date.getMonth() + 1;
      let year = this.dataFromCell.date.getFullYear();
      return `${("0" + date).slice(-2)}-${("0" + month).slice(-2)}-${year}`;
    },
  },

  methods: {
    closeDialog() {
      this.$emit("stateEventDialog");
    },
    async editHoliday() {
      const bodyData = `{"mktcode": "${this.enteredDialog.marketType}","holidaydate": "${this.formatYYMMDD}","description": "${this.enteredDialog.description}","cantrade": "${this.enteredDialog.cantrade}"}`;

      await useFetch(() => "https://10.22.26.103/beam/holiday/edit", {
        method: "POST",
        params: { id: this.dataFromCell.id },
        body: JSON.parse(bodyData),
      });

      let url = `https://10.22.26.103/beam/holiday?mkt=${
        this.dataFromCell.mktcode
      }&year=${this.date.getFullYear()}`;

      await fetch(url)
        .then((response) => response.json())
        .then((result) => (this.store.holidays = result.data))
        .catch((error) => {
          console.log(error);
          this.store.holidays = [];
        });

      this.closeDialog();
    },
    async addHoliday() {
      const bodyData = `{"mktcode": "${this.enteredDialog.marketType}","holidaydate": "${this.formatYYMMDD}","description": "${this.enteredDialog.description}","cantrade": "${this.enteredDialog.cantrade}"}`;

      await useFetch(() => "https://10.22.26.103/beam/holiday/insert", {
        method: "POST",
        body: JSON.parse(bodyData),
      });

      let url = `https://10.22.26.103/beam/holiday?mkt=${
        this.dataFromCell.mktcode
      }&year=${this.date.getFullYear()}`;

      await fetch(url)
        .then((response) => response.json())
        .then((result) => (this.store.holidays = result.data))
        .catch((error) => {
          console.log(error);
          this.store.holidays = [];
        });

      this.closeDialog();
    },
  },
};
</script>
