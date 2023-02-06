<template>
  <!-- Edit Cell -->
  <div class="edit-cell">
    <el-dialog v-model="addCell" title="Edit cell" :before-close="dialogClose">
      <el-form :model="form">
        <el-form-item label="Description" :label-width="dialog.width">
          <el-input v-model="enteredDialog.type" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="Type" :label-width="dialog.width">
          <el-select v-model="form.region" placeholder="Please select a type">
            <el-option label="Zone No.1" value="shanghai" />
          </el-select>
        </el-form-item> -->
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
    <el-dialog v-model="editCell" title="add cell" :before-close="dialogClose">
      <el-form :model="form">
        <el-form-item label="Description" :label-width="dialog.width">
          <el-input v-model="enteredDialog.type" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="Type" :label-width="dialog.width">
          <el-select v-model="form.region" placeholder="Please select a type">
            <el-option label="Zone No.1" value="shanghai" />
          </el-select>
        </el-form-item> -->
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
export default {
  props: {
    dialogVisible: { type: Boolean },
    dataFromCell: { type: Object },
  },
  data() {
    return { dialog: { visible: false, width: "140px" }, enteredDialog: {} };
  },
  computed: {
    addCell() {
      if (this.dialogVisible) {
        console.log("add click!!!!");
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
        console.log("edit click!!!!");
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
      this.dialogVisible = false;
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
      this.dialogVisible = false;
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
    },
  },
};
</script>
