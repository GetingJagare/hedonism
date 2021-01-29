<template>
    <div class="contact-form">

        <form class="form" @submit.prevent="sendRequest">

            <div class="form__group">
                <input class="form__input"
                       required
                       type="email"
                       id="email"
                       v-model="email"
                       :class="{'form__input_valid': !!email}"
                />
                <label class="form__label" for="email">E-mail</label>
            </div>

            <div class="form__group">
                <input class="form__input"
                       required
                       type="tel"
                       id="phone"
                       v-model="phone"
                       :class="{'form__input_valid': !!phone}"
                />
                <label class="form__label" for="phone">Телефон</label>
            </div>

            <div class="form__group">
                <button type="submit" class="form__submit-btn">Отправить</button>
            </div>

        </form>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ContactForm",

        data() {
            return {
                email: '',
                phone: '',
                emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            }
        },

        methods: {
            sendRequest() {

            }
        },

        computed: {
            emailValid() {
                return this.emailRegex.test(this.email);
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/scss/blocks/form";
    @import "@/assets/scss/blocks/contact-form";
</style>
