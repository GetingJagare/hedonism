<template>
    <div class="mouse-images"
         @mousemove="changeImage"
         @touchmove="changeImage"
    >
        <img v-for="(src, i) in images"
             :src="src"
             :style="{'display': i === visibleIndex ? 'block' : 'none'}"
             class="mouse-images__image"
        />
    </div>
</template>

<script>
    export default {
        name: "MouseImages",
        data() {
            return {
                rect: null,
                images: [
                    "https://dummyimage.com/1000x500/000/0011ff",
                    "https://dummyimage.com/1000x500/333/aeff00",
                    "https://dummyimage.com/1000x500/444/2211ff",
                    "https://dummyimage.com/1000x500/666/4411ff",
                    "https://dummyimage.com/1000x500/aaa/6611ff",
                    "https://dummyimage.com/1000x500/ccc/7711ff",
                    "https://dummyimage.com/1000x500/eee/aa11ff",
                    "https://dummyimage.com/1000x500/aa33ff/cc11ff",
                    "https://dummyimage.com/1000x500/cc33ff/ff11ff",
                    "https://dummyimage.com/1000x500/dd33ff/0011aa",
                    "https://dummyimage.com/1000x500/1133ff/0011dd",
                    "https://dummyimage.com/1000x500/4433ff/dd11ff",
                    "https://dummyimage.com/1000x500/7733ff/bb11ff",
                    "https://dummyimage.com/1000x500/bb33ff/3311aa",
                    "https://dummyimage.com/1000x500/dd33ff/bb11aa",
                    "https://dummyimage.com/1000x500/aa55ff/3f11aa",
                    "https://dummyimage.com/1000x500/aa77ff/af11aa",
                    "https://dummyimage.com/1000x500/aa3399/cf11aa",
                    "https://dummyimage.com/1000x500/aaff88/7711aa",
                ],
                indexes: [],
                visibleIndex: -1,
                overlayWidth: 0
            }
        },

        mounted() {
            this.rect = this.$el.getBoundingClientRect();
            this.indexes = [...this.images.keys()].sort(() => Math.random() - 0.5);

            this.init();

            window.addEventListener('resize', () => {
                this.init();
            })
        },

        methods: {
            changeImage() {
                if (!this.$root.event) {
                    return;
                }

                const x = this.$root.event.clientX - this.rect.left;
                let index = Math.floor(x / this.overlayWidth);
                index = index = index > this.images.length - 1 ? this.images.length - 1 : (index < 0 ? 0 : index);

                this.visibleIndex = index;
            },

            init() {
                this.visibleIndex = this.indexes[0];
                this.overlayWidth = this.$el.offsetWidth / this.images.length;
            }
        },
    }
</script>

<style lang="scss">
    @import "@/assets/scss/blocks/mouse-images";
</style>
