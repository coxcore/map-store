import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';

import { namespace, repo } from './scripts/initialize.json';
import { name, version, homepage, license } from './package.json';

const banner = `/*!
 * ${name} v${version} - ${homepage}
 *
 * (c) COXCORE / Park U-yeong
 * ${license} License
 */
`;

const ns = (namespace || repo?.split('/')[0] || 'coxcore')
    .replace('@', '')
    .replace(/-([a-z])/g, (str, char) => char.toUpperCase());

const fileName = (file) => path.resolve(__dirname, 'build', file);

const options = {
    input: 'src/lib/index.ts',
    output: [
        {
            banner,
            file: fileName('index.mjs'),
            format: 'esm',
            sourcemap: true,
            plugins: [terser()],
        },
        {
            banner,
            file: fileName('index.min.js'),
            format: 'umd',
            name: ns,
            exports: 'named',
            extend: true,
            sourcemap: true,
            plugins: [terser()],
        },
    ],
    plugins: [
        del({ targets: 'build' }),
        typescript(),
        resolve({ extensions: ['.js', '.ts'] }),
    ],
};

export default options;
