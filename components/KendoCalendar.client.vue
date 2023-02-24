<template>
  <div
    class="holiday-description grid grid-cols-3 w-[100%] h-[8%] flex justify-evenly mx-auto bg-[rgba(32,32,32,0.95)] rounded-xl items-center text-white shadow-[rgba(0,0,0,0.45)_0px_25px_20px_-20px]"
  >
    <div class="cantrade-des ct-n flex justify-center items-center">
      <div
        class="cantrade-des-header m-2 justify-center items-center bg-[rgb(255,153,153)] text-black"
      >
        <p>N</p>
      </div>
      <div class="cantrade-des-body">
        <p class="equal-symbol">=</p>
        <p>No Trading and Settlement</p>
      </div>
    </div>
    <div class="cantrade-des ct-t flex justify-center items-center">
      <div
        class="cantrade-des-header m-2 justify-center items-center bg-[rgba(255,255,153)] text-black"
      >
        <p>T</p>
      </div>
      <div class="cantrade-des-body">
        <p class="equal-symbol">=</p>
        <p>Trade only (No settlement)</p>
      </div>
    </div>
    <div class="cantrade-des ct-s flex justify-center items-center">
      <div
        class="cantrade-des-header m-2 justify-center items-center bg-[rgba(153,204,255)] text-black"
      >
        <p>S</p>
      </div>
      <div class="cantrade-des-body">
        <p class="equal-symbol">=</p>
        <p>Settlement only (No Trading)</p>
      </div>
    </div>
  </div>
  <div class="h-[2%]"></div>
  <div class="main-calendar overflow-auto h-[90%]">
    <div
      class="grid w-[100%]"
      :class="{
        'grid-cols-4': columns >= 4,
        'grid-cols-3': columns == 3,
        'grid-cols-2': columns == 2,
        'grid-cols-1': columns == 1,
      }"
    >
      <!-- Calendar 12 month -->
      <CalendarSingleCalendar
        v-for="(month, index) in months"
        :monthlyLeave="monthlyLeave[month]"
        :month="index"
        :year="year"
        :key="month"
        @click-left="clickShowCellDate"
        @click-right="clickEventCellDate"
      ></CalendarSingleCalendar>

      <!-- Dialog Information -->
      <DialogDateInformation
        v-if="informationDialogVisible"
        :dialogVisible="informationDialogVisible"
        :dataDateSelected="dataDateSelected"
        @state-information-dialog="updateInformationDialogState"
      />

      <!-- Dialog Event -->
      <DialogEventHoliday
        v-if="eventDialogVisible"
        :dialogVisible="eventDialogVisible"
        :dataDateSelected="dataDateSelected"
        @state-event-dialog="updateEventDialogState"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMainStore } from "../stores/data";
import { useWindowSize } from "@vueuse/core";

interface DateInformation {
  date: number;
  cantrade: string;
  description: string;
}

interface DataHoliday {
  mktcode: string;
  cantrade: string;
  description: string;
  holidaydate: string;
}

interface ObjectHolidays {
  [key: string]: DateInformation[];
}

export default defineComponent({
  setup() {
    const store = useMainStore();
    return { store };
  },

  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      window: useWindowSize(),
      dataDateSelected: {},
      eventDialogVisible: false,
      informationDialogVisible: false,
    };
  },

  computed: {
    columns(): number {
      let widthWindow = this.window.width * 0.63;
      let widthCalendar = 300;
      let cols =
        Math.floor(widthWindow / widthCalendar) < 1
          ? 1
          : Math.floor(widthWindow / widthCalendar);
      return cols;
    },
    monthlyLeave(): ObjectHolidays {
      const objectHolidays: ObjectHolidays = {
        January: [],
        February: [],
        March: [],
        April: [],
        May: [],
        June: [],
        July: [],
        August: [],
        September: [],
        October: [],
        November: [],
        December: [],
      };

      const dataHolidays: DataHoliday[] = this.store.getDataHolidays;

      if (dataHolidays.length > 0) {
        dataHolidays.forEach((element) => {
          let splitDate: string[] = element.holidaydate.split("/");
          let splitDateNum: number[] = [];
          splitDate.forEach((n: string) => splitDateNum.push(+n));
          let dateInformation = {
            date: Number(splitDate[0]),
            cantrade: element.cantrade,
            description: element.description,
          };
          console.log("dateInformation", dateInformation);
          objectHolidays[this.months[splitDateNum[1] - 1]].push(
            dateInformation
          );
        });
      }
      return objectHolidays;
    },
    year(): number {
      if (this.store.year === "") {
        return new Date().getFullYear();
      } else {
        return Number(this.store.year);
      }
    },
  },

  methods: {
    clickEventCellDate(data: object) {
      console.log("clickEventCellDate: ", data);
      this.dataDateSelected = data;
      this.dataDateSelected.mktcode = this.store.getMarketCode;
      this.eventDialogVisible = true;
    },
    clickShowCellDate(data: object) {
      console.log("clickShowCellDate: ", data);
      this.dataDateSelected = data;
      this.informationDialogVisible = true;
    },
    updateInformationDialogState() {
      this.informationDialogVisible = false;
      this.dataDateSelected = {};
    },
    updateEventDialogState() {
      this.eventDialogVisible = false;
      this.dataDateSelected = {};
    },
    // sayHiFucntion() {
    //   function sayHi(): string;
    //   function sayHi(name: string): string;
    //   function sayHi(name?: unknown): unknown {
    //     if (!name) {
    //       return "hi";
    //     }
    //     if (typeof name == "string") {
    //       return "hi" + name;
    //     }
    //     throw new Error("Error type name");
    //   }
    // },
  },
});
</script>

<style>
div.main-calendar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f500;
}

div.main-calendar::-webkit-scrollbar {
  display: none;
  width: 5px;
  background-color: #f5f5f500;
}

div.main-calendar::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(20, 20, 20, 0.582);
  background-color: #000000e3;
  border-radius: 1rem;
}

.cantrade-des-header {
  display: flex;
  border-radius: 50%;
  min-width: 2rem;
  max-width: 2rem;
  min-height: 2rem;
  max-height: 2rem;
}

.cantrade-des-body {
  display: flex;
}
.equal-symbol {
  margin-right: 0.35rem;
  margin-left: -0.1rem;
}

@media (max-width: 93.75rem) {
  .cantrade-des {
    max-height: 80% !important;
    display: grid;
    align-self: center;
    justify-self: center;
    justify-content: center;
    font-size: 1vw;
  }

  .cantrade-des-header {
    margin: 0rem;
    align-self: center;
    justify-self: center;
    border-radius: 50%;
    min-width: 1.4rem;
    max-width: 1.4rem;
    min-height: 1.4rem;
    max-height: 1.4rem;
  }

  .cantrade-des-body {
    align-self: center;
    justify-self: center;
    padding: 0.1rem;
  }

  .equal-symbol {
    display: none;
  }
}

.main-calendar {
  box-shadow: inset 0 0 10px #000000;
  border-radius: 0.7rem;
}

@media (max-width: 900px) {
  .holiday-description {
    height: 15% !important;
  }

  .main-calendar {
    height: 85% !important;
  }

  .cantrade-des {
    font-size: 0.65rem !important;
  }
}
</style>
