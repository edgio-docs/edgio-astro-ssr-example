import { Router } from '@layer0/core/router'
import { isProductionBuild } from '@layer0/core/environment'
import { ONE_DAY_CACHE_HANDLER, API_CACHE_HANDLER, IMAGE_CACHE_HANDLER } from './cache'

const router = new Router()

// Regex to catch multiple hostnames
// Any deployment will have a L0 permalink
// Don't allow Google bot to crawl it, read more on:
// https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
router.noIndexPermalink()

// Serve the old Layer0 predefined routes by the latest prefix
router.match('/__xdn__/:path*', ({ redirect }) => {
  redirect('/__layer0__/:path*', 301)
})

// Service Worker
router.match('/service-worker.js', ({ serveStatic }) => {
  serveStatic('dist/service-worker.js')
})

// API (Any backend) caching
router.match('/l0-api/:path*', API_CACHE_HANDLER)

// Image caching
router.match('/l0-opt', IMAGE_CACHE_HANDLER)

// Only compiled with 0 build / 0 deploy
if (isProductionBuild()) {
  // Create serve static routes for the all the assets under dist/client folder
  router.static('dist/client')

  // Cache but not in 0 dev mode
  router.match('/', ONE_DAY_CACHE_HANDLER)
  router.match('/about', ONE_DAY_CACHE_HANDLER)
  router.match('/commerce', ONE_DAY_CACHE_HANDLER)
  router.match('/product/:name', ONE_DAY_CACHE_HANDLER)
  router.match('/commerce/:name', ONE_DAY_CACHE_HANDLER)
}

router.fallback(({ renderWithApp }) => {
  renderWithApp()
})

export default router
