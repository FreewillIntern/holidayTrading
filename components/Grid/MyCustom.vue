<template>
    <div class="w-full h-full overflow-auto">
        <table class="w-full" aria-describedby="holidayDate">
            <tr class="border h-[50px]">
                <th class="p-4 w-[180px]">Holiday Date</th>
                <th class="p-4 w-[170px]">Type</th>
                <th class="p-4 w-[170px]">Description</th>
                <th class="p-4 w-[170px]">Option</th>
            </tr>
            <tr v-for="data in store.holidays" :key="data" class="text-center odd:bg-white even:bg-slate-50 hover:bg-slate-200 active:bg-slate-400 focus:outline-none focus:ring focus:ring-slate-300 h-[80px]"> 
                <td>{{data.holidaydate.split("-")[2]}}-{{data.holidaydate.split("-")[1]}}-{{data.holidaydate.split("-")[0]}}</td>
                <td>{{data.cantrade}}</td>
                <GridCell :value="data" :identify="data.id" @on-edit="handleEdit"/>
                <td class="cursor-pointer" @click="isVisible = true">x</td>
                <GridUIDialog v-show="isVisible" @on-delete="handleDelete(data.id)" @on-cancle="isVisible = false">
                    <template #default>
                        <h1>Are you need to dalete this event ?</h1>
                    </template>
                </GridUIDialog>
            </tr>
        </table>
    </div>
</template>

<script>
import { useMainStore } from "~~/stores/data";

export default {
    data() {
        return {
            url: "https://10.22.26.103/beam/holiday?id=",
            isVisible: false
        }
    },
    setup() {
        const store = useMainStore();
        return { store };
    },
    methods: {
        async handleEdit(description, identify, currentValue){ 
            this.store.holidays.forEach(data =>{ if(data.id === identify){
                data.description = description
            }})
            const bodyData =`{"mktcode": "${currentValue.mktcode}","holidaydate": "${currentValue.holidaydate}","description": "${description}","cantrade": "${currentValue.cantrade}"}`
            await useFetch(() => this.url+identify, {
                method: 'PUT',
                body: JSON.parse(bodyData)
            });
        },
        async handleDelete(identify){
            this.isVisible = false
            this.store.holidays = this.store.holidays.filter(data => data.id !== identify)
            await useFetch(() =>this.url+identify, {
                method: 'DELETE',
            });
        }
    }
}

</script>
                            
