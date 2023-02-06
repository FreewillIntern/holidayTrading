<template>
    <td class="p-4" @click="editorable = !editorable">
        <h1 v-if="!editorable">{{ value }}</h1>
        <input class="border w-[100px]" v-else type="text" @click.stop :value="value" @keyup.enter="handleChange" ref="editValue">
    </td>
</template>

<script>
export default {
    data() {
        return {
            editorable: false
        }
    },
    props:{
        value:{
            type: String,
            require: true
        },
        identify:{
            type: Number,
            require: true
        }
    },
    emits:["onEdit"],
    methods: {
        handleChange(){
            this.$emit("onEdit",  this.$refs.editValue.value, this.identify)
            this.editorable = false
        }
    },
}

</script>