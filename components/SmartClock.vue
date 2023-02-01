<template>
    <div class="shadow-[inset_0_0_5px_rgba(0,0,0,0.3)] rounded-lg h-[100%]">
        <div class="flex justify-center items-center h-[100%]">
            <h1>{{ timeThree }} | {{ timeOne }}</h1>
        </div>
    </div>
</template> 

<script>
import moment from "moment"

export default {
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


