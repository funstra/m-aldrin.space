export const random = (min, max, floor) => {
    const val = Math.random() * (max - min) + min
    return floor ? Math.floor(val) : val
}