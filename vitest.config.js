// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // important pour simuler le DOM
    globals: true          // active les mots-clés comme describe, expect, it...
  }
})
