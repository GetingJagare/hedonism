<template>
    <div class="app"
         id="app"
         v-scroll="{threshold: $root.scrollThreshold, root: $root}"
         @mousemove="setMouseEvent($event)"
         @touchmove="setMouseEvent($event)"
    >
        <MouseColor :colors="$root.backColors"/>
        <!--<Scrollbar indicator-color="#17f060"
                   line-color="rgba(0, 0, 0, 0.1)"
                   slider-color="rgba(0, 0, 0, 0.8)"
                   :slow-param="5"
                   :width="20"
                   :decay="10"
        />-->
        <div class="app__page">
            <header>
                <Navbar @scrollIntoView="scrollToElement"/>
            </header>
            <main>
                <Section :full-height="true" name="top">
                    <MouseImages/>
                </Section>
                <Section :full-height="true" name="cases">

                </Section>
                <Section :full-height="true" name="contacts" :valign-center="true">
                    <ContactForm />
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
    import Scrollbar from "./components/Scrollbar";
    import ContactForm from "./components/ContactForm";

    export default {
        name: 'App',
        components: {
            ContactForm,
            Scrollbar,
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
