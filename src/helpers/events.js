export function wheelEvent() {
    return 'onwheel' in document ? 'wheel' : ('onmousewheel' in document ? 'mousewheel' : 'MozMousePixelScroll');
};
