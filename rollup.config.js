import Vue from 'vue';
import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';
const replace = require('rollup-plugin-replace');
const version = process.env.VERSION || require('./package.json').version;
const banner =
`/**
 * Variate Vue v${version}
 * (c) ${new Date().getFullYear()} Saasquatch Inc.
 * @license MIT
 */`;

export default [{
    input: 'src/index.js',
    output: [
        {
            banner,
            input: 'src/index.js',
            file: 'dist/variate-vue.js',
            format: 'umd',
            name: 'Variate-Vue',
            env: 'development',
            globals: {
                '@variate/engine': 'Variate'
            }
        },
        {
            input: 'src/index.js',
            file: 'dist/variate-vue.min.js',
            format: 'umd',
            name: 'Variate-Vue',
            env: 'production',
            plugins: [
                uglify(),
            ],
            globals: {
                '@variate/engine': 'Variate'
            }
        },
        {
            banner,
            input: 'src/index.js',
            file: 'dist/variate-vue.common.js',
            format: 'cjs'
        },
        {
            banner,
            input: 'src/index.esm.js',
            file: 'dist/variate-vue.esm.js',
            format: 'es'
        }
    ],
    context: Vue,
    external: [ '@variate/engine' ],
    plugins: [
        buble(),
        replace({
            __VERSION__: version
        }),
    ]
}];
