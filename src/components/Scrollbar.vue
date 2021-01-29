<template>
    <div class="scrollbar">
        <div class="scrollbar__slider">
            <div class="scrollbar__fulfil-progress"></div>
        </div>
    </div>
</template>

<script>
    import {wheelEvent} from "../helpers/events";

    export default {
        name: "Scrollbar",
        props: {
            indicatorColor: {
                type: String,
                default: 'transparent'
            },
            lineColor: {
                type: String,
                default: 'transparent'
            },
            sliderColor: {
                type: String,
                default: '#000000'
            },
            slowParam: {
                type: Number,
                default: 1
            },
            width: {
                type: Number,
                default: 10
            },
            decay: {
                type: Number,
                default: 10
            }
        },

        mounted() {
            document.body.classList.add('body_ov_hidden');
        }
    }
</script>

<style lang="scss">
    @import "@/assets/scss/blocks/scrollbar";
</style>
