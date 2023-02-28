<template>
  <div class="h-full">
    <!--LOADING-->
    <teleport to="body">

      <div 
        v-show="!loading"
        class="
          z-[999] 
          fixed 
          top-0 
          left-0 
          w-full 
          h-screen 
          flex 
          flex-col 
          justify-center 
          items-center 
          bg-zinc-700"
      >

        <UILoader />

      </div>

    </teleport>
    <!--LOADING-->

    <!--TABLE-->
    <div v-show="loading" class="h-full">

      <Grid 
        ref="grid" 
        class="h-full rounded-lg gridCustomStyle" 
        :data-items="setGridData" 
        :edit-field="'inEdit'"
        :sortable="true" 
        :sort="sort" 
        :row-render="rowRender"
        :columns="columns"
        @rowclick="rowClick" 
        @cellclick="cellClick" 
        @sortchange="sortChangeHandler" @itemchange="itemChange"
      >

        <template v-slot:myTemplate="{ props }">

          <GridCommandCell 
            :data-item="props.dataItem" 
            @preRemove="setModalVisible" 
          />

        </template>

      </Grid>

    </div>
    <!--TABLE-->

    <!--MODAL-->
    <teleport to="body">
      <i-modal v-model="visible" size="lg" :showClose="false">
        <template #header>
          Delete
        </template>

        Please confirm your action.

        <template #footer>

          <div class="w-full h-full flex justify-end items-end">

            <i-button color="danger" @click="remove" class="mr-4">Delete</i-button>

            <i-button color="dark" @click="visible = false">Cancle</i-button>

          </div>

        </template>

      </i-modal>
    </teleport>
    <!--MODAL-->
  </div>
</template>

<script lang="ts">
//KENDO GRID IMPORT
import {
  Grid,
  GridSortChangeEvent,
  GridToolbar,
  GridRowClickEvent,
} from "@progress/kendo-vue-grid";
import { orderBy } from "@progress/kendo-data-query";
import { Button } from "@progress/kendo-vue-buttons";

//PIANIA STORE IMPORT
import { useMainStore } from "@/stores/data";

//TPYE INTERFACE IMPORT
import { Holiday, Data } from "@/types/Mytype.interfaces";

//RECOMENDED FROM NUXT (DEFINECOMPONENT) IMPORT
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useMainStore();
    return { store };
  },

  components: {
    Grid: Grid,
    toolbar: GridToolbar,
    kbutton: Button,
  },

  data(): Data {
    return {
      editItem: undefined,
      sort: [{ field: "holidaydate", dir: "asc" }],
      loader: false,
      currentEdit: null,
      visible: false,
      changes: false,
      editID: null,
      editField: undefined,
      group: [{ field: "UnitsInStock" }],
      expandedItems: [],
      columns: [
        {
          field: "holidaydate",
          editable: false,
          title: "Holiday Date",
          width: "150px",
        },
        { field: "cantrade", editable: false, title: "Type" },
        { field: "description", title: "Description" },
        { cell: "myTemplate" },
      ],
      gridData: [],
      url: useRuntimeConfig().public.apiBase,

      loading: false,
    };
  },

  computed: {
    setGridData() {
      let store = this.store.holidays;
      store.forEach((d) => {
        let dateArr = d.holidaydate.split("/");

        let year = dateArr[2];
        let month = dateArr[1];
        let day = dateArr[0];

        let dDate = `${year}${month}${day}`;

        d.holidaydate = dDate;
      }); 

      this.store.holidays = orderBy(this.store.holidays, this.sort);

      this.store.holidays.forEach((d) => {
        let year = d.holidaydate.slice(0, 4);
        let month = d.holidaydate.slice(4, 6);
        let date = d.holidaydate.slice(6, 8);

        d.holidaydate = `${date}/${month}/${year}`;
      });

      this.gridData = this.store.holidays;

      this.loading = true;
      return this.gridData;
    },
  },

  methods: {
    sortChangeHandler: function (e: GridSortChangeEvent) {
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
        this.sort = e.sort;
      }, 2000);
    },

    setModalVisible(e: any) {
      this.visible = !this.visible;
      this.currentEdit = e.dataItem;
    },

    update(data: object[], item: any, remove: boolean) {
      let updated;
      let itemProductID = item.ProductID;
      let index = data.findIndex(
        (p: any) =>
          JSON.stringify({ ...p }) === JSON.stringify(item) ||
          (itemProductID && p.ProductID === itemProductID)
      );

      if (index >= 0) {
        updated = Object.assign({}, item);
        data[index] = updated;
      } else {
        let id = 1;
        data.forEach((p: any) => {
          id = Math.max(p.ProductID + 1, id);
        });
        updated = Object.assign({}, item, { ProductID: id });
        data.unshift(updated);
        index = 0;
      }

      if (remove) {
        data = data.splice(index, 1);
      }

      return data[index];
    },

    rowRender(h: any, trElement: any, defaultSlots: any, props: any) {
      if (!props.dataItem.inEdit) {
        return trElement;
      }
      return h(
        "tr",
        {
          class: props.class,
          onMousedown:()=>{
            this.exitEdit(props.dataItem);
          },
        },
        defaultSlots
      );
    },

    exitEdit(dataItem: any) {
      if (dataItem.inEdit) {
        return;
      }
      this.gridData.forEach((d: Holiday) => {
        if (d.inEdit) {
          d.inEdit = undefined;
        }
      });
      this.editField = undefined;
    },

    async itemChange(e: any) {
      
      e.dataItem[e.field] = e.value;

      const bodyData = `{
        "mktcode": "${e.dataItem.mktcode}",
        "holidaydate": "${e.dataItem.holidaydate}",
        "description": "${e.dataItem.description}",
        "cantrade": "${e.dataItem.cantrade}"
      }`;

      await useFetch(
        this.url + "holiday/edit",
        {
          method: "POST",
          body: JSON.parse(bodyData),
          onRequestError({ request, options, error }) {
            console.log('[fetch request error]', request, error);
          },
          onResponseError({ request, response, options }) {
            console.log('[fetch response error]', request, response.status, response.body)
          }
        }
      );

      const fetchData = await useFetch(
        this.url + `holiday`,
        {
          query: {
            mkt: this.store.marketCode,
            year: this.store.year
          },
          onRequestError({ request, options, error }) {
            console.log('[fetch request error]', request, error);
          },
          onResponseError({ request, response, options }) {
            console.log('[fetch response error]', request, response.status, response.body)
          }
        }
      );
      
      this.changes = true;
    },

    rowClick(e: GridRowClickEvent) {
      this.gridData.forEach((d) => {
        if (d.inEdit) {
          if (e.dataItem !== d) {
            d.inEdit = undefined;
          }
        }
      });
    },

    cellClick(e: any) {
      if (e.dataItem.inEdit && e.field === this.editField) {
        return;
      }
      this.editField = e.field;
      e.dataItem.inEdit = e.field;
    },

    async remove() {
      this.update(this.gridData, this.currentEdit, true);
      this.visible = false;
      await useFetch(
        this.url + "holiday/delete", 
        {
          method: "POST",
          query: {
            mkt: this.currentEdit.mktcode,
            date: this.currentEdit.holidaydate
          },
          onRequestError({ request, options, error }) {
            console.log('[fetch request error]', request, error);
          },
          onResponseError({ request, response, options }) {
            console.log('[fetch response error]', request, response.status, response.body)
          }
        }
      );
      this.currentEdit = undefined;
    },
  },
});
</script>

<style>
.gridCustomStyle .k-table,
.gridCustomStyle .k-cell-inner,
.gridCustomStyle .k-link,
.gridCustomStyle .k-grid-aria-root {
  border-radius: 10px;
  border: 0px;
}

.gridCustomStyle tbody tr:nth-child(odd) {
  transition: 1s;
  background-color: #272727c9;
  color: white;
}

.gridCustomStyle table colgroup col {
  min-width: 100px;
}

.gridCustomStyle tbody tr:nth-child(even) {
  background-color: #00000080;
  color: white;
  transition: 1s;
}

.k-grid {
  background-color: transparent;
}

.k-grid-container {
  background-color: transparent;
}

.k-grid-content {
  background-color: transparent;
}

.gridCustomStyle .k-grid {
  background-color: transparent;
  color: black;
}

.gridCustomStyle .k-grid-aria-root {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

.gridCustomStyle .k-grid-header {
  background-color: rgb(0, 0, 0);
  color: azure;
}

.gridCustomStyle tr:hover {
  transition: 2s;
}

.gridCustomStyle tbody tr:hover {
  color: black;
}

.gridCustomStyle tr:hover {
  transition-delay: 1s;
  background-color: transparent;
}

div.k-grid-content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f500;
}

div.k-grid-content::-webkit-scrollbar {
  width: 0px;
  background-color: #f5f5f500;
}

div.k-grid-content::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(20, 20, 20, 0.719);
  background-color: #202020;
}

.gridCustomStyle .k-grid-content {
  overflow: auto;
}
</style>
