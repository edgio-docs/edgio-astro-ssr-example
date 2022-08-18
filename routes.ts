import { Router } from '@layer0/core/router'

const ONE_DAY_CACHE = ({ cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 24 * 60 * 60,
    },
  })
}

export default new Router()
  .match('/', ONE_DAY_CACHE)
  .match('/assets/:path*', ONE_DAY_CACHE)
  .match('/images/:path*', ONE_DAY_CACHE)
  .fallback(({ renderWithApp }) => {
    renderWithApp()
  })
