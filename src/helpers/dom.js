export function parentByClassName(elem, className) {
    while (elem.parentNode) {

        if (elem.parentNode.classList && elem.parentNode.classList.contains(className)) {

            return elem.parentNode;
        }

        elem = elem.parentNode;

    }

    return false;
}
