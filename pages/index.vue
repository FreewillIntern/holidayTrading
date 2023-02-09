<template>
    <NuxtLayout :name="window.width > 900 ? 'custom' : 'mobile'">
        <template #topLeft >
            <!-- TOP LEFT -->
            <Search />
        </template>
        <template #topRight >
            <!-- TOP RIGHT -->
            <SmartClock /> 
        </template>
        <template #bodyLeft class="z-2">
            <!-- BODY LEFT -->
            <KendoCalendar />
        </template>
        <template #bodyRight>
            <!-- BODY RIGHT -->
            <GridMyCustom />
        </template>    
    </NuxtLayout>
</template>

<script>
import { useWindowSize } from '@vueuse/core'

export default {
    data(){
        return {
            window: useWindowSize(),
        }
    }
}
</script>
