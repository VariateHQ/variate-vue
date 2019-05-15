export const mapStyles = normalizeNamespace((namespace, map) => {
    let styles = namespace || 'styles';
    let response = {};

    if(Array.isArray(map)) {
        response[styles] = normalizeMap(map).map(({ key, val }) => {
            const property = key.split(/(?=[A-Z])/).map((value) => value.toLowerCase()).join('-');
            return `${property}: ${val}`;
        });

        return response;
    }

    response[styles] =  function() {
        return normalizeMap(map).map(({ key, val }) => {
            const property = key.split(/(?=[A-Z])/).map((value) => value.toLowerCase()).join('-');
            return `${property}: ${val.replace(/%s/g, () => this[key] || key )}`;
        }).join('; ');
    };

    return response;
});

/**
 *
 * @param attributes
 */
export const mapAttributes = (attributes) => {
    let computed = {};

    normalizeMap(attributes).forEach(({ key, val }) => {
        computed[key] = function() {
            if(!this.variateAttributes) {
                return null;
            }

            return this.variateAttributes[key] || this.variateAttributes[val];
        };
    });

    return computed;
};

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
    return (namespace, map) => {
        if (typeof namespace !== 'string') {
            map = namespace
            namespace = ''
        }

        return fn(namespace, map)
    }
}

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
