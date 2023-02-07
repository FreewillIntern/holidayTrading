<template>
  <div class="dialog-add">
    <!-- Add Form -->
    <el-dialog
      v-model="addCell"
      :before-close="closeDialog"
      title="Add holiday date"
    >
      <el-form :model="enteredDialog">
        <el-form-item label="Description">
          <el-input v-model="enteredDialog.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Market type">
          <el-select
            v-model="enteredDialog.marketType"
            placeholder="Please select a type of market"
          >
            <el-option
              v-for="value in store.getDataMarket"
              :label="value.mktname"
              :value="value.mktcode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Cantrade type">
          <el-select
            v-model="enteredDialog.cantrade"
            placeholder="Please select a type of market"
          >
            <el-option
              v-for="value in cantradeArray"
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
      <el-form :model="enteredDialog">
        <el-form-item label="Description">
          <el-input v-model="enteredDialog.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Market type">
          <el-select
            v-model="enteredDialog.marketType"
            placeholder="Please select a type of market"
          >
            <el-option
              v-for="value in store.getDataMarket"
              :label="value.mktname"
              :value="value.mktcode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Cantrade type">
          <el-select
            v-model="enteredDialog.cantrade"
            placeholder="Please select a type of market"
          >
            <el-option
              v-for="value in cantradeArray"
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
    const store = ref(useMainStore());
    return { store };
  },
  props: {
    dialogVisible: { type: Boolean, require: true },
    dataFromCell: { type: Object, require: true },
  },
  emits: ["stateDialog"],
  data() {
    return {
      enteredDialog: {
        marketType: "",
        description: "",
        cantrade: "",
      },
    };
  },
  computed: {
    cantradeArray() {
      return ["N", "T", "S"];
    },
    addCell() {
      if (this.dialogVisible) {
        if (this.dataFromCell.eventType === "add") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    editCell() {
      if (this.dialogVisible) {
        if (this.dataFromCell.eventType === "edit") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
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
      this.enteredDialog.description = "";
      this.enteredDialog.marketType = "";
      this.enteredDialog.cantrade = "";
      this.$emit("stateDialog");
    },
    async editHoliday() {
      const bodyData = `{"mktcode": "${this.enteredDialog.marketType}","holidaydate": "${this.formatYYMMDD}","description": "${this.enteredDialog.description}","cantrade": "${this.enteredDialog.cantrade}"}`;
      await useFetch(() => "https://10.22.26.103/beam/holiday", {
        params: { id: this.dataFromCell.id },
        method: "PUT",
        body: JSON.parse(bodyData),
      });
      this.closeDialog();
    },
    async addHoliday() {
      const bodyData = `{"mktcode": "${this.enteredDialog.marketType}","holidaydate": "${this.formatYYMMDD}","description": "${this.enteredDialog.description}","cantrade": "${this.enteredDialog.cantrade}"}`;
      await useFetch(() => "https://10.22.26.103/beam/holiday", {
        method: "POST",
        body: JSON.parse(bodyData),
      });
      this.closeDialog();
    },
  },
};
</script>
