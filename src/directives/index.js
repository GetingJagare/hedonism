import {interp} from "../helpers/math";
import raf from "../helpers/raf";
import isInViewPort from "../helpers/viewport";

export default {
    'scroll': {
        inserted: (el, binding) => {

            window.addEventListener('scroll', () => {
                binding.value.root.scrolled = window.scrollY > binding.value.threshold;
            });

        }
    },

    'scrollskew': {
        inserted: (el, binding) => {

            const reqAnimFrame = raf();
            let lastScrollY = 0;

            const skewEl = () => {

                if ((binding.value.onlyViewPort && isInViewPort(el)) || !binding.value.onlyViewPort) {
                    lastScrollY = interp(lastScrollY, window.scrollY, 0.1);

                    const deg = (lastScrollY - window.scrollY) / window.innerHeight * 10;

                    if (Math.abs(deg) > 1e-3) { // 0.001
                        el.style.transform = `skewY(${deg}deg)`;
                    }
                }

                reqAnimFrame(skewEl);

            };

            reqAnimFrame(skewEl);
        }
    }
}
