<template>
    <span class="shaking-content">
        <slot></slot>
    </span>
</template>

<script>
    export default {
        name: "ShakingContent"
    }
</script>

<style lang="scss">
    @import "@/assets/scss/blocks/shaking-content";
</style>
