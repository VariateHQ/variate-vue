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
                testingExperimentId() {
                    return this.testingComponent.experiment_id;
                },
                testingVariationId() {
                    return this.testingComponent.variation_id;
                },
                testingAttributes() {
                    return this.testingComponent.attributes || {};
                },
            },
            created() {
                if (typeof this.testingExperimentId !== 'undefined' && typeof this.testingVariationId !== 'undefined') {
                    options.debug && debug.group(debug.LOAD_COMPONENT, this.testingComponentName);
                    options.debug && console.debug(debug.LOAD_COMPONENT_EXPERIMENT, this.testingExperimentId);
                    options.debug && console.debug(debug.LOAD_COMPONENT_BUCKET, this.testingBucket);
                    options.debug && console.debug(debug.LOAD_COMPONENT_VARIATION, this.testingVariationId);
                    options.debug && console.groupEnd();
                }
            },
        });

        Vue.prototype.$ab = new Testing(options);
    },
    mapAttributes
};
