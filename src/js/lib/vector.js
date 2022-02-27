/**
 * Vector module
 * @module vector
 */


/**
 * A 2D vector object and its operators
 * @typedef {object} vec
 * @property {add} add Vector addition
 * @property {sub} sub
 * @property {mult} mult
 * @property {divide} divide
 * @property {dot} dot
 * @property {vec} v
 * @property {unit} unit
 * @property {number} length
 * @property {rotate} rotate
 * @property {number} x
 * @property {number} y
 */


/**
 * Returns new vector by adding vector with vec0
 * If inplace is true, modify this vector
 * @param {vec} vec0 
 * @param {boolean} [inplace]
 * @returns {vec} Vector object
 */
function add(vec0, inplace = false) {
    if (!inplace) {
        const v = Object.create(vectorOperators)
        v.x = this.x + vec0.x
        v.y = this.y + vec0.y
        return v
    } else {
        this.x += vec0.x
        this.y += vec0.y
        return this
    }
}
/**
 * Returns new vector by subtracting vector with vec0
 * @param {vec} vec0 
 * @param {boolean} [inplace]
 * @returns {vec}
 */
function sub(vec0, inplace = false) {
    if (!inplace) {
        const v = Object.create(vectorOperators)
        v.x = this.x - vec0.x
        v.y = this.y - vec0.y
        return v
    } else {
        this.x -= vec0.x
        this.y -= vec0.y
        return this
    }
}
/**
 * Returns a new vector by multiplying vector by s
 * @param {number | vec} s 
 * @param {boolean} [inplace]
 * @returns {vec} vector object
 */
function mult(s, inplace = false) {
    if (!inplace) {
        const v = Object.create(this)
        // console.log(s?.x ?? s)
        v.x = this.x * (s?.x ?? s)
        v.y = this.y * (s?.y ?? s)
        return v
    } else {
        this.x *= (s?.x ?? s)
        this.y *= (s?.y ?? s)
        return this
    }
}
/**
 * Returns a new vector by dividing vector by d
 * @param {number} d
 * @returns {vec} vector object
 */
function divide(d) {
    const v = Object.create(this)
    v.x = this.x / d
    v.y = this.y / d
    return v
}
/**
 * Returns the dot product of vector and vec0
 * @param {vec} vec0
 * @returns {number} dot product
 */
function dot(vec0) {
    return this.x * vec0.x + this.y * vec0.y
}
/**
 * Returns a new unit vector from this vector
 * @this vec
 * @returns {vec}
 */
function unit() {
    const v = Object.create(vectorOperators)
    v.x = this.x / this.length
    v.y = this.y / this.length
    return v
}

const round = (number, places) => {
    return +(Math.round(number + `e+${places}`) + "e-" + places)
}

/**
 * Returns a new vector from rotating this vector around pivot with angle in cycles 
 * @param {number} a angle in cycles 0:1
 * @returns {vec}
 */
function rotate(a, pivot, precision = 6) {
    const v = Object.create(vectorOperators)
    const _v = {
        x: this.x - pivot.x,
        y: this.y - pivot.y
    }
    v.x = round(_v.x * Math.cos(Math.PI * a) - _v.y * -Math.sin(Math.PI * a), 0) + pivot.x
    v.y = round(_v.x * Math.sin(Math.PI * a) + _v.y * Math.cos(Math.PI * a), 0) + pivot.y
    return v
}

const vectorOperators = {
    add,
    sub,
    mult,
    divide,
    dot,
    unit,
    rotate,
    /**
     * Sets the compoents of vector by vec0
     * @type {vec}
     */
    set v(vec0) {
        this.x = vec0.x
        this.y = vec0.y
    },
    /**
     * Get the length of the vector
     * @type {number}
     */
    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    },
    /**
     * Sets the length of the vector to l
     * @param {number} l length
     */
    set length(l) {
        const unit = this.unit()
        this.x = unit.x * l
        this.y = unit.y * l
    }
}




/*  
    "Static" functions -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
*/

/**
 * Returns a new 2D vector with max value of each component
 * @param {vec} v0 
 * @param {vec} v1 
 * @returns {vec}
 */
vector.max = function (v0, v1) {
    const v = Object.create(vectorOperators)
    v.x = Math.max(v0.x, v1.x)
    v.y = Math.max(v0.y, v1.y)
    return v
}

/**
 * Returns and new vector linear interpolated between vec0 and vec1
 * @param {vec} vec0
 * @param {vec} vec1
 * @param {number} fraction number between 0:1
 * @param {boolean} [inplace] 
 * @returns {vec}
 */
vector.lerp = function (vec0, vec1, fraction, inplace = false) {
    if (!inplace) {
        return vec1.sub(vec0).mult(fraction).add(vec0)
    } else {
        return vec1.sub(vec0, true).mult(fraction, true).add(vec0, true)
    }
}
/**
 * Creates a new vector from angle and length
 * @param {number} angle in cycles, value between 0:1
 * @param {number} length 
 * @returns {vec}
 */
vector.fromAngle = function (angle, length) {
    const v = Object.create(vectorOperators)
    v.x = Math.cos(angle * Math.PI) * length
    v.y = Math.sin(angle * Math.PI) * length
    return v
}
/*
    "Static" functions -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
*/


/**
 * Also, check out {@link vector}
 * @example <caption> Create a vector </caption>
 * vector(32,64) // {x:32,y:64}
 * @param {number} x x component
 * @param {number} y y component  
 * @returns {vec}
 */
export function vector(x, y) {
    const v = Object.create(vectorOperators)
    v.x = x
    v.y = y
    return v
}




