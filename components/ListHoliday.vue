<template>
    <ul class="shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] bg-slate-50 rounded-lg flex flex-col items-center ">
      <li v-for="item in items" :key="item.date.toISOString()" class="grid grid-cols-4 grid-devide-4 w-[fit-content] bg-transparent p-4">
        <div class="text-ellipsis overflow-hidden">{{item.name}} </div>
        <div class="text-ellipsis overflow-hidden">{{item.date.getDate()+"-"+item.date.getMonth()+"-"+item.date.getFullYear()}} </div>
        <div class="text-ellipsis overflow-hidden">{{item.type}}</div>
      </li>
    </ul>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
        {date: new Date() ,name: "SomeHoliday", type: "N" },
      ]
    }
  },
}
</script>

<style>
ul {
  counter-reset: index;  
  padding: 0;
  max-width: 100%;
  height: 78vh;
  overflow:hidden; 
  overflow-y:auto
}

li {
  counter-increment: index; 
  display: flex;
  align-items: center;
  padding: 12px 0;
  box-sizing: border-box;
}

li::before {
  content: counters(index, ".", decimal-leading-zero);
  font-size: 1.5rem;
  text-align: right;
  font-weight: bold;
  /* min-width: 50px; */
  padding-right: 12px;
  font-variant-numeric: tabular-nums;
  align-self: flex-start;
  background-image: linear-gradient(to bottom, aquamarine, orangered);
  background-attachment: fixed;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

li + li {
  border-top: 1px solid rgba(255,255,255,0.2);
}

ul::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

ul::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

ul::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}
</style>