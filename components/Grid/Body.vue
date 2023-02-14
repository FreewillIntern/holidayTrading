<template>
    <Grid ref="grid"
            class="h-[78.4vh] rounded-lg gridCustomStyle"
             :data-items="setGridData"
             :edit-field="'inEdit'"
             @rowclick="rowClick"
             @cellclick="cellClick"
             :row-render="rowRender"
             @itemchange="itemChange"
             :columns="columns">
             <template v-slot:myTemplate="{ props }">
                <custom
                    :data-item="props.dataItem"
                    @preRemove="setModalVisible"
                />
             </template>
    </Grid>
    <i-modal v-model="visible" size="lg" :showClose="false">
        <template #header>
            Delete
        </template>
        Please confirm your action.
        <template #footer>
            <div class="w-full h-full flex justify-end items-end">
                <i-button color="danger" @click="remove(this.currentEdit)" class="mr-4">Delete</i-button>
                <i-button color="dark" @click="visible=false" >Cancle</i-button>
            </div>
        </template>
    </i-modal>
</template>
<script>
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { Button } from '@progress/kendo-vue-buttons';
import { useMainStore } from "~~/stores/data";
import CommandCell from './CommandCell';

export default {
    setup() {
        const store = useMainStore();
        return { store };
    },
    components: {
        'Grid': Grid,
        'toolbar': GridToolbar,
        'kbutton': Button,
        'custom': CommandCell,
    },
    data: function () {
        return {
            editItem: undefined,
            currentEdit: null,
            visible: false,
            changes: false,
            updatedData: [],
            editID: null,
            editField: undefined,
            group: [ { field: 'UnitsInStock' } ],
            expandedItems: [],
            columns: [
                { field: 'holidaydate', editable: false, title: 'Holiday Date'},
                { field: 'cantrade', editable: false, title: 'Type' },
                { field: 'description', title: 'Description'},
                { cell: 'myTemplate', width: '100px' },
            ],
            gridData: [],
            url: useRuntimeConfig().public.apiBase
        };
    },
    computed:{
        setGridData(){
            this.gridData = this.store.holidays
            return this.gridData
        }
    },
    methods: {
        setModalVisible(currentEdit){
            this.visible = !this.visible
            this.currentEdit = currentEdit
        },
        update(data, item, remove) {
            let updated;
            let itemProductID = item.ProductID;
            let index = data.findIndex(
                (p) =>
                JSON.stringify({ ...p }) === JSON.stringify(item) ||
                (itemProductID && p.ProductID === itemProductID)
            );
            if (index >= 0) {
                updated = Object.assign({}, item);
                data[index] = updated;
            } else {
                let id = 1;
                data.forEach((p) => {
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
        preHandleDelete(identify){
            this.isVisible = true
        },
        async remove(e) {
            e.dataItem.inEdit = undefined;
            this.update(this.gridData, e.dataItem, true);
            this.currentEdit = null;
            this.visible = false;
            await useFetch(() => this.url + "holiday/delete?mkt=" + e.dataItem.mktcode + "&date=" + e.dataItem.holidaydate, {
                method: 'POST',
            });
        },
        rowRender: function (h, trElement , defaultSlots, props ) {
            if (!props.dataItem.inEdit) {
                return trElement;
            }
            return h(
                'tr',
                { 
                    class: props.class,
                    onMousedown: () => {
                        this.exitEdit(props.dataItem)
                    }
                },
                defaultSlots);
        },
        exitEdit: function (dataItem) {
            if (dataItem.inEdit) {
                return;
            }
            this.gridData.forEach((d) => {
                if (d.inEdit) {
                    d.inEdit = undefined;
                }
            });
            this.editField = undefined;
        },
        itemChange: async function (e) {
            e.dataItem[e.field] = e.value;
            const bodyData =`{"mktcode": "${e.dataItem.mktcode}","holidaydate": "${e.dataItem.holidaydate}","description": "${e.dataItem.description}","cantrade": "${e.dataItem.cantrade}"}`
            await useFetch(() => this.url + "holiday/edit", {
                method: 'POST',
                body: JSON.parse(bodyData)
            });
            this.store.holidays = await useFetch(() => this.url + `?mkt=${this.store.marketCode}&year=${this.store.year}`, {
                method: 'GET'
            });
            this.changes = true;
        },
        rowClick: function (e) {
            this.gridData.forEach((d) => {
                if (d.inEdit) {
                    if (e.dataItem !== d) {
                        d.inEdit = undefined;
                    }
                }
            });
        },
        cellClick: function (e) {
            if (e.dataItem.inEdit && e.field === this.editField) {
                return;
            }
            this.editField = e.field;
            e.dataItem.inEdit = e.field;
        }
    }
};

</script>
 
<style >
    .gridCustomStyle .k-table ,.gridCustomStyle .k-grid-aria-root, .gridCustomStyle .k-cell-inner,.gridCustomStyle .k-link,.gridCustomStyle .k-grid-aria-root {
        border-radius: 10px;
        border: 0px;
    }
    .gridCustomStyle tbody tr:nth-child(odd) {
        transition: 1s;
        background-color: #0000005e;
        color: white;
    }

    .gridCustomStyle tbody tr:nth-child(even) {
        background-color: #00000080;
        color: white;
        transition: 1s;
    }
    
    .k-grid{
        background-color: transparent;
    }

    .k-grid-container{
        background-color: transparent;
    }

    .k-grid-content{
        background-color: transparent;
    }

    .gridCustomStyle .k-grid {
        background-color: transparent;
        color: black;
    }

    .gridCustomStyle .k-grid-aria-root{
        background-color: rgba(0, 0, 0, 0);
        border: none;
    }

    .gridCustomStyle .k-grid-header{
        background-color: rgb(0, 0, 0);
        color: azure;
    }

    .gridCustomStyle tr:hover {
        transition: 2s;
    }

    .gridCustomStyle tbody tr:hover {
        color: black;
    }

    .gridCustomStyle tr:hover{
        transition: 1s;
        background-color: transparent;
    }

    div.k-grid-content::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #f5f5f500;
    }

    div.k-grid-content::-webkit-scrollbar
    {
        width: 8px;
        background-color: #f5f5f500;
    }

    div.k-grid-content::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(20, 20, 20, 0.582);
        background-color: #3a3a3ae3;
    }


</style>

