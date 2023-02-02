<template>
    <NuxtLayout :name="window.width > 900 ? 'custom' : 'mobile'">
        <template #topLeft>
            <!-- TOP LEFT -->
            <Search />
        </template>
        <template #topRight>
            <!-- TOP RIGHT -->
            <SmartClock></SmartClock>
        </template>
        <template #bodyLeft>
            <!-- BODY LEFT -->
            <KendoCalendar />
        </template>
        <template #bodyRight>
            <!-- BODY RIGHT -->
            <GridBody />
        </template>
    </NuxtLayout>
</template>

<script>
import { useWindowSize } from '@vueuse/core'

export default {
    data(){
        return {
            window: useWindowSize()
        }
       
    }
}
</script>
