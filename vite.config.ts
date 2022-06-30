import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 80,
    proxy: {
      "/api": {
        target: "https://international.v1.hitokoto.cn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: 'cancel_axios_request',
      fileName: (format) => `cancel_axios_request.${format}.js`
    },
    rollupOptions: {
      external: ['axios'],
      // output: {
      //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //   globals: {
      //     vue: 'Vue'
      //   }
      // }
    }
  }
})
