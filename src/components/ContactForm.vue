<template>
    <div class="container">
        <div class="contact-form">

            <form class="form" @submit.prevent="sendRequest">

                <div class="form__group">
                    <input class="form__input" required type="email" id="email" v-model="email"/>
                    <label class="form__label" for="email">E-mail</label>
                </div>

                <div class="form__group">
                    <input class="form__input" required type="text" id="phone" v-model="phone"/>
                    <label class="form__label" for="phone">Телефон</label>
                </div>

                <div class="form__group">
                    <button type="submit" class="form__submit-btn">Отправить</button>
                </div>

            </form>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ContactForm",

        data() {
            return {
                email: '',
                phone: ''
            }
        },

        methods: {
            sendRequest() {

            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/scss/blocks/form";
    @import "@/assets/scss/blocks/contact-form";
</style>
