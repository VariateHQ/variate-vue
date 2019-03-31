/**
 * Variate Vue v1.0.0
 * (c) 2019 Saasquatch Inc.
 * @license MIT
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Variate = _interopDefault(require('@variate/engine'));

var name = 'Variate Vue';

var styles = {
    brand: "background: rgba(143, 127, 224, 1); color: white; font-weight: 500; border-radius: 3px 0 0 3px; padding: 1px 2px;",
    error: "background: #e17055; color: white; font-weight: 500; border-radius: 3px 0 0 3px; padding: 1px 2px;",
    warning: "background: #fdcb6e; color: white; font-weight: 500; border-radius: 3px 0 0 3px; padding: 1px 2px;",
    type: "background: #424242; color: white; font-weight: 400; padding: 1px 2px; border-radius: 0 3px 3px 0;",
    message: "background: transparent; font-weight: 400;"
};

var version = {
    show: function() {
        console.log(
            ("%c " + name + " %c 1.0.0 "),
            styles.brand,
            styles.type
        );
    },
};

// Components
var LOAD_COMPONENT= "[COMPONENT] %s";
var LOAD_COMPONENT_EXPERIMENTS = "Running experiments:";

function group(message) {
    if ( message === void 0 ) message = '';
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    console.groupCollapsed.apply(
        console, [ ("%c " + name + " %c DEBUG %c " + message),
        styles.brand,
        styles.type,
        styles.message ].concat( params )
    );
}

function install(Vue, options) {
    options.debug && version.show();
    // 3. inject some component options
    Vue.mixin({
        props: {
            variateId: {
                type: String,
                default: function () { return null; }
            }
        },
        computed: {
            variateComponentName: function variateComponentName() {
                return this.variateId || this.$options._componentTag;
            },
            variateMainBucket: function variateMainBucket() {
                return this.$variate.getMainTrafficBucket();
            },
            variateComponent: function variateComponent() {
                if (typeof this.$variate.components[this.variateComponentName] !== 'undefined') {
                    return this.$variate.components[this.variateComponentName];
                }

                return {};
            },
            variateBucket: function variateBucket() {
                return this.variateComponent.bucket;
            },
            variateExperiments: function variateExperiments() {
                return this.variateComponent.experiments;
            },
            variateAttributes: function variateAttributes() {
                return this.variateComponent.attributes || {};
            },
        },
        created: function created() {
            if (typeof this.variateExperiments !== 'undefined') {
                options.debug && group(LOAD_COMPONENT, this.variateComponentName);
                options.debug && console.log(LOAD_COMPONENT_EXPERIMENTS);
                options.debug && console.log(this.variateExperiments);
                options.debug && console.groupEnd();
            }
        },
    });

    Vue.prototype.$variate = new Variate(options);
}

var REQUIRED_OBJECT = "mapAttributes(object) requires an object parameter;";

var this$1 = function Vue (options) {
  if (!(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
};

var mapAttributes = function (attributes) {
    console.log('Mapping attributes');
    var computed = {};

    if (typeof attributes !== 'object') {
        throw new TypeError(REQUIRED_OBJECT);
    }

    normalizeMap(attributes).forEach(function (ref) {
        var key = ref.key;
        var value = ref.value;

        computed[key] = function () {
            return this$1.variateAttributes[key] || value;
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
        ? map.map(function (key) { return ({ key: key, val: key }); })
        : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); });
}

var index = {
    install: install,
    mapAttributes: mapAttributes,
};

module.exports = index;
