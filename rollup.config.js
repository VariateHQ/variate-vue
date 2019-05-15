import Vue from 'vue';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
const version = process.env.VERSION || require('./package.json').version;
const banner =
`/**
 * Variate Vue v${version}
 * (c) ${new Date().getFullYear()} Saasquatch Inc.
 * @license MIT
 */`;

export default [{
    input:  'src/index.js',
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
            },
            exports: 'named',
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
            },
            exports: 'named',
        },
        {
            banner,
            input: 'src/index.js',
            file: 'dist/variate-vue.common.js',
            format: 'cjs',
            exports: 'named',
        },
        {
            banner,
            input: 'src/index.js',
            file: 'dist/variate-vue.esm.js',
            format: 'es',
            exports: 'named',
        }
    ],
    context: Vue,
    external: [ '@variate/engine' ],
    plugins: [
        resolve(),
        commonjs(
            {
                namedExports: {
                    'src/index.js': ['mapAttributes']
                }
            },
        ),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        }),
        replace({
            __VERSION__: version
        }),
    ]
}];
