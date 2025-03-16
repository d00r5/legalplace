/**
 * Clamps a given value between a specified minimum and maximum range.
 *
 * @param {number} value - The value to be clamped.
 * @param {number} min - The minimum boundary.
 * @param {number} max - The maximum boundary.
 * @returns {number} - The clamped value, constrained to be within the min and max boundaries.
 */

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}