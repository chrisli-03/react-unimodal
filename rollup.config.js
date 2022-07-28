import del from 'rollup-plugin-delete'
// import eslint from '@rollup/plugin-eslint';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import size from 'rollup-plugin-size';
import visualizer from 'rollup-plugin-visualizer';

import pkg from './package.json';

export default [
  {
    input: './src/style.ts',
    output: {
      file: 'dist/style.ts',
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
    input: 'src/index.ts',
    external: ['react', 'react-dom'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      // eslint(),
      typescript({ tsconfig: './tsconfig.json' }),
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
  },
  {
    // path to your declaration files root
    input: './dist/esm/dts/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [
      dts(),
      del({
        hook: 'buildEnd',
        targets: ['dist/style.ts', 'dist/cjs/dts', 'dist/esm/dts'],
      }),
    ],
  },
];
