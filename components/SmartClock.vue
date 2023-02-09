<template>
    <div class="w-full h-full bg-[rgba(32,32,32,0.95)] shadow-[_3px_3px_15px_rgba(0,0,0,0.8)] rounded-xl flex flex-col items-center text-white">
        <div class="flex flex-col justify-center items-center h-[100%]">
            <h1>{{ timeThree }} | {{ timeOne }}</h1>
            <h1> {{ store.marketCode }} | {{ store.marketName }} </h1>
        </div>
    </div>
</template> 

<script>
import moment from "moment"
import { useMainStore } from "~~/stores/data";

export default {
    setup() {
        const store = useMainStore();
        return { store };
    },
    data(){
        return {
            timeOne: moment().format('LTS'),
            timeTwo: moment().format('l'),
            timeThree: moment().format('MMMM Do YY'),
            timeFour: moment().format('LT'), 
        }
        
    },
    mounted: function() {
        setInterval(()=>{
            this.timeOne = moment().format('LTS')
            this.timeThree = moment().format('MMMM Do YY')
        },1000)
    }
}
</script>


