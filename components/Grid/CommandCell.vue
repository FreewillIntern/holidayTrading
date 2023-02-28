<template>
    <td class="k-command-cell">
        <i-button color="danger" link size="sm" @click="removeHandler">Remove</i-button>
    </td>
</template>
<script lang="ts">
import { Button } from '@progress/kendo-vue-buttons';
export default {
    components: {
        'kbutton': Button
    },
    props: {
        field: String,
        dataItem: Object,
        format: String,
        className: String,
        columnIndex: Number,
        columnsCount: Number,
        rowType: String,
        level: Number,
        expanded: Boolean,
        editor: String
    },
    methods: {
        removeHandler: function () {
            this.$emit('preRemove', { dataItem: this.dataItem });
        }
    }
}
</script>