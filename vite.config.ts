// vite.config.ts
//import visualizer from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'; // 👈 필요
import path from 'path';

export default defineConfig({
  root: 'src/webview',
  base: './',
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, './src/lib'), // ✅ 동일하게 매핑
    }
  },  
  plugins: [
    //visualizer({ open: true }),  // 브라우저에 번들 시각화 결과 자동 오픈
    svelte({
      preprocess: vitePreprocess(), // 👈 Svelte preprocess 적용
      compilerOptions: {
        compatibility: {
          componentApi: 4 // ✅ Svelte 5에서 .render() 사용 가능하게 함
        }
      }
    })
  ],
  build: {
    outDir: path.resolve(__dirname, 'public/build'), // 번들 위치
    chunkSizeWarningLimit: 1000, // 1MB로 상향
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: 'iife', // ✅ WebView에서 사용 가능한 형식 (즉시 실행)
        entryFileNames: `bundle.js` // 결과 JS 이름
      }
    }
  }
});
