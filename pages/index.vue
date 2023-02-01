<template>
    <NuxtLayout name="custom">
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
        </template>
        <template #bodyRight>
            <!-- BODY RIGHT -->
            <div  class="overflow-auto">
                <ListHoliday />
            </div>
        </template>
    </NuxtLayout>
</template>