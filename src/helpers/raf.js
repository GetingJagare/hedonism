export default function () {
    return requestAnimationFrame || webkitRequestAnimationFrame || mozRequestAnimationFrame;
}
