<template>
  <div class="dialog-add rounded">
    <!-- Add Form -->
    <i-modal v-model="addCell" color="white" size="lg" :hideOnClickOutside="false" :showClose="false">
      <template #header> Add holiday date </template>
      <template #default>
        <p class="pb-5">Date: {{ formatDDMMYY }}</p>
        <el-form :model="enteredDialog">
          <el-form-item label="Description">
            <el-input v-model="enteredDialog.description" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Market code" :rules="[{ required: true }]">
            <el-select v-model="enteredDialog.marketType" placeholder="Please select a type of market">
              <el-option v-for="value in store.getDataMarket" :key="value" :label="value.mktcode"
                :value="value.mktcode" />
            </el-select>
          </el-form-item>
          <el-form-item label="type" :rules="[{ required: true }]">
            <el-select v-model="enteredDialog.cantrade" placeholder="Please select a type">
              <el-option v-for="value in cantradeChoise" :key="value" :label="value" :value="value" />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addHoliday"> Add </el-button>
          <el-button @click="closeDialog"> Cancel </el-button>
        </span>
      </template>
    </i-modal>

    <!-- Edit form -->
    <i-modal v-model="editCell" color="white" size="lg" :hideOnClickOutside="false" :showClose="false">
      <template #header> Edit holiday date </template>
      <template #default>
        <p class="pb-5">Date: {{ formatDDMMYY }}</p>
        <el-form :model="enteredDialog">
          <el-form-item label="Description">
            <el-input v-model="enteredDialog.description" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Market code" :rules="[{ required: true }]">
            <el-select v-model="enteredDialog.marketType" placeholder="Please select a type of market">
              <el-option v-for="value in store.getDataMarket" :key="value" :label="value.mktcode"
                :value="value.mktcode" />
            </el-select>
          </el-form-item>
          <el-form-item label="type" :rules="[{ required: true }]">
            <el-select v-model="enteredDialog.cantrade" placeholder="Please select a type">
              <el-option v-for="value in cantradeChoise" :key="value" :label="value" :value="value" />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="editHoliday"> Edit </el-button>
          <el-button @click="closeDialog"> Cancel </el-button>
        </span>
      </template>
    </i-modal>
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
      url: useRuntimeConfig().public.apiBase,
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
      let urlGetHolidays = `${this.url}holiday?mkt=${this.dataDateSelected.mktcode}&year=${this.date.getFullYear()}`;
      await useFetch(() => `${this.url}holiday/insert`, {
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
      // let urlGetHolidays = `${this.url}holiday?mkt=${this.dataDateSelected.mktcode}&year=${this.date.getFullYear()}`;

      await useFetch(() => `${this.url}holiday/edit`, {
        method: "POST",
        body: JSON.parse(bodyData),
      });

      await fetch(`${this.url}holiday?mkt=${this.dataDateSelected.mktcode}&year=${this.date.getFullYear()}`)
        .then((response) => response.json())
        .then((result) => this.store.updateHolidays(result.data))
        .catch((error) => {
          console.log(error);
          this.store.updateHolidays([]);
        });
    },
    async addHoliday() {
      if (this.enteredDialog.cantrade === undefined) {
        alert("Plase select holiday type");
      } else {
        if (
          this.enteredDialog.description === undefined ||
          this.enteredDialog.description === null
        ) {
          this.enteredDialog.description = "";
        }
        this.fetchaddAPI();
        this.closeDialog();
      }
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
