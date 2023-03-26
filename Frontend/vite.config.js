import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//Fix JWT dot url error
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
})
