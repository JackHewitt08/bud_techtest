import type { UserConfig } from 'vite'
import react from "@vitejs/plugin-react";
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "happy-dom",
        setupFiles: ['./vitest-setup.ts'],
        coverage: {
            exclude: ["public/mockServiceWorker.js", "vite.config.ts", "src/main.tsx", "dist/**"]
        }
    }
})
