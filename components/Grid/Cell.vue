<template>
    <td class="p-4" @click="editorable = true">
        <h1 v-if="!editorable">{{ description }}</h1>
        <input class="border-2 rounded-md border-gray-800 w-full" v-else type="text" @click.stop :value="description" @keyup.enter="handleChange" ref="editValue">
    </td>
</template>

<script>
export default {
    data() {
        return {
            description: this.value.description,
            editorable: false
        }
    },
    props:{
        value:{
            type: Object,
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
            this.$emit("onEdit",  this.$refs.editValue.value, this.identify, this.value)
            this.description = this.$refs.editValue.value
            this.editorable = false
        }
    },
}

</script>