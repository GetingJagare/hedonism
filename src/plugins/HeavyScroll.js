const defaultOptions = {
    slowParam: 1,
    decay: 10,
    decayTime: 1000,
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
                        isDesktop: null,
                        scrollHeight: 0,
                        mouseWheel: false,
                        touch: false,
                        touchY: 0,
                        prevScrollY: 0,
                        desktopEvents: [
                            {
                                event: wheelEvent(),
                                target: document,
                                handler: function (event) {
                                    this._hsCalcScrollHeight();
                                    this._hsHandleWheelEvent(event);
                                    this.$data._hs.mouseWheel = true;
                                }
                            },
                            {
                                event: 'scroll',
                                target: window,
                                handler: function () {
                                    if (this.$data._hs.mouseWheel) {
                                        return;
                                    }

                                    this.$data._hs.tmpScrollTop = window.scrollY;
                                }
                            }

                        ],
                        touchEvents: [
                            {
                                event: 'touchstart',
                                target: document,
                                handler: function (event) {
                                    this._hsCalcScrollHeight();

                                    this.$data._hs.touch = true;
                                    this.$data._hs.touchY = event.changedTouches[0].pageY;
                                    this.$data._hs.prevScrollY = this.$data._hs.scrollTop;
                                }
                            },
                            {
                                event: 'touchmove',
                                target: document,
                                handler: function (event) {
                                    if (!this.$data._hs.touch) {
                                        return;
                                    }

                                    const scrollDiff = event.changedTouches[0].pageY - this.$data._hs.touchY;

                                    this.$data._hs.tmpScrollTop = this.$data._hs.scrollTop - scrollDiff;
                                    this.$data._hs.scrollDir = Math.sign(scrollDiff);
                                }
                            },
                            {
                                event: 'touchend',
                                target: document,
                                handler: function (event) {
                                    this.$data._hs.touch = false;
                                    this._hsScrollDecay();
                                }
                            }
                        ],
                        attachedHandlers: [],
                        currentEvents: '',
                        ...options
                    }
                }
            },

            created() {
                this.$data._hs.scrollTop = window.scrollY;
            },

            methods: {
                _hsLaunch() {
                    this.$data._hs.isDesktop = window.innerWidth > 1100;

                    let timeout;
                    window.addEventListener('resize', () => {
                        if (timeout) {
                            clearTimeout(timeout);
                        }

                        timeout = setTimeout(() => {
                            this.$data._hs.isDesktop = window.innerWidth > 1100;
                        }, 100);
                    });
                },

                _hsCalcScrollHeight() {
                    this.$data._hs.scrollHeight = document.body.scrollHeight - window.innerHeight;
                },

                _hsDetachEvents() {
                    this.$data._hs.attachedHandlers.forEach((data) => {
                        data.target.removeEventListener(data.event, data.handler);
                    });

                    this.$data._hs.attachedHandlers.splice(0);
                },

                _hsAttachEvents() {
                    this.$data._hs[this.$data._hs.currentEvents].forEach((data) => {
                        const handler = data.handler.bind(this);

                        data.target.addEventListener(data.event, handler);
                        this.$data._hs.attachedHandlers.push({
                            ...data, handler
                        });
                    });
                },

                _hsHandleWheelEvent(event) {
                    this.$data._hs.tmpScrollTop += event.deltaY / this.$data._hs.slowParam;
                    //this._hsScrollDecay();
                },

                _hsScrollDecay(time, diff = 30, step = 0) {

                    const timeStep = this.$data._hs.decayTimeStep;

                    time = time || this.$data._hs.decayTime;

                    if (diff < 0 || time < 0) {
                        this.$data._hs.mouseWheel = false;
                        return;
                    }

                    this.$data._hs.tmpScrollTop += this.$data._hs.scrollDir * diff / this.$data._hs.slowParam;

                    setTimeout(() => {
                        this._hsScrollDecay(time - timeStep, diff - step, ++step);
                    }, timeStep);
                }

            },

            watch: {
                '$data._hs.tmpScrollTop'(newValue, oldValue) {
                    this.$data._hs.scrollTop = newValue < 0 ? 0 :
                        (newValue > this.$data._hs.scrollHeight ? this.$data._hs.scrollHeight : newValue);

                    this.$data._hs.scrollDir = Math.sign(this.$data._hs.scrollTop - oldValue);

                    this.$data._hs.tmpScrollTop = this.$data._hs.scrollTop;

                    window.scrollTo({
                        top: this.$data._hs.scrollTop,
                    });
                },

                '$data._hs.isDesktop'(newValue) {
                    if (this.$data._hs.currentEvents) {
                        this._hsDetachEvents();
                    }
                    this.$data._hs.currentEvents = `${newValue ? 'desktop' : 'touch'}Events`;

                    this._hsAttachEvents();
                }
            }

        })
    }

}
