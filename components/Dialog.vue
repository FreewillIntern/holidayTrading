<template>
  <!-- Edit Cell -->
  <div class="edit-cell">
    <el-dialog v-model="addCell" title="add cell" :before-close="dialogClose">
      {{ dataFromCell }}
      <el-form :model="form">
        <el-form-item label="Description" :label-width="dialog.width">
          <el-input v-model="enteredDialog.type" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveEditCell">Save</el-button>
          <el-button @click="dialogClose">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <!-- Edit Cell -->
  <div class="add-cell">
    <el-dialog v-model="editCell" title="edit cell" :before-close="dialogClose">
      {{ dataFromCell }}
      <el-form :model="form">
        <el-form-item label="Description" :label-width="dialog.width">
          <el-input v-model="enteredDialog.type" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveAddCell"> Save </el-button>
          <el-button @click="dialogClose">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// import { useMainStore } from "~~/stores/data";
export default {
  // setup() {
  //   const store = useMainStore();
  //   return { store };
  // },
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
  },
  methods: {
    dialogClose() {
      this.enteredDialog = {};
      this.$emit("stateDialog");
    },
    saveEditCell() {
      fetch("https://10.22.26.103/beam/holiday/editHoliday", {
        params: "123", // ID of date
        body: {
          holidaydate: "",
          description: this.dataFromCell.description,
          cantrade: "N",
        },
      });
      this.enteredDialog = {};
      this.$emit("stateDialog");
    },
    saveAddCell() {
      fetch("https://10.22.26.103/beam/holiday/editHoliday", {
        body: {
          mktcode: "",
          holidaydate: "",
          description: "",
          cantrade: "",
        },
      });
      this.$emit("stateDialog");
    },
  },
};
</script>
