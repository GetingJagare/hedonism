export default {
    'scroll': {
        inserted: (el, binding) => {

            window.addEventListener('scroll', () => {
                binding.value.root.scrolled = window.scrollY > binding.value.threshold;
            });

        }
    }
}
