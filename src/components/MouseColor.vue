<template>
    <div class="mouse-color" :style="styleObject"></div>
</template>

<script>
    import {hexToRgb} from "../helpers/math";
    import {findColorRange, betweenLinesAngle} from '../helpers/math';

    export default {
        name: "MouseColor",
        props: {
            colors: {
                type: Array,
                default: []
            },
            rotateDir: {
                type: Number,
                default: 1
            }
        },

        data() {
            return {
                colorsData: [],
                colorAllocation: {},
                rect: null
            }
        },

        beforeMount() {
            if (!this.colors.length) {
                return;
            }

            this.colorsData = this.colors.map((color) => {
                return color.trim();
            });

        },

        mounted() {
            this.setColorsAllocation();
        },

        computed: {
            styleObject() {
                return {
                    'background-color': `rgb(${this.currentColor})`
                }
            },

            currentColor() {
                if (!this.$root.event) {
                    return hexToRgb(this.colorsData[Math.floor(Math.random() * this.colorsData.length)]).join(',');
                }

                if (!this.rect) {
                    this.rect = this.$el.getBoundingClientRect();
                }

                const el = this.$el;
                const mouseXOnBlock = this.$root.event.clientX - this.rect.left;
                const mouseYOnBlock = this.$root.event.clientY - this.rect.top;

                const blockMiddleX = el.offsetWidth / 2;
                const blockMiddleY = el.offsetHeight / 2;

                let angle = betweenLinesAngle(
                    {A: mouseYOnBlock - blockMiddleY, B: blockMiddleX - mouseXOnBlock},
                    {A: -blockMiddleY, B: 0},
                );

                angle = mouseXOnBlock < blockMiddleX ? 360 - angle : angle;

                const colorRange = findColorRange(angle, this.colorAllocation);
                const ratio = Math.abs(angle - colorRange[0].angle) / Math.abs(colorRange[1].angle - colorRange[0].angle);

                const r = colorRange[0].rgb[0] + Math.round((colorRange[1].rgb[0] - colorRange[0].rgb[0]) * ratio);
                const g = colorRange[0].rgb[1] + Math.round((colorRange[1].rgb[1] - colorRange[0].rgb[1]) * ratio);
                const b = colorRange[0].rgb[2] + Math.round((colorRange[1].rgb[2] - colorRange[0].rgb[2]) * ratio);

                return `${r}, ${g}, ${b}`;
            }
        },

        methods: {
            setColorsAllocation() {
                const angle = 360 / this.colors.length;

                if (this.rotateDir < 0) {
                    this.colorsData = this.colorsData.reverse();
                }

                this.colorAllocation =  this.colorsData.map((color, i) => {
                    return {value: color, angle: angle * i};
                });
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/scss/blocks/mouse-color";
</style>
