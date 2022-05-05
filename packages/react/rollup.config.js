import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json';
import packageJson from "./package.json";
import image from '@rollup/plugin-image';

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
    commonjs(),
    typescript(),
    postcss({
      extract: false,
      modules: false,
      use: ['sass'],
    }),
    image(),
  ]
};
