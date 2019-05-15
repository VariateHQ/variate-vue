/**
 * Variate Vue v1.0.0
 * (c) 2019 Saasquatch Inc.
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
  show: function show() {
    console.log("%c ".concat(name, " %c 1.0.0 "), styles.brand, styles.type);
  }
};

var LOAD_COMPONENT = "[COMPONENT] %s";
var LOAD_COMPONENT_EXPERIMENTS = "Running experiments:"; // Utilities
function group() {
  var _console2;

  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    params[_key2 - 1] = arguments[_key2];
  }

  (_console2 = console).groupCollapsed.apply(_console2, ["%c ".concat(name, " %c DEBUG %c ").concat(message), styles.brand, styles.type, styles.message].concat(params));
}

function install(Vue, options) {
  options.debug && version.show(); // 3. inject some component options

  Vue.mixin({
    props: {
      variateId: {
        type: String,
        default: function _default() {
          return null;
        }
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
      }
    },
    created: function created() {
      if (typeof this.variateExperiments !== 'undefined') {
        options.debug && group(LOAD_COMPONENT, this.variateComponentName);
        options.debug && console.log(LOAD_COMPONENT_EXPERIMENTS);
        options.debug && console.log(this.variateExperiments);
        options.debug && console.groupEnd();
      }
    }
  });
  Vue.prototype.$variate = new Variate(options);
}

var mapStyles = normalizeNamespace(function (namespace, map) {
  var styles = namespace || 'styles';
  var response = {};

  if (Array.isArray(map)) {
    response[styles] = normalizeMap(map).map(function (_ref) {
      var key = _ref.key,
          val = _ref.val;
      var property = key.split(/(?=[A-Z])/).map(function (value) {
        return value.toLowerCase();
      }).join('-');
      return "".concat(property, ": ").concat(val);
    });
    return response;
  }

  response[styles] = function () {
    var _this = this;

    return normalizeMap(map).map(function (_ref2) {
      var key = _ref2.key,
          val = _ref2.val;
      var property = key.split(/(?=[A-Z])/).map(function (value) {
        return value.toLowerCase();
      }).join('-');
      return "".concat(property, ": ").concat(val.replace(/%s/g, function () {
        return _this[key] || key;
      }));
    }).join('; ');
  };

  return response;
});
/**
 *
 * @param attributes
 */

var mapAttributes = function mapAttributes(attributes) {
  var computed = {};
  normalizeMap(attributes).forEach(function (_ref3) {
    var key = _ref3.key,
        val = _ref3.val;

    computed[key] = function () {
      if (!this.variateAttributes) {
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

function normalizeNamespace(fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    }

    return fn(namespace, map);
  };
}
/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */


function normalizeMap(map) {
  return Array.isArray(map) ? map.map(function (key) {
    return {
      key: key,
      val: key
    };
  }) : Object.keys(map).map(function (key) {
    return {
      key: key,
      val: map[key]
    };
  });
}

var index = {
  install: install,
  mapAttributes: mapAttributes,
  mapStyles: mapStyles
};

exports.default = index;
exports.mapAttributes = mapAttributes;
exports.mapStyles = mapStyles;