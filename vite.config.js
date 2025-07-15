import vue2 from '@vitejs/plugin-vue2'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue2(),

    AutoImport({
      imports: [
        // 移除Vue原生API，仅从VueUse导入
        'vue-router',
        'vuex',
        {
          '@vueuse/core': [
            'ref',
            'reactive',
            'computed',
            // 添加其他需要的VueUse函数
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
      // 配置处理重复导入的策略
      eslintrc: {
        enabled: true, // 生成ESLint配置
        filepath: './.eslintrc-auto-import.json', // 指定配置文件路径
        globalsPropValue: true,
      },
      // 可选：明确指定优先使用VueUse的实现
      resolvers: [
        (name) => {
          if (name.startsWith('use')) {
            return { name, from: '@vueuse/core' }
          }
        },
      ],
    }),

    Components({
      resolvers: [
        ElementUiResolver(),
      ],
      dts: 'src/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    }),
  ],

  resolve: {
    alias: {
      '@': '/src',
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },

  build: {
    target: 'esnext',
  },

  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
