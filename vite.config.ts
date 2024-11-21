import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * This root path used for deploy to GH-Pages
 */
const basePath = process.env.NODE_ENV === 'production'
  ? '/stellar-burgers'
  : '/'

export default defineConfig({
  base: basePath,
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: {
      api: path.resolve('src/shared/api/index'),
      consts: path.resolve('src/shared/consts/index'),
      components: path.resolve('src/shared/components/index'),
      entities: path.resolve('src/entities/'),
      features: path.resolve('src/features/'),
      hooks: path.resolve('src/shared/hooks/index'),
      pages: path.resolve('src/pages/index'),
      store: path.resolve('src/store/index'),
      uikit: '@ya.praktikum/react-developer-burger-ui-components',
      utils: path.resolve('src/shared/utils/index'),
    },
  },
})
