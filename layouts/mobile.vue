<template>
    <div class="flex flex-col justify-center items-center w-full h-screen bg-[rgba(60,60,60,1)]">
        <!--HEADER START-->
        <div class="flex w-[90%] h-[10%]">
            <!--SEARCH START-->
            <div class="w-full m-2">
                <slot name="topLeft"></slot>
            </div>
            <!--SEARCH END-->
        </div>
        
        <div class="flex w-[90%] h-[10%] hidden">
            <!--TIME START-->
            <div class="w-full m-2">
                <slot name="topRight"></slot>
            </div>
            <!--TIME END-->
        </div>
        <!--HEADER END-->

        <!--BODY START-->
        <div class="flex w-[90%] h-[50%]">
            <!--CALENDAR START-->
            <div class="w-full m-2">
                <slot name="bodyLeft"></slot>
            </div>
            <!--CALENDAR END-->
        </div>

        <div class="w-[90%] h-[35%]">
            <!--HOLIDAYS LIST START-->
            <div class="h-full m-2">
                <slot name="bodyRight"></slot>
            </div>
            <!--HOLIDAYS LIST END-->
        </div>

        <!--BODY END-->
    </div>
</template>