import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default [
  {
    // input: 'src/index.ts',
    input: 'index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      external(),
      resolve(),
      // typescript({ tsconfig: './tsconfig.json' }),
      babel({
        "presets": [
          ["@babel/preset-react", {
            "runtime": "automatic"
          }]
        ]
      }),
      commonjs(),
      postcss(),
      terser()
    ],
  },
  // {
  //   input: 'dist/esm/types/index.d.ts',
  //   output: [{ file: 'dist/index.d.ts', format: "esm" }],
  //   external: [/\.css$/],
  //   plugins: [dts()],
  // },
]
