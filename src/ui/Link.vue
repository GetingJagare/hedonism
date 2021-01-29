<template>
    <a @click.prevent="$emit('click')" class="link">
        {{ label }}
    </a>
</template>

<script>
    export default {
        name: "Link",
        props: {
            'label': String,

        }
    }
</script>

<style lang="scss">
    @import "@/assets/scss/blocks/link.scss";
</style>
