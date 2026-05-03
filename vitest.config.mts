import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',

    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['**/*.unit.test.{ts,tsx}'],
        },
      },
      {
        extends: true,
        test: {
          name: 'int',
          include: ['**/*.int.test.{ts,tsx}'],
          environment: 'node',
        },
      },
    ],
  },
})