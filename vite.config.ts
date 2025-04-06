import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/common/components'),
      '@queries': resolve(__dirname, 'src/common/queries'),
      '@types': resolve(__dirname, 'src/common/types'),
      '@data': resolve(__dirname, 'src/common/data'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
  base: process.env.NODE_ENV === 'development' ? '/' : '/vlr-guessr',
})
