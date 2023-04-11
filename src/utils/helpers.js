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
        return false;
    }

    return true;
}

export function formatRelativeTime(date) {
    const formatter = new Intl.RelativeTimeFormat('en', {
        numeric: 'auto'
    });

    const units = [
        { amount: 60, name: 'seconds' },
        { amount: 60, name: 'minutes' },
        { amount: 24, name: 'hours' },
        { amount: 7, name: 'days' },
        { amount: 4.34524, name: 'weeks' },
        { amount: 12, name: 'months' },
        { amount: Number.POSITIVE_INFINITY, name: 'years' }
    ];

    const formatTime = (date) => {
        let duration = (date - new Date()) / 1000;

        for (const unit of units) {
            if(Math.abs(duration) < unit.amount) {
                return formatter.format(Math.round(duration), unit.name);
            }

            duration /= unit.amount
        }
    }

    return formatTime(date)
}
