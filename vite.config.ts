import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/iux/',
  test: {
    environment: 'node',
    include: ['test/**/*.spec.ts'],
  },
})
