import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import directives from "./directives";

Object.keys(directives).forEach((dName) => {
    Vue.directive(dName, directives[dName]);
});

new Vue({
    render: h => h(App),
    data: {
        scrolled: false,
        navbarHeight: 70,
        scrollingNavbarHeight: 60,
        scrollThreshold: 70,
        mouseEvent: null,
        backColors: ['3914AF', '00BA3F', '009898', 'D50061', '7009A9', 'FFEC00']
    },
    computed: {
        event() {
            if (!this.mouseEvent) {
                return null;
            }

            return this.mouseEvent.type === 'touchmove' ? this.mouseEvent.targetTouches[0] : this.mouseEvent;
        },
    }
}).$mount('#app');
