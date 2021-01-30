import {interp} from "../helpers/math";
import raf from "../helpers/raf"

export default {
    'scroll': {
        inserted: (el, binding) => {

            window.addEventListener('scroll', () => {
                binding.value.root.scrolled = window.scrollY > binding.value.threshold;
            });

        }
    },

    'scrollskew': {
        inserted: (el) => {

            let lastScrollY = 0;

            const skewEl = () => {

                lastScrollY = interp(lastScrollY, window.scrollY, 0.1);

                const deg = (lastScrollY - window.scrollY) / window.innerHeight * 10;

                el.style.transform = `skewY(${deg}deg)`;

                raf()(skewEl);

            };

            raf()(skewEl);
        }
    }
}
