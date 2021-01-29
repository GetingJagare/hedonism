const defaultOptions = {
    slowParam: 1,
    decay: 10,
    decayTime: 500,
    decayTimeStep: 100
};

import {wheelEvent} from "../helpers/events";

export default {
    options: {},

    install(Vue, options) {
        this.options = {...defaultOptions, ...options};

        Vue.mixin({

            data() {
                return {
                    _hs: {
                        scrollTop: 0,
                        tmpScrollTop: 0,
                        scrollDir: 1,
                        isDesktop: true,
                        scrollHeight: 0,
                        mouseWheel: false,
                        ...options
                    }
                }
            },

            created() {
                this.$data._hs.isDesktop = window.innerWidth > 1100;
                this.$data._hs.scrollTop = window.scrollY;

                this._hsLaunch();
            },

            computed: {
                _hsEvent() {
                    return wheelEvent();
                }
            },

            methods: {
                _hsLaunch() {
                    this._hsAttachEvents();
                },

                _hsCalcScrollHeight() {
                    this.$data._hs.scrollHeight = document.body.scrollHeight - window.innerHeight;
                },

                _hsAttachEvents() {
                    document.addEventListener(this._hsEvent, (event) => {
                        this._hsCalcScrollHeight();
                        this._hsHandleWheelEvent(event);
                        this.$data._hs.mouseWheel = true;
                    });

                    window.addEventListener('scroll', () => {
                        if (this.$data._hs.mouseWheel) {
                            return;
                        }

                        this.$data._hs.scrollTop = window.scrollY;
                        this.$data._hs.tmpScrollTop = window.scrollY;
                    });
                },

                _hsHandleWheelEvent(event) {
                    this.$data._hs.tmpScrollTop += event.deltaY / this.$data._hs.slowParam;
                    this._hsScrollDecay();
                },

                _hsScrollDecay(time, diff = 30, step = 0) {

                    const timeStep = this.$data._hs.decayTimeStep;

                    time = time || this.$data._hs.decayTime;

                    if (diff < 0 || time < 0) {
                        this.$data._hs.mouseWheel = false;
                        return;
                    }

                    this.$data._hs.scrollTop += this.$data._hs.scrollDir * diff / this.$data._hs.slowParam;

                    if (time > 0) {
                        setTimeout(() => {
                            this._hsScrollDecay(time - timeStep, diff - step, ++step);
                        }, timeStep);
                    }
                }

            },

            watch: {
                '$data._hs.tmpScrollTop'(newValue, oldValue) {
                    if (this.$data._hs.tmpScrollTop === oldValue) {
                        return;
                    }

                    this.$data._hs.scrollTop = newValue < 0 ? 0 :
                        (newValue > this.$data._hs.scrollHeight ? this.$data._hs.scrollHeight : newValue);
                    this.$data._hs.scrollDir = Math.sign(this.$data._hs.scrollTop - oldValue);
                    this.$data._hs.tmpScrollTop = this.$data._hs.scrollTop;

                    window.scrollTo({
                        top: this.$data._hs.scrollTop,
                    });
                }
            }

        })
    }

}