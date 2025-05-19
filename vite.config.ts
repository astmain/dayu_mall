import react from "@vitejs/plugin-react-swc"
import autoprefixer from "autoprefixer"
import { resolve } from "path"
import tailwindcss from "tailwindcss"
import AutoImport from "unplugin-auto-import/vite"
import type { ConfigEnv } from "vite"
import { defineConfig, loadEnv } from "vite"
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const currentEnv = loadEnv(mode, process.cwd())
  console.log("Current mode:", command)
  console.log("Current environment configuration:", currentEnv) //loadEnv即加载根目录下.env.[mode]环境配置文件
  return defineConfig({
    plugins: [
      react(),
      AutoImport({
        imports: ["react", "react-router-dom"],
        dts: "./src/auto-imports.d.ts",
        dirs: ["src/store"],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        },
      }),
    ],
    //项目部署的基础路径,
    base: currentEnv.VITE_PUBLIC_PATH,
    mode: mode,
    resolve: {
      //别名
      alias: {
        "@": resolve(__dirname, "./src"),
        "@components": resolve(__dirname, "./src/components"),
        "@store": resolve(__dirname, "./src/store"),
        "@views": resolve(__dirname, "./src/views"),
        "@assets": resolve(__dirname, "./src/assets"),
        "@hooks": resolve(__dirname, "./src/hooks"),
      },
    },
    //服务
    server: {
      open: true,
      //自定义代理---解决跨域
      proxy: {
        "/frontend/html3d": {
          target: "https://yun3d.com/", // 用于html静态文件
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/frontend\/html3d/, '')
        },
        // 选项写法
        "/api2": {
          target: "http://192.168.0.109:8069/dayu3d/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/api": {
          target: "http://192.168.0.111:8999",
          changeOrigin: true,
        },
        "/web": {
          target: "http://192.168.0.111:8099",
          changeOrigin: true,
        },
      },
      port: 4200,
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    //构建
    build: {
      outDir: mode === "docker" ? "dist" : "docs", //输出路径
      //构建后是否生成 source map 文件
      sourcemap: mode != "production",
      rollupOptions: {
        output: {
          manualChunks: {},
        },
      },
      //打包去掉打印信息 保留debugger vite3需要单独安装terser才行
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: false,
      //   },
      // },
    },
  })
}
