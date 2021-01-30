<template>
    <div class="app"
         id="app"
         v-scroll="{threshold: $root.scrollThreshold, root: $root}"
         @mousemove="setMouseEvent($event)"
         @touchmove="setMouseEvent($event)"
    >
        <MouseColor :colors="$root.backColors" />

        <div class="app__content">
            <header>
                <Navbar @scrollIntoView="scrollToElement"/>
            </header>
            <main>
                <Section :full-height="true" name="top" :valign-center="true">
                    <MouseImages v-scrollskew />
                </Section>
                <Section :full-height="true" name="cases">

                </Section>
                <Section :full-height="true" name="contacts" :valign-center="true">
                    <ContactForm/>
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
    import ContactForm from "./components/ContactForm";

    export default {
        name: 'App',
        components: {
            ContactForm,
            MouseImages,
            MouseColor,
            Navbar,
            Section
        },

        mounted() {
            document.body.classList.add('body_ov_hidden');

            this._hsLaunch();
        },

        methods: {
            scrollToElement(event, elId) {
                const el = document.getElementById(elId);

                if (el) {
                    window.scrollTo({
                        behavior: 'smooth',
                        top: el.getBoundingClientRect().top + window.scrollY
                    })
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
