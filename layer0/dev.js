const { createDevServer } = require('@layer0/core/dev')

module.exports = function () {
  return createDevServer({
    label: '[Astro SSR]',
    command: (port) => `npm run dev -- --port ${port}`,
    ready: [/listening on/i],
  })
}
