import eslint from '@rollup/plugin-eslint';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import size from 'rollup-plugin-size';
import visualizer from 'rollup-plugin-visualizer';

import pkg from './package.json';

const options = {
  input: 'src/index.js',
  external: ['react'],
  plugins: [
    eslint({ fix: true }),
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
