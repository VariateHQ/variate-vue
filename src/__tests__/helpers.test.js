import Vue from 'vue';
import VariateVue from '../index';
import * as errors from '../lang/error';

describe('It can load Variate helpers on components', () => {
    Vue.use(VariateVue, {
        config: require('./mocks/variate.json')
    });
    it('It can use mapVariables onto components with array parameter', () => {
        const vm = new Vue({
            variateId: 'Hero',
            computed: {
                ...VariateVue.mapVariables([
                    'backgroundImage'
                ])
            },
            render() {
                return '<div></div>';
            }
        }).$mount();

        vm.$variate.initialize({
            view: {
                path: '/',
            },
            targeting: {
                country: 'Canada',
                state: 'BC'
            }
        });

        expect(vm.$variate).toBeDefined();

        // Test computed properties exist
        expect(vm.$options.computed.backgroundImage).toBeDefined();
        expect(vm.backgroundImage).toBeUndefined();
    });
    it('It can use mapStyles onto components with object parameter', () => {
        const vm = new Vue({
            variateId: 'Hero',
            computed: {
                ...VariateVue.mapStyles('styles', {
                    backgroundImage: 'url(%s)'
                })
            },
            render() {
                return '<div></div>';
            }
        }).$mount();

        expect(vm.$variate).toBeDefined();

        expect(vm.styles).toBeDefined();
    });
    it('It can use mapVariables onto components with defaults', () => {
        const vm = new Vue({
            variateId: 'Hero',
            computed: {
                ...VariateVue.mapVariables({
                    headline: 'Default'
                })
            },
            render() {
                return '<div></div>';
            }
        }).$mount();

        expect(vm.$variate).toBeDefined();

        // Test computed properties exist
        expect(vm.headline).toBeDefined();
        expect(vm.headline).toBe('Default');
    });
    it('It throws an error when using mapVariables with wrong parameter', () => {
        expect(() => {
            const vm = new Vue({
                variateId: 'Hero',
                computed: {
                    ...VariateVue.mapVariables("that's wrong")
                },
                render() {
                    return '<div></div>';
                }
            }).$mount();
        }).toThrow(new Error(errors.MAP_VARIABLES_WRONG_PARAMETER));
    });
    it('It can normalize the namespace when using mapStyles onto components without a namespace provided', () => {
        const vm = new Vue({
            variateId: 'Hero',
            computed: {
                ...VariateVue.mapStyles({
                    backgroundImage: 'url(%s)',
                }),
            },
            render() {
                return '<div></div>';
            }
        }).$mount();

        expect(vm.$variate).toBeDefined();

        expect(vm.styles).toBeDefined();
    });
    it('It cannot use mapStyles onto components with array parameter', () => {
        expect(() => {
            const vm = new Vue({
                variateId: 'Hero',
                computed: {
                    ...VariateVue.mapStyles('styles', [
                        'backgroundImage'
                    ])
                },
                render() {
                    return '<div></div>';
                }
            }).$mount();
        }).toThrow(new Error(errors.MAP_STYLES_WRONG_PARAMETER));
    });
});
