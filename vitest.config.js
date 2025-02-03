import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist'],
    testTimeout: 10000000,
  },
});
