import { defineConfig } from 'vite'

export default defineConfig({
  alias: {
    '@': path.resolve(__dirname, './src'),
    ':ui': path.resolve(__dirname, './src/ui'),
    ':app': path.resolve(__dirname, './src/app'),
    ':shimmer': path.resolve(__dirname, './src/shimmer'),
  },
})
