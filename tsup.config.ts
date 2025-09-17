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
    '@y8c68/auth-kit',
    '@y8c68/team-kit',
    '@y8c68/billing-kit',
    'lucide-react',
  ],
  sourcemap: true,
  minify: false,
  splitting: false,
})