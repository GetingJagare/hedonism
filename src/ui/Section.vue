<template>
    <section class="section"
             :class="{
             'section_full-height': fullHeight,
             'section_v-align_center': valignCenter,
             }"
             :style="styleObj"
             :id="name"
    >
        <div class="container" v-if="containerWrap">
            <slot></slot>
        </div>
        <slot v-else></slot>
    </section>
</template>

<script>
    export default {
        name: "Section",
        props: {
            title: String,
            fullHeight: false,
            backColor: {
                type: String,
                default: 'transparent'
            },
            containerWrap: {
                type: Boolean,
                default: true
            },
            name: String,
            valignCenter: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            styleObj() {
                return {
                    'background-color': this.backColor,
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/scss/blocks/section";
</style>
