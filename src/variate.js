import Variate from '@variate/engine';
import version from './lang/version';
import * as debug from './lang/debug';

export function install(Vue, options) {
    options.debug && version.show();
    // 3. inject some component options
    Vue.mixin({
        props: {
            variateId: {
                type: String,
                default: () => null
            }
        },
        computed: {
            variateComponentName() {
                return this.variateId || this.$options._componentTag;
            },
            variateMainBucket() {
                return this.$variate.getMainTrafficBucket();
            },
            variateComponent() {
                if (typeof this.$variate.components[this.variateComponentName] !== 'undefined') {
                    return this.$variate.components[this.variateComponentName];
                }

                return {};
            },
            variateBucket() {
                return this.variateComponent.bucket;
            },
            variateExperiments() {
                return this.variateComponent.experiments;
            },
            variateAttributes() {
                return this.variateComponent.attributes || {};
            },
        },
        created() {
            if (typeof this.variateExperiments !== 'undefined') {
                options.debug && debug.group(debug.LOAD_COMPONENT, this.variateComponentName);
                options.debug && console.log(debug.LOAD_COMPONENT_EXPERIMENTS);
                options.debug && console.log(this.variateExperiments);
                options.debug && console.groupEnd();
            }
        },
    });

    Vue.prototype.$variate = new Variate(options);
}
