/**
 * 
 * @param {keyof SVGElementTagNameMap} str 
 * @returns 
 */
export const svg_element = (str) => document.createElementNS('http://www.w3.org/2000/svg', str)

export const line = (vec0, vec1) => {
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    l.setAttribute('x1', vec0.x)
    l.setAttribute('y1', vec0.y)
    l.setAttribute('x2', vec1.x)
    l.setAttribute('y2', vec1.y)
    return l
}
export const circle = (vec0, r) => {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    c.setAttribute('cx', vec0.x)
    c.setAttribute('cy', vec0.y)
    c.setAttribute('r', r)
    return c
}
export const rect = (vec0, vec1, rot) => {
    const rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    const _vec0 = vec0.sub(vec1.mult(0.5))
    rectangle.setAttribute('transform-origin', `${vec0.x} ${vec0.y}`)
    rectangle.setAttribute('transform', `rotate(${rot * 180})`)
    rectangle.setAttribute('x', _vec0.x)
    rectangle.setAttribute('y', _vec0.y)
    rectangle.setAttribute('width', vec1.x)
    rectangle.setAttribute('height', vec1.y)
    return rectangle
}