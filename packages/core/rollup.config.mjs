import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { readFile } from "fs/promises";
const packageJson = JSON.parse(await readFile("./package.json"));
import path from 'path';
import { babel } from '@rollup/plugin-babel';
import native from 'rollup-plugin-native';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default {
  input: "src/index.ts",
  external:['sharp','nanoid'],
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    json(),
    peerDepsExternal(),
    native({
        // platformName: "${dirname}/precompiled/${nodePlatform}-${nodeArchitecture}/node.napi.node",
        //platformName: "${dirname}/${basename}-${nativePlatform}-${nativeArchitecture}.node",
        }),
    resolve(),
    typescript({
      declaration: true,
      declarationDir: 'typing',
      // "typeRoots": [path.join(__dirname,'types')],
      tsconfig: path.join(__dirname,'tsconfig.json'),
    }),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
  ]
};
