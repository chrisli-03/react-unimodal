import del from 'rollup-plugin-delete'
// import eslint from '@rollup/plugin-eslint';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import size from 'rollup-plugin-size';
import visualizer from 'rollup-plugin-visualizer';

import pkg from './package.json';

const options = {
  input: 'src/index.js',
  external: ['react'],
  plugins: [
    del({ targets: 'dist/style.js' }),
    // eslint(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    terser({
      compress: true,
      mangle: true,
      output: {
        comments: false,
      },
    }),
    size(),
    visualizer({
      gzipSize: true,
    }),
  ],
};

export default [
  {
    input: './src/style.js',
    output: {
      file: 'dist/style.js',
    },
    plugins: [
      // del({ targets: 'dist/*' }),
      postcss({
        extract: true,
        minimize: true
      }),
    ],
  },
  {
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    ...options,
  },
  {
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    ...options,
  },
];
