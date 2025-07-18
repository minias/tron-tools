//svelte.config.js
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  compilerOptions: {
    compatibility: {
      componentApi: 5 // ✅ render() 사용 보장
    }
  }  
}
