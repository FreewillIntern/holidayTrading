<template>
   <div class="flex flex-col justify-center items-center w-full h-screen bg-cover bg-[rgba(60,60,60,1)]">
    <div class="w-screen h-screen flex flex-col justify-center items-center">
        <!--HEADER START-->
        <div class="flex w-[90%] h-[10%]">
            <!--SEARCH START-->
            <div class="w-[70%] m-2">
                <slot name="topLeft"></slot>
            </div>
            <!--SEARCH END-->

            <!--TIME START-->
            <div class="w-[30%] m-2">
                <slot name="topRight"></slot>
            </div>
            <!--TIME END-->
        </div>
        <!--HEADER END-->

        <!--BODY START-->
        <div class="flex w-[90%] h-[80%]">
            <!--CALENDAR START-->
            <div class="w-[70%] m-2">
                <slot name="bodyLeft"></slot>
            </div>
            <!--CALENDAR END-->
            
            <!--HOLIDAYS LIST START-->
            <div class="w-[30%] m-2">
                <slot name="bodyRight"></slot>
            </div>
            <!--HOLIDAYS LIST END-->
        </div>
        <!--BODY END-->
    </div>
        
  </div>
</template>
