import Testing from 'variate-engine';
import version from './lang/version';
import * as debug from './lang/debug';
import { mapAttributes } from './helpers';

export default {
    install(Vue, options) {
        options.debug && version.show();
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
                testingMainBucket() {
                    return this.$ab.getMainTrafficBucket();
                },
                testingComponent() {
                    if (typeof this.$ab.components[this.testingComponentName] !== 'undefined') {
                        return this.$ab.components[this.testingComponentName];
                    }

                    return {};
                },
                testingBucket() {
                    return this.testingComponent.bucket;
                },
                testingExperiments() {
                    return this.testingComponent.experiments;
                },
                testingAttributes() {
                    return this.testingComponent.attributes || {};
                },
            },
            created() {
                if (typeof this.testingExperiments !== 'undefined') {
                    options.debug && debug.group(debug.LOAD_COMPONENT, this.testingComponentName);
                    options.debug && console.debug(debug.LOAD_COMPONENT_EXPERIMENTS);
                    options.debug && console.debug(this.testingExperiments);
                    options.debug && console.groupEnd();
                }
            },
        });

        Vue.prototype.$ab = new Testing(options);
    },
    mapAttributes
};
