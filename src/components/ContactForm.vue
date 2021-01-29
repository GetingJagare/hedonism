<template>
    <div class="contact-form">

        <form class="form" @submit.prevent="sendRequest">

            <div class="form__group">
                <input class="form__input"
                       required
                       type="email"
                       id="email"
                       v-model="email"
                       :class="{'form__input_valid': !!email, 'form__input_error': errors.email}"
                />
                <label class="form__label" for="email">E-mail</label>
            </div>

            <div class="form__group">
                <the-mask class="form__input"
                              v-model="phone"
                              mask="+7(###)###-##-##"
                              id="phone"
                              required
                              type="tel"
                              :class="{'form__input_valid': !!phone}"
                />
                <label class="form__label" for="phone">Телефон</label>
            </div>

            <div class="form__group form__group_align_left">
                <input class="form__input form__input_file"
                          @change="attachFile"
                          id="file"
                          type="file"
                />
                <label class="form__label" for="file">Добавить файл</label>
                <span v-if="file && file.length" class="form__input-filename">{{ file[0].name }}</span>
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
                file: '',
                emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                errors: {
                    email: false
                }
            }
        },

        methods: {
            sendRequest() {
                if (!this.emailValid) {
                    this.errors.email = true;
                    return;
                }

                this.errors.email = false;
            },

            attachFile(event) {
                this.file = event.target.files;
                console.log(this.file);
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
