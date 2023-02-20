<template>
    <div>
        <div v-show="!loading" class="w-full h-full flex flex-col justify-center items-center">
            <div class="ring">Loading
                <span></span>
            </div>
        </div>
        <div v-show="loading">
            <Grid ref="grid"
                class="h-[78.4vh] rounded-lg gridCustomStyle"
                :data-items="setGridData"
                :edit-field="'inEdit'"
                @rowclick="rowClick"
                @cellclick="cellClick"
                :sortable="true"
                :sort="sort"
                :row-render="rowRender"
                @sortchange="sortChangeHandler"
                :loader="loader"
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
        </div>
    </div>
</template>
<script>
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { orderBy } from '@progress/kendo-data-query';
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
            sort: [{ field: 'holidaydate', dir: 'asc' }],
            currentEdit: null,
            visible: false,
            changes: false,
            updatedData: [],
            editID: null,
            editField: undefined,
            group: [ { field: 'UnitsInStock' } ],
            expandedItems: [],
            loader: false,
            columns: [
                { field: 'holidaydate', editable: false, title: 'Holiday Date', width: "150px"},
                { field: 'cantrade', editable: false, title: 'Type'},
                { field: 'description', title: 'Description'},
                { cell: 'myTemplate', width: '100px' },
            ],
            gridData: [],
            url: useRuntimeConfig().public.apiBase,
            loading: false,
        };
    },
    computed:{
        setGridData(){
            this.store.holidays.forEach(d => {
                let dateArr = d.holidaydate.split('/');

                let year = dateArr[2];
                let month = dateArr[1];
                let day = dateArr[0];
  
                let dDate = `${year}${month}${day}`;

                d.holidaydate = dDate;
            } )

            this.store.holidays = orderBy(this.store.holidays, this.sort);

            this.store.holidays.forEach(d => {
                let year = d.holidaydate.slice(0,4);
                let month = d.holidaydate.slice(4,6);
                let date = d.holidaydate.slice(6,8);

                d.holidaydate = `${date}/${month}/${year}`;
            });

            this.gridData = this.store.holidays;

            this.loading = true;

            return this.gridData;
        }
    },
    methods: {
        sortChangeHandler: function (e) {
            this.loader = true;
            setTimeout(() => {
                this.loader = false;
                this.sort = e.sort;
            }, 200);
        },
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
            this.editField = "holidaydate";
            e.dataItem[e.field] = e.value;
            const bodyData =`{"mktcode": "${e.dataItem.mktcode}","holidaydate": "${e.dataItem.holidaydate}","description": "${e.dataItem.description}","cantrade": "${e.dataItem.cantrade}"}`
            await useFetch(() => this.url + "holiday/edit", {
                method: 'POST',
                body: JSON.parse(bodyData)
            });
            this.gridData = await useFetch(() => this.url + `holiday?mkt=${this.store.marketCode}&year=${this.store.year}`);
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
        background-color: #272727c9;
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
        background-color: #f5f5f500;
    }

    div.k-grid-content::-webkit-scrollbar
    {
        width: 5px;
        background-color: #f5f5f500;
    }

    div.k-grid-content::-webkit-scrollbar-thumb
    {
        -webkit-box-shadow: inset 0 0 6px rgba(20, 20, 20, 0.719);
        background-color: #202020;
    }

    .gridCustomStyle .k-grid-content {
        overflow: auto;
    }

    .ring
    {
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:150px;
    height:150px;
    background:transparent;
    border:3px solid #ffffff00;
    border-radius:50%;
    text-align:center;
    line-height:150px;
    font-family:sans-serif;
    font-size:20px;
    color:#050303bb;
    letter-spacing:4px;
    text-transform:uppercase;
    text-shadow:0 0 10px #050303bb;
    box-shadow:0 0 20px rgba(248, 91, 91, 0.5);
    }
    .ring:before
    {
    content:'';
    position:absolute;
    top:-3px;
    left:-3px;
    width:100%;
    height:100%;
    border:3px solid transparent;
    border-top:3px solid #050303bb;
    border-right:3px solid #050303bb;
    border-radius:50%;
    animation:animateC 2s linear infinite;
    }
    .ring span
    {
    display:block;
    position:absolute;
    top:calc(50% - 2px);
    left:50%;
    width:50%;
    height:4px;
    background:transparent;
    transform-origin:left;
    animation:animate 2s linear infinite;
    }
    .ring span:before
    {
    content:'';
    position:absolute;
    width:16px;
    height:16px;
    border-radius:50%;
    background:#200000;
    top:-6px;
    right:-8px;
    box-shadow:0 0 20px #050303bb;
    }
    @keyframes animateC
    {
    0%
    {
        transform:rotate(0deg);
    }
    100%
    {
        transform:rotate(360deg);
    }
    }
    @keyframes animate
    {
    0%
    {
        transform:rotate(45deg);
    }
    100%
    {
        transform:rotate(405deg);
    }
    }

</style>
