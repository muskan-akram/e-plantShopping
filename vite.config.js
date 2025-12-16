import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/e-plantShopping/", // <--- UPDATE THIS LINE with your repository name
  plugins: [react()],
})
