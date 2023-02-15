<template>
  <div>
    <Head>
      <Title>Holiday Trading</Title>
      <Meta name="description" content="My app description" />
      <Meta name="keywords" content="holiday, trading, holidaytrading" />
    </Head>
    <NuxtLayout :name="window.width > 900 ? 'custom' : 'mobile'">
      <template #topLeft>
        <!-- TOP LEFT -->
        <Search />
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
        <GridBody />
      </template>
    </NuxtLayout>
  </div>
</template>

<script>
import { useWindowSize } from "@vueuse/core";

export default {
  data() {
    return {
      window: useWindowSize(),
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');

body {
  font-family: 'Prompt', sans-serif;
}
</style>
