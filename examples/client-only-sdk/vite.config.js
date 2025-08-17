import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(/%SIVI_API_KEY_ID%/g, env.SIVI_API_KEY_ID || 'your-api-key-id-here')
        }
      }
    ],
    define: {
      'process.env.SIVI_API_KEY_ID': JSON.stringify(env.SIVI_API_KEY_ID)
    }
  };
});
