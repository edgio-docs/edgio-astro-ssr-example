import node from '@astrojs/node'
import svelte from '@astrojs/svelte'
import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'server',
  adapter: node(),
  integrations: [svelte()],
})
