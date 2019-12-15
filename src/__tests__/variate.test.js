import Vue from 'vue';
import VariateVue from '../index';

const tests = () => {
    it('It can inject variate into components', () => {
        const vm = new Vue({
            variateId: 'App',
            render() {
                return '<div></div>';
            }
        }).$mount();

        expect(vm.$variate).toBeDefined();

        // Test computed properties exist
        const computedProperties = vm.$options.computed;
        expect(computedProperties.variateComponentName).toBeDefined();
        expect(vm.variateComponentName).toBe('App');
        expect(computedProperties.variateComponent).toBeDefined();
        expect(typeof vm.variateComponent).toBe('object');
        expect(computedProperties.variateBucket).toBeDefined();
        expect(typeof vm.variateBucket).toBe('number');
        expect(computedProperties.variateVariables).toBeDefined();
        expect(typeof vm.variateVariables).toBe('object');
    });
    it('It can inject variate into components with custom variateId', () => {
        const vm = new Vue({
            variateId: 'Hero',
            render() {
                return '<div></div>';
            }
        }).$mount();

        expect(vm.$variate).toBeDefined();

        // Test computed properties exist
        const computedProperties = vm.$options.computed;
        expect(computedProperties.variateComponentName).toBeDefined();
        expect(vm.variateComponentName).toBe('Hero');
        expect(computedProperties.variateComponent).toBeDefined();
        expect(typeof vm.variateComponent).toBe('object');
        expect(computedProperties.variateBucket).toBeDefined();
        expect(typeof vm.variateBucket).toBe('number');
        expect(computedProperties.variateVariables).toBeDefined();
        expect(typeof vm.variateVariables).toBe('object');
    });
    it('It can initialize Variate', () => {
        const vm = new Vue({
            render() {
                return '<div></div>';
            }
        }).$mount();

        expect(vm.$variate).toBeDefined();

        vm.$variate.initialize({
            view: {
                path: '/'
            },
            targeting: {
                country: 'Canada',
                state: 'BC',
            }
        });

        expect(vm.$variate.env).toBeDefined();
        expect(vm.$variate.env.targeting).toBeDefined();
        expect(vm.$variate.env.targeting.country).toBeDefined();
        expect(vm.$variate.env.targeting.country).toBe('Canada');
        expect(vm.$variate.env.targeting.state).toBeDefined();
        expect(vm.$variate.env.targeting.state).toBe('BC');
    });
    it('It can get the component information if Variate is initialized', () => {
        const vm = new Vue({
            variateId: 'Hero',
            render() {
                return '<div></div>';
            }
        }).$mount();

        expect(vm.$variate).toBeDefined();

        vm.$variate.initialize({
            view: {
                path: '/'
            },
            targeting: {
                country: 'Canada',
                state: 'BC',
            }
        });

        // Test computed properties exist
        expect(vm.variateComponentName).toBe('Hero');
        expect(vm.$options.computed.variateComponent.call(vm)).toBeDefined();
        expect(vm.$options.computed.variateComponent.call(vm).id).toBeDefined();
        expect(vm.$options.computed.variateComponent.call(vm).variables).toBeDefined();
        expect(vm.$options.computed.variateComponent.call(vm).variables.backgroundImage).toBeDefined();
        expect(vm.$options.computed.variateComponent.call(vm).bucket).toBeDefined();
        expect(vm.$options.computed.variateComponent.call(vm).variationId).toBeDefined();
        expect(vm.$options.computed.variateComponent.call(vm).experimentId).toBeDefined();
        expect(vm.$options.computed.variateComponent.call(vm).siteId).toBeDefined();
    });
};

describe('It can load Variate into a Vue application as a plugin', () => {
    describe('In debug mode', () => {
        Vue.use(VariateVue, {
            debug: true,
            config: require('./mocks/variate.json')
        });
        tests();
    });
    describe('In production mode', () => {
        Vue.use(VariateVue, {
            debug: false,
            config: require('./mocks/variate.json')
        });
        tests();
    });
});
