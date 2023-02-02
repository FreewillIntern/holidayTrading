<template>
    <div class="h-full rounded-lg p-4" :style="{boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'}">
        <grid
            :style="{overflow: 'auto',height: '100%',border: '0'}"
            :data-items="store.holidays"
            :cell-render="'myTemplate'"
            :columns="columns"
            @custom="customHandler">
            <template v-slot:myTemplate="{props, listeners}">
                <td 
                    :style="{border: '0', padding: '0, 10'}" 
                    :class="props.className">
                    <b>{{ getNestedValue(props.field, props.dataItem) }}</b>
                </td>
            </template>
        </grid>
    </div>
    
</template>
<script>
import { Grid } from '@progress/kendo-vue-grid';
import { useMainStore } from "~~/stores/data";

export default {
    setup() {
        const store = useMainStore()
        return { store };
    },
    components: {
        'grid': Grid
    },
    data: function () {
        return {
            columns: [
                { field: 'holidaydate' , title: 'Holiday Date' },
                { field: 'cantrade', title: 'Type' },
                { field: 'description', title: 'Description' }
            ],
        }
        
    },
    methods: {
        customHandler: function(e){
            console.log('customHandler', e);
        },
        getNestedValue: function(fieldName, dataItem) {
            const path = fieldName.split('.');
            let data = dataItem;
            path.forEach((p) => {
                data = data ? data[p] : undefined;
            });

            return data;
        }
    }
};

</script>

<style>
.k-cell-inner, .k-table-th, .k-header, .k-grid-header{
    border: 0;
}
</style>