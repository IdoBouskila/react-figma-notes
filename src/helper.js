export function getCoords(e) {
    const bounds = e.target.getBoundingClientRect();
    const pinSize = 30;

    return {
        x: {
            size: ((e.clientX - Math.round(bounds.left) - (pinSize / 2)) / window.innerWidth) * 100,
            unit: 'vw'
        },
        y: {
            size: ((e.clientY - Math.round(bounds.top) - (pinSize / 2)) / window.innerHeight) * 100,    
            unit: 'vh'
        }
    }
}