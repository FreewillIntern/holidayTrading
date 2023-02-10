<template>
    <div class="w-full h-full overflow-auto rounded-lg">
        <table class="w-full" aria-describedby="holidayDate">
            <!--HEADER-->
            <tr class="border h-[50px] bg-slate-50">
                <th class="p-4 w-[180px]">Holiday Date</th>
                <th class="p-4 w-[170px]">Type</th>
                <th class="p-4 w-[170px]">Description</th>
                <th class="p-4 w-[170px]">Option</th>
            </tr>
            <!--BODY-->
            <tr 
                v-for="data in store.holidays" 
                :key="data" 
                class="hoverCustom text-center text-white odd:bg-zinc-800 opacity-[85%] even:bg-neutral-900 h-[80px]  rounded-xl"> 

                <td>{{data.holidaydate.split("-")[2]}}-{{data.holidaydate.split("-")[1]}}-{{data.holidaydate.split("-")[0]}}</td>

                <td>{{data.cantrade}}</td>

                <GridCell :value="data" :identify="data.id" @on-edit="handleEdit"/>

                <td class="cursor-pointer"><el-button type="danger" :icon="Delete" circle @click="PreHandleDelete(data.id)"/></td>
            </tr>

        </table>
        <GridUIDialog v-show="isVisible" @on-delete="handleDelete" @on-cancle="isVisible = false">
            <template #default>
                <h1>Are you need to dalete this event ?</h1>
            </template>
        </GridUIDialog>
    </div>
</template>

<script>
import { useMainStore } from "~~/stores/data";
import {Delete} from '@element-plus/icons-vue'

export default {
    data() {
        return {
            url: useRuntimeConfig().public.apiBase,
            isVisible: false,
            Delete,
            currentId: 0
        }
    },
    setup() {
        const store = ref(useMainStore());
        return { store };
    },
    methods: {
        async handleEdit(description, identify, currentValue){ 
            this.store.holidays.forEach(data =>{ if(data.id === identify){
                data.description = description
            }})
            const bodyData =`{"mktcode": "${currentValue.mktcode}","holidaydate": "${currentValue.holidaydate}","description": "${description}","cantrade": "${currentValue.cantrade}"}`
            await useFetch(() => this.url + "holiday/edit" + identify, {
                method: 'PUT',
                body: JSON.parse(bodyData)
            });
        },
        async handleDelete(){
            this.isVisible = false
            this.store.holidays = this.store.holidays.filter(data => data.id !== this.currentId)
            await useFetch(() =>this.url + "holiday/delete" + this.currentId, {
                method: 'DELETE',
            });
        },
        PreHandleDelete(identify){
            this.isVisible = true
            this.currentId = identify
        }
    }
}

</script>
                            
<style scoped>
.hoverCustom:hover{
    transition: 0.5s;
    opacity: 100%;
}
</style>
