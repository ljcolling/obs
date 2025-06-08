// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'MyObservableWasmModule',
      exports: 'named'
    }
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src'
    }),
    copy({
      targets: [
        { 
          src: 'pkg/*.wasm', 
          dest: 'dist/' 
        },
        {
          src: 'pkg/*.js',
          dest: 'dist/',
          rename: (name, extension) => `wasm-${name}.${extension}`
        }
      ]
    })
  ],
  external: []
};
