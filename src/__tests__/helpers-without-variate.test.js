import Vue from 'vue';
import { mapVariables } from '../index';
import * as errors from '../lang/error';

describe('It ignores Variate helpers on components without Variate loaded', () => {
    it('Using mapVariables onto components without variate has no effect', () => {
        const vm = new Vue({
            computed: {
                ...mapVariables([
                    'backgroundImage'
                ])
            },
            render() {
                return '<div></div>';
            }
        }).$mount();

        expect(() => {
            const variable = vm.backgroundImage;
        }).toThrow(new Error(errors.VARIATE_MISSING));
    });
});
