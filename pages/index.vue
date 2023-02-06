<template>
    <NuxtLayout :name="window.width > 900 ? 'custom' : 'mobile'">
        <template #topLeft>
            <!-- TOP LEFT -->
            <!-- <component :is="window.width > 550? resovePc : resoveMb" /> -->
            <SearchResponPc v-if="window.width > 550" />
            <SearchResponMb v-else />
        </template>
        <template #topRight>
            <!-- TOP RIGHT -->
            <SmartClock /> 
        </template>
        <template #bodyLeft>
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
