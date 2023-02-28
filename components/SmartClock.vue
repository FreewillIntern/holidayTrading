<template>
    <div class="w-full h-full">
        <div v-show="!loading" class="w-full h-full bg-[rgba(32,32,32,0.95)] shadow-[_3px_3px_15px_rgba(0,0,0,0.8)] rounded-xl flex justify-center items-center">
            <h1>Loading ...</h1>
        </div>
        <div
            v-show="loading" class="w-full h-full bg-[rgba(32,32,32,0.95)] shadow-[_3px_3px_15px_rgba(0,0,0,0.8)] rounded-xl flex flex-col items-center text-white">
            <div class="flex flex-col justify-center items-center h-[100%]">
                <p>{{ timeThree }} | {{ timeOne }}</p>
                <!-- <p> {{ store.marketCode }} | {{ store.marketName }} </p> -->
            </div>
        </div>
    </div>
</template> 

<script lang="ts">
import moment from "moment"
import { useMainStore } from "../stores/data";
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        const store = useMainStore();
        return { store };
    },
    data() {
        return {
            timeOne: '',
            timeTwo: moment().format('l'),
            timeThree: '',
            timeFour: moment().format('LT'),
            loading: false,
        }

    },
    mounted: function () {
        setInterval(() => {
            this.timeOne = moment().format('LTS')
            this.timeThree = moment().format('D MMMM YYYY')
            this.loading = true;
        }, 0)
    }
})
</script>
