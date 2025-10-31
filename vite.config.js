import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: { output: { manualChunks: undefined } },
    assetsInlineLimit: 0 // не встраиваем тяжёлые ассеты в base64
  }
})
