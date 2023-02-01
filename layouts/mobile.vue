<template>
    <div class="flex flex-col justify-center items-center w-full h-screen">
        <!--HEADER START-->
        <div class="flex w-[90%] h-[10%]">
            <!--SEARCH START-->
            <div class="w-full m-2 border">
                <slot name="topLeft"></slot>
            </div>
            <!--SEARCH END-->
        </div>
        
        <div class="flex w-[90%] h-[10%] hidden">
            <!--TIME START-->
            <div class="w-full m-2 border">
                <slot name="topRight"></slot>
            </div>
            <!--TIME END-->
        </div>
        <!--HEADER END-->

        <!--BODY START-->
        <div class="flex w-[90%] h-[60%]">
            <!--CALENDAR START-->
            <div class="w-full m-2 border">
                <slot name="bodyLeft"></slot>
            </div>
            <!--CALENDAR END-->
        </div>

        <div class="w-[90%] h-[10%]">
            <!--HOLIDAYS LIST START-->
            <div class="m-2 border">
                <slot name="bodyRight"></slot>
            </div>
            <!--HOLIDAYS LIST END-->
        </div>

        <!--BODY END-->
    </div>
</template>