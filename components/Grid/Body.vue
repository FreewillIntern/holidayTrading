<template>
    <grid
        :style="{height: '280px'}"
        :data-items="store.holidays"
        :cell-render="'myTemplate'"
        :columns="columns"
        @custom="customHandler">
        <template v-slot:myTemplate="{props, listeners}">
            <td  :class="props.className"><b>{{ getNestedValue(props.field, props.dataItem) }}</b></td>
        </template>
    </grid>
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