<template>
    <div class="h-full rounded-lg p-4" :style="{boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'}">
        <grid
            :style="{overflow: 'auto',height: '100%',border: '0', backgroundColor: 'transparent'}"
            :data-items="holidays"
            :cell-render="'myTemplate'"
            :columns="columns"
            @custom="customHandler">
            <template v-slot:myTemplate="{props, listeners}">
                <td 
                    :style="{border: '0', padding: '0, 10', backgroundColor: 'transparent'}" 
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
        const store = useMainStore();
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
    },
    computed:{
        holidays(){
            const days = this.store.holidays;
            days.forEach(day => {
                let splitDate = day.holidaydate.split("-")
                day.holidaydate =  `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
            })
            return days;
        }
    }
};

</script>

<style>
.k-grid-content, .k-virtual-content, .k-grid ,.k-table ,.k-grid-header,.k-grid
{
    border: 0;
    background-color: transparent !important;
}
</style>