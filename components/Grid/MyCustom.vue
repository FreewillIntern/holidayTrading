<template>
    <div class="w-full h-full overflow-auto">
        <table class="w-full h-full ">
            <thead >
                <tr class="border">
                    <th class="p-4 sticky">Holiday Date</th>
                    <th class="p-4 sticky">Type</th>
                    <th class="p-4 sticky">Description</th>
                    <th class="p-4 sticky">Option</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in store.holidays" :key="data" class="text-center odd:bg-white even:bg-slate-50 hover:bg-slate-200 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-300"> 
                    <td>{{data.holidaydate.split("-")[2]}}-{{data.holidaydate.split("-")[1]}}-{{data.holidaydate.split("-")[0]}}</td>
                    <td>{{data.cantrade}}</td>
                    <GridCell :value="data" :identify="data.id" @on-edit="handleEdit"/>
                    <td class="cursor-pointer" @click="handleDelete(data.id)">x</td>
                </tr>
            </tbody>
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
        async handleEdit(description, identify, oldValue){
            // this.testData.find(data => data.id === identify).description = value;
            const bodyData =`{"mktcode": "${oldValue.mktcode}","holidaydate": "${oldValue.holidaydate}","description": "${description}","cantrade": "${oldValue.cantrade}"}`
            await useFetch(() => "https://10.22.26.103/beam/holiday?id="+identify, {
                method: 'PUT',
                body: JSON.parse(bodyData)
                
            });
        },
        async handleDelete(identify){
            // this.testData = this.testData.filter(data => data.id !== identify)
            await useFetch(() =>"https://10.22.26.103/beam/holiday?id="+identify, {
                method: 'DELETE',
            });
        }
    }
}

</script>
                            
