import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/index.ts',
    'src/hooks/index.ts',
    'src/lib/index.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    '@clerk/clerk-react',
    'lucide-react',
  ],
  sourcemap: true,
  minify: false,
  splitting: false,
})