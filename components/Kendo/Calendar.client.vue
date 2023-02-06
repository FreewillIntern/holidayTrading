<template>
  <div
    class="grid overflow-auto items-center w-full h-full bg-slate-50"
    :class="{
      'grid-cols-4': columns === 4,
      'grid-cols-3': columns === 3,
      'grid-cols-2': columns === 2,
      'grid-cols-1': columns === 1,
    }"
  >
    <!-- Calendar 12 month -->
    <calendar
      :class="'p-[3%]'"
      v-for="month in months"
      :monthlyLeave="monthlyLeave[month]"
      :month="month"
      :year="year"
      :key="month"
      @clickLeft="showDataCell"
      @clickRight="eventEditCell"
    />
    >
  </div>

  <!-- Edit Cell -->
  <div class="edit-cell">
    <el-dialog
      v-model="addCell"
      title="Edit cell"
      :before-close="handleDialogClose"
    >
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
          <el-button type="primary" @click="dialog.visible = false">
            Save
          </el-button>
          <el-button @click="dialog.visible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <!-- Edit Cell -->
  <div class="add-cell">
    <el-dialog
      v-model="editCell"
      title="add cell"
      :before-close="handleDialogClose"
    >
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
          <el-button type="primary" @click="dialog.visible = false">
            Save
          </el-button>
          <el-button @click="dialog.visible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import singleCalendarClient from "~~/components/Kendo/SingleCalendar.client.vue";
import { useMainStore } from "~~/stores/data";
import { useWindowSize } from "@vueuse/core";

export default {
  components: {
    calendar: singleCalendarClient,
  },
  setup() {
    const store = ref(useMainStore());

    return { store };
  },
  data() {
    return {
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      window: useWindowSize(),
      dialog: { visible: false, width: "140px" },
      enteredDialog: {},
      dataFromCell: {},
    };
  },
  computed: {
    columns() {
      let widthWindow = this.window.width * 0.6;
      let widthCalendar = 260;
      let cols =
        Math.floor(widthWindow / widthCalendar) < 1
          ? 1
          : Math.floor(widthWindow / widthCalendar);
      return cols;
    },
    monthlyLeave() {
      const obJectHolidays = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
      };
      const holidays = this.holidays;
      if (holidays.length > 0) {
        for (const day of holidays) {
          const splitDate = day.split("-");
          obJectHolidays[Number(splitDate[1]) - 1].push(Number(splitDate[2]));
        }
      }
      return obJectHolidays;
    },
    year() {
      if (this.store.year === "") {
        return new Date().getFullYear();
      } else {
        return Number(this.store.year);
      }
    },
    holidays() {
      if (this.store.year === "") {
        return [];
      } else {
        const arrayOfHolidays = [];
        const days = this.store.holidays;
        for (let i = 0; i < days.length; i++) {
          arrayOfHolidays.push(days[i].holidaydate);
        }
        return arrayOfHolidays;
      }
    },
    lebelType() {
      return ["N", "H", "E"];
    },
    addCell() {
      if (this.dialog.visible) {
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
      if (this.dialog.visible) {
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
    handleDialogClose() {
      this.dialog.visible = false;
    },
    eventEditCell(data) {
      this.dataFromCell = data;
      this.dialog.visible = true;
    },
    showDataCell(data) {
      alert(data);
    },
  },
};
</script>
