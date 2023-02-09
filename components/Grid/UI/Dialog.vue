<template>
    <div class="fixed h-screen w-screen bg-transparent z-10 top-0 left-0">
        <div class="absolute h-screen w-screen bg-white opacity-80 z-10 top-0 left-0"></div>
        <dialog open class="fixed z-10 border-2 rounded-xl top-[43%] bg-white">
            <div class="flex justify-start flex-col p-0 m-0">
               <div>
                    <slot name="default"></slot>
                </div>
                <form method="dialog" class="flex justify-end items-end w-full">
                    <button @click.prevent="$emit('onDelete')" class="mt-4 mx-2 p-[5px] border rounded-md">OK</button>
                    <button @click.prevent="$emit('onCancle')" class="mt-4 mx-2 p-[5px] border rounded-md">CANCLE</button>
                </form> 
            </div>
        </dialog>
    </div>
</template>

<script>
export default{
    emits:['onDelete','onCancle']
}
</script>

<style scoped>
dialog::backdrop {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.1);
}
</style>