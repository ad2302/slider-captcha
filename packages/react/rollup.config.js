import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json';
import packageJson from "./package.json";
import image from '@rollup/plugin-image';
import path from 'path';

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    // {
    //   file: packageJson.module,
    //   format: "esm",
    //   sourcemap: true
    // }
  ],
  plugins: [
    json(),
    peerDepsExternal(),
    resolve(),
    typescript({
      "target": 'es2015',
      declaration: true,
      declarationDir: 'typing',
      // "typeRoots": [path.join(__dirname,'types')],
      tsconfig: path.join(__dirname,'tsconfig.json'),
    }),
    commonjs(),
    postcss({
      extract: false,
      modules: false,
      use: ['sass'],
    }),
    image(),
  ]
};
