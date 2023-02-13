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
              v-for="value in cantradeChoise"
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
              v-for="value in cantradeChoise"
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
export default {
  setup() {
    const store = useMainStore();
    return { store };
  },

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

  emits: ["stateEventDialog"],

  data() {
    return {
      cantradeChoise: ["N", "T", "S"],
      date: this.dataDateSelected.date,
      enteredDialog: {
        marketType: this.dataDateSelected.mktcode,
        description: this.dataDateSelected.description,
        cantrade: this.dataDateSelected.cantrade,
      },
    };
  },

  computed: {
    addCell() {
      return this.dialogVisible && !this.dataDateSelected.isHoliday;
    },
    editCell() {
      return this.dialogVisible && this.dataDateSelected.isHoliday;
    },
    formatYYMMDD() {
      let date = this.dataDateSelected.date.getDate();
      let month = this.dataDateSelected.date.getMonth() + 1;
      let year = this.dataDateSelected.date.getFullYear();
      return `${year}-${("0" + month).slice(-2)}-${("0" + date).slice(-2)}`;
    },
    formatDDMMYY() {
      let date = this.dataDateSelected.date.getDate();
      let month = this.dataDateSelected.date.getMonth() + 1;
      let year = this.dataDateSelected.date.getFullYear();
      return `${("0" + date).slice(-2)}-${("0" + month).slice(-2)}-${year}`;
    },
  },

  methods: {
    closeDialog() {
      this.$emit("stateEventDialog");
    },
    async fetchaddAPI() {
      const bodyData = `{"mktcode": "${this.enteredDialog.marketType}","holidaydate": "${this.formatYYMMDD}","description": "${this.enteredDialog.description}","cantrade": "${this.enteredDialog.cantrade}"}`;
      let urlGetHolidays = `https://10.22.26.103/beam/holiday?mkt=${
        this.dataDateSelected.mktcode
      }&year=${this.date.getFullYear()}`;
      await useFetch(() => "https://10.22.26.103/beam/holiday/insert", {
        method: "POST",
        body: JSON.parse(bodyData),
      });
      await fetch(urlGetHolidays)
        .then((response) => response.json())
        .then((result) => this.store.updateHolidays(result.data))
        .catch((error) => {
          console.log(error);
          this.store.updateHolidays([]);
        });
    },
    async fetchEditAPI() {
      const bodyData = `{"mktcode": "${this.enteredDialog.marketType}","holidaydate": "${this.formatYYMMDD}","description": "${this.enteredDialog.description}","cantrade": "${this.enteredDialog.cantrade}"}`;
      let urlGetHolidays = `https://10.22.26.103/beam/holiday?mkt=${
        this.dataDateSelected.mktcode
      }&year=${this.date.getFullYear()}`;
      await useFetch(() => "https://10.22.26.103/beam/holiday/edit", {
        method: "POST",
        body: JSON.parse(bodyData),
      });
      await fetch(urlGetHolidays)
        .then((response) => response.json())
        .then((result) => this.store.updateHolidays(result.data))
        .catch((error) => {
          console.log(error);
          this.store.updateHolidays([]);
        });
    },
    async addHoliday() {
      if (
        this.enteredDialog.description === undefined ||
        this.enteredDialog.description === null
      ) {
        this.enteredDialog.description = "";
      }
      this.fetchaddAPI();
      this.closeDialog();
    },
    async editHoliday() {
      if (
        this.enteredDialog.description === undefined ||
        this.enteredDialog.description === null
      ) {
        this.enteredDialog.description = "";
      }
      this.fetchEditAPI();
      this.closeDialog();
    },
  },
};
</script>
