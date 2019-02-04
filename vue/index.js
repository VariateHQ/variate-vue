import Testing from '../src';
import * as warnings from '../src/warnings';
import * as debug from '../src/debug';

export default {
    install(Vue, options) {
        // 3. inject some component options
        Vue.mixin({
            props: {
                testingId: {
                    type: String,
                    default: () => null
                }
            },
            computed: {
                testingComponentName() {
                    return this.testingId || this.$options._componentTag;
                },
                bucket() {
                    return this.$ab.getTrafficBucket(this.testingComponentName);
                },
                variation() {
                    if (this.testingComponentName === 'HeroPrimaryCTA') return 2;
                    else if (this.testingComponentName === 'HeroSecondaryCTA') return 1;
                    return 0; // default = null
                },
                attributes() {
                    return this.$_testing_attributes(this.testingComponentName);
                },
            },
            created() {
                if (typeof this.testingComponentName !== 'undefined') {
                    options.debug && console.debug(debug.LOAD_COMPONENT_VARIATION, this.testingComponentName, this.variation);
                    options.debug && console.debug(debug.LOAD_COMPONENT_BUCKET, this.testingComponentName, this.bucket);
                }
            },
            methods: {
                $_testing_attributes(componentName) {
                    if (typeof componentName === 'undefined') {
                        throw new ReferenceError(warnings.COMPONENT_NOT_DEFINED);
                    }

                    if (this.variation !== null) {
                        let variations = this.$ab.config.components[componentName].variations;

                        return variations[this.variation].attributes;
                    }

                    return {};
                },
            }
        });

        Vue.prototype.$ab = new Testing(options);
    }
};
