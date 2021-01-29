<template>
    <div class="app"
         id="app"
         v-scroll="{threshold: $root.scrollThreshold, root: $root}"
         @mousemove="setMouseEvent($event)"
         @touchmove="setMouseEvent($event)"
    >
        <MouseColor :colors="$root.backColors"/>
        <div class="app__page">
            <header>
                <Navbar @scrollIntoView="scrollToElement" />
            </header>
            <main>
                <Section :full-height="true" name="top">
                    <MouseImages />
                </Section>
                <Section :full-height="true" name="cases">

                </Section>
                <Section :full-height="true" name="contacts">

                </Section>
                <Section :full-height="true" name="lab">

                </Section>
            </main>
        </div>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    import Section from "./ui/Section";
    import MouseColor from "./components/MouseColor";
    import MouseImages from "./components/MouseImages";

    export default {
        name: 'App',
        components: {
            MouseImages,
            MouseColor,
            Navbar,
            Section
        },

        methods: {
            scrollToElement(event, elId) {
                const el = document.getElementById(elId);

                if (el) {
                    el.scrollIntoView({behavior: 'smooth'});
                }
            },

            setMouseEvent(event) {
                this.$root.mouseEvent = event;
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/scss/blocks/app";
</style>
