<template>
    <nav class="navbar" :style="styleObject">
        <div class="container">
            <div class="navbar__content">
                <div class="navbar__logo"></div>
                <ul class="navbar__nav">
                    <li class="navbar__nav-item">
                        <Link label="Главная"
                              class="navbar__nav-link"
                              href="#cases"
                              @click="$emit('scrollIntoView', $event, 'top')"
                              v-hovershake
                        />
                    </li>
                    <li class="navbar__nav-item">
                        <Link label="Кейсы"
                              class="navbar__nav-link"
                              href="#cases"
                              @click="$emit('scrollIntoView', $event, 'cases')"
                              v-hovershake
                        />
                    </li>
                    <li class="navbar__nav-item">
                        <Link label="Контакты"
                              class="navbar__nav-link"
                              href="#contacts"
                              @click="$emit('scrollIntoView', $event, 'contacts')"
                              v-hovershake
                        />
                    </li>
                    <li class="navbar__nav-item">
                        <Link label="Лаборатория"
                              class="navbar__nav-link"
                              href="#lab"
                              @click="$emit('scrollIntoView', $event, 'lab')"
                              v-hovershake
                        />
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import Link from "../ui/Link";

    export default {
        name: "Navbar",
        components: {
            Link
        },
        computed: {
            styleObject() {
                return {
                    'height': `${this.$root.scrolled ? this.$root.scrollingNavbarHeight : this.$root.navbarHeight}px`
                }
            }
        },
        methods: {
            t() {
                console.log('hover shake')
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/scss/blocks/navbar";
</style>
