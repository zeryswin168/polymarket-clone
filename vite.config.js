import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    Components({ resolvers: [VantResolver()] })
  ],
  // Keep the demo preview port predictable when reviewing a production build.
  preview: { port: 4173, strictPort: true },
  server: { port: 5173, host: true }
})
