import { Router } from '@layer0/core/router'

export default new Router()
  .match('/', ({ cache }) => {
    cache({
        edge: {
           maxAgeSeconds: 24 * 60 * 60
        }
    })
  })
  .fallback(({ renderWithApp }) => {
    renderWithApp()
  })
