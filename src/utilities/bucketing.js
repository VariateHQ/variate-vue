/**
 * Bucket number generator from 0 to 100
 * @returns {number}
 */
export const generateTrafficBucket = () => {
    return Math.floor((Math.random() * 100));
}
