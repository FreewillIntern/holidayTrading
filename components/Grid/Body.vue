<template>
    <Grid ref="grid"
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
                    @remove="remove"
                />
             </template>
    </Grid>
</template>
<script>
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { Button } from '@progress/kendo-vue-buttons';
import { useMainStore } from "~~/stores/data";
import CommandCell from './CommandCell';

export default {
    setup() {
        const store = useMainStore();
        console.log("steup",store.holidays);
        return { store };
    },
    mounted() {
        console.log("mounted",this.store.holidays);
    },
    components: {
        'Grid': Grid,
        'toolbar': GridToolbar,
        'kbutton': Button,
        'custom': CommandCell,
    },
    data: function () {
        console.log("data",this.store.holidays);
        return {
            editItem: undefined,
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
                { cell: 'myTemplate', width: '80px' },
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
        async remove(e) {
            e.dataItem.inEdit = undefined;
            this.update(this.gridData, e.dataItem, true);
            this.gridData = this.gridData.slice();
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
            this.gridData = this.gridData;
            this.editField = undefined;
        },
        itemChange: async function (e) {
            e.dataItem[e.field] = e.value;
            const bodyData =`{"mktcode": "${e.dataItem.mktcode}","holidaydate": "${e.dataItem.holidaydate}","description": "${e.dataItem.description}","cantrade": "${e.dataItem.cantrade}"}`
            await useFetch(() => this.url + "holiday/edit", {
                method: 'POST',
                body: JSON.parse(bodyData)
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
            this.gridData = this.gridData;
        },
        cellClick: function (e) {
            if (e.dataItem.inEdit && e.field === this.editField) {
                return;
            }
            this.editField = e.field;
            this.gridData = this.gridData;
            e.dataItem.inEdit = e.field;
        }
    }
};

</script>

