import { install } from './toc'

if (!window.$docsify) {
  window.$docsify = {}
}

window.$docsify.plugins = (window.$docsify.plugins || []).concat(install)
