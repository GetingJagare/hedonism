<template>
    <nav class="navbar" :style="styleObject">
        <div class="container">
            <div class="navbar__content">
                <div class="navbar__logo"></div>
                <ul class="navbar__nav">
                    <li class="navbar__nav-item">
                        <ShakingContent>
                            <Link label="Главная"
                                  class="navbar__nav-link"
                                  href="#cases"
                                  @click="$emit('scrollIntoView', $event, 'top')"
                            />
                        </ShakingContent>
                    </li>
                    <li class="navbar__nav-item">
                        <ShakingContent>
                            <Link label="Кейсы"
                                  class="navbar__nav-link"
                                  href="#cases"
                                  @click="$emit('scrollIntoView', $event, 'cases')"
                            />
                        </ShakingContent>
                    </li>
                    <li class="navbar__nav-item">
                        <ShakingContent>
                            <Link label="Контакты"
                                  class="navbar__nav-link"
                                  href="#contacts"
                                  @click="$emit('scrollIntoView', $event, 'contacts')"
                            />
                        </ShakingContent>
                    </li>
                    <li class="navbar__nav-item">
                        <ShakingContent>
                            <Link label="Лаборатория"
                                  class="navbar__nav-link"
                                  href="#lab"
                                  @click="$emit('scrollIntoView', $event, 'lab')"
                            />
                        </ShakingContent>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import Link from "../ui/Link";
    import ShakingContent from "./ShakingContent";
    export default {
        name: "Navbar",
        components: {ShakingContent, Link},
        computed: {
            styleObject() {
                return {
                    'height': `${this.$root.scrolled ? this.$root.scrollingNavbarHeight : this.$root.navbarHeight}px`
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/scss/blocks/navbar";
</style>
