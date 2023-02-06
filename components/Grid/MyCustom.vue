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
                <tr v-for="data in testData" :key="data" class="text-center odd:bg-white even:bg-slate-50 hover:bg-slate-200 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-300"> 
                    <td>{{data.holidaydate}}</td>
                    <td>{{data.cantrade}}</td>
                    <GridCell :value="data.description" :identify="data.id" @on-edit="handleEdit"/>
                    <td class="cursor-pointer" @click="handleDelete(data.id)">x</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            testData: [
                {"id": "1", "holidaydate": '2022/05/03', 'cantrade': 'N', "description" : "New Year"},
                {"id": "2", "holidaydate": '2022/07/03', 'cantrade': 'N', "description" : "New Year"},
                {"id": "3", "holidaydate": '2022/06/03', 'cantrade': 'N', "description" : "New Year"},
                {"id": "4", "holidaydate": '2022/04/03', 'cantrade': 'N', "description" : "New Year"},
                {"id": "5", "holidaydate": '2022/03/03', 'cantrade': 'N', "description" : "New Year"},
                {"id": "6", "holidaydate": '2022/05/07', 'cantrade': 'N', "description" : "New Year"},
                {"id": "7", "holidaydate": '2022/05/08', 'cantrade': 'N', "description" : "New Year"},
                {"id": "8", "holidaydate": '2022/05/09', 'cantrade': 'N', "description" : "New Year"},
                {"id": "9", "holidaydate": '2022/05/10', 'cantrade': 'N', "description" : "New Year"},
                {"id": "10", "holidaydate": '2022/12/03', 'cantrade': 'N', "description" : "New Year"},
                {"id": "11", "holidaydate": '2022/11/03', 'cantrade': 'N', "description" : "New Year"},
                {"id": "12", "holidaydate": '2022/02/03', 'cantrade': 'N', "description" : "New Year"},
                {"id": "13", "holidaydate": '2022/04/03', 'cantrade': 'N', "description" : "New Year"},
                {"id": "14", "holidaydate": '2022/05/31', 'cantrade': 'N', "description" : "New Year"},
                {"id": "15", "holidaydate": '2022/05/25', 'cantrade': 'N', "description" : "New Year"},
                {"id": "16", "holidaydate": '2022/05/24', 'cantrade': 'N', "description" : "New Year"},
            ],
        }      
    },
    methods: {
        handleEdit(value,identify){
            this.testData.find(data => data.id === identify).description = value;
        },
        handleDelete(identify){
            this.testData = this.testData.filter(data => data.id !== identify)
        }
    },
}

</script>
                            
