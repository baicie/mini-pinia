import { defineConfig } from 'tsup'
import pkg from './package.json'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  sourcemap: true,
  clean: true,
  format: ['cjs', 'esm'],
  splitting: true,
  target: 'es2019',
  external: [...Object.keys(pkg.dependencies || {})],
  define: {
    __DEV__: 'true',
  },
})
