<template>
    <div class="w-full h-full overflow-auto">
        <table class="w-full h-[50px]">
            <tr class="border">
                <th class="p-4 sticky">Holiday Date</th>
                <th class="p-4 sticky">Type</th>
                <th class="p-4 sticky">Description</th>
                <th class="p-4 sticky">Option</th>
            </tr>
            <tr v-for="data in store.holidays" :key="data" class="text-center odd:bg-white even:bg-slate-50 hover:bg-slate-200 active:bg-slate-400 focus:outline-none focus:ring focus:ring-slate-300 h-[50px]"> 
                <td>{{data.holidaydate.split("-")[2]}}-{{data.holidaydate.split("-")[1]}}-{{data.holidaydate.split("-")[0]}}</td>
                <td>{{data.cantrade}}</td>
                <GridCell :value="data" :identify="data.id" @on-edit="handleEdit"/>
                <td class="cursor-pointer" @click="handleDelete(data.id)">x</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { useMainStore } from "~~/stores/data";

export default {
    setup() {
        const store = useMainStore();
        return { store };
    },
    methods: {
        async handleEdit(description, identify, currentValue){ 
            // this.store.holidays.find(data => data.id === identify).description = description;
            const bodyData =`{"mktcode": "${currentValue.mktcode}","holidaydate": "${currentValue.holidaydate}","description": "${description}","cantrade": "${currentValue.cantrade}"}`
            await useFetch(() => "https://10.22.26.103/beam/holiday?id="+identify, {
                method: 'PUT',
                body: JSON.parse(bodyData)
            });
        },
        async handleDelete(identify){
            this.store.holidays = this.store.holidays.filter(data => data.id !== identify)
            await useFetch(() =>"https://10.22.26.103/beam/holiday?id="+identify, {
                method: 'DELETE',
            });
        }
    }
}

</script>
                            
