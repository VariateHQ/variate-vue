import * as errors from './lang/errors';

/**
 *
 * @param attributes
 */
export const mapAttributes = (attributes) => {
    console.log('Mapping attributes');
    let computed = {};

    if (typeof attributes !== 'object') {
        throw new TypeError(errors.REQUIRED_OBJECT);
    }

    normalizeMap(attributes).forEach(({ key, value }) => {
        computed[key] = () => {
            return this.variateAttributes[key] || value;
        };
    });

    return computed;
};

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap(map) {
    return Array.isArray(map)
        ? map.map(key => ({ key, val: key }))
        : Object.keys(map).map(key => ({ key, val: map[key] }));
}

export default mapAttributes;
