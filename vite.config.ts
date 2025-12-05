import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), ['FB_']);
  console.log(env)
  return {
    define: {
      'import.meta.env.RELAY_SERVER': JSON.stringify(env.RELAY_SERVER),
      'import.meta.env.RELAY_PORT': JSON.stringify(env.RELAY_PORT),
      'import.meta.env.RELAY_PATH': JSON.stringify(env.RELAY_PATH),
      'import.meta.env.RELAY_SSL': JSON.stringify(env.RELAY_SSL),

      'import.meta.env.FB_API_KEY': JSON.stringify(env.FB_API_KEY),
      'import.meta.env.FB_AUTH_DOMAIN': JSON.stringify(env.FB_AUTH_DOMAIN),
      'import.meta.env.FB_PROJECT_ID': JSON.stringify(env.FB_PROJECT_ID),
      'import.meta.env.FB_STORAGE_BUCKET': JSON.stringify(env.FB_STORAGE_BUCKET),
      'import.meta.env.FB_MESSAGING_SENDER_ID': JSON.stringify(env.FB_MESSAGING_SENDER_ID),
      'import.meta.env.FB_APP_ID': JSON.stringify(env.FB_APP_ID),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
      },
    }
  }
})
