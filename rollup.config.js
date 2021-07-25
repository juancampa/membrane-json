import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'main.js',
  output: {
    name: 'index.js',
    format: 'es'
  },
  plugins: [commonjs(), nodeResolve()]
};
