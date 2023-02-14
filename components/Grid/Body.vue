<template>
    <Grid ref="grid"
            class="h-[78.4vh] rounded-lg"
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
            let cloneStore = this.store.holidays
            this.gridData = cloneStore
            this.gridData.forEach(d => {
                    let splitDate = d.holidaydate.split("-")
                    if (splitDate[0].length > 2){
                        d.holidaydate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
                    }
            })
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
            let formatDate = e.dataItem.holidaydate.split("-")
            let sendDate = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`
            await useFetch(() => this.url + "holiday/delete?mkt=" + e.dataItem.mktcode + "&date=" + sendDate, {
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
            let formatDate = e.dataItem.holidaydate.split("-")
            let sendDate = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`
            const bodyData =`{"mktcode": "${e.dataItem.mktcode}","holidaydate": "${sendDate}","description": "${e.dataItem.description}","cantrade": "${e.dataItem.cantrade}"}`
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
 
<style scoped>
    .k-table , .k-grid-aria-root, .k-grid-header, .k-cell-inner, .k-link, .k-grid-aria-root {
        border-radius: 10px;
    }
    tr:nth-child(odd) {background-color: #ffffff;}

</style>

