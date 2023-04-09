export function getCoords(e, element) {
    const bounds = element.getBoundingClientRect();
    const pinSize = 30;

    return {
        x: {
            size: ((e.clientX - Math.round(bounds.left) - (pinSize / 2)) / window.innerWidth) * 100,
            unit: 'vw',
        },
        y: {
            size: ((e.clientY - Math.round(bounds.top) - (pinSize / 2)) / window.innerHeight) * 100,    
            unit: 'vh'
        }
    }
}

export function isPinableElement(target) {
    const targetElementType = target.tagName.toLowerCase();

    const voidElements = ['area', 'base', 'br', 'col', 'hr', 'input', 'svg', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    const replacedElements = ['audio', 'canvas', 'embed', 'iframe', 'img', 'math', 'object', 'picture', 'video'];

    const elementBlacklist = [...voidElements, ...replacedElements];
    
    const isSvgChild = target.closest('svg');

    if(elementBlacklist.includes(targetElementType) || isSvgChild) {
        console.log('img')
        return false;
    }

    return true;
}