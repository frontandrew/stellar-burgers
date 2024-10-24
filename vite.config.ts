import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: {
      assets: path.resolve('src/shared/assets'),
      entities: path.resolve('src/entities/'),
      features: path.resolve('src/features/'),
      pages: path.resolve('src/pages/index'),
      uikit: '@ya.praktikum/react-developer-burger-ui-components',
    },
  }
})
