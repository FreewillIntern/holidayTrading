<template>
  <!-- Add Cell -->
  <div class="add-cell">
    <el-dialog v-model="addCell" title="add cell" :before-close="dialogClose">
      {{ dataFromCell }}
      <el-form :model="form">
        <el-form-item label="Description" :label-width="dialog.width">
          <el-input v-model="enteredDialog.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveAddCell">Save</el-button>
          <el-button @click="dialogClose">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <!-- Edit Cell -->
  <div class="edit-cell">
    <el-dialog v-model="editCell" title="edit cell" :before-close="dialogClose">
      {{ dataFromCell }}
      <el-form :model="form">
        <el-form-item label="Description" :label-width="dialog.width">
          <el-input v-model="enteredDialog.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveEditCell">Edit</el-button>
          <el-button @click="dialogClose">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: { type: Boolean, require: true },
    dataFromCell: { type: Object, require: true },
  },
  emits: ["stateDialog"],
  data() {
    return { dialog: { visible: false, width: "140px" }, enteredDialog: {} };
  },
  computed: {
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
    formatDate() {
      let date = this.dataFromCell.date.getDate();
      let month = this.dataFromCell.date.getMonth() + 1;
      let year = this.dataFromCell.date.getFullYear();
      return `${year}-${("0" + month).slice(-2)}-${("0" + date).slice(-2)}`;
    },
  },
  methods: {
    dialogClose() {
      this.enteredDialog = {};
      this.$emit("stateDialog");
    },
    async saveEditCell() {
      const bodyData = `{"mktcode": "${this.dataFromCell.mktcode}","holidaydate": "${this.formatDate}","description": "${this.enteredDialog.description}","cantrade": "N"}`;
      await useFetch(() => "https://10.22.26.103/beam/holiday", {
        params: { id: this.dataFromCell.id },
        method: "PUT",
        body: JSON.parse(bodyData),
      });
      this.enteredDialog = {};
      this.$emit("stateDialog");
    },
    saveAddCell() {
      const bodyData = `{"mktcode": "${this.dataFromCell.mktcode}","holidaydate": "${this.formatDate}","description": "${this.enteredDialog.description}","cantrade": "N"}`;
      fetch("https://10.22.26.103/beam/holiday", {
        methods: "POST",
        body: JSON.parse(bodyData),
      });
      this.$emit("stateDialog");
    },
  },
};
</script>
