import './main.css'

// To collect headings and then add to the page ToC
function pageToC (headings, path) {
  let toc = ['<div class="page_toc">']
  const list = []
  headings = document.querySelectorAll(`#main ${window.$docsify.toc.target}`)

  if (headings) {
    headings.forEach(function (heading) {
      const item = generateToC(heading.tagName.replace(/h/gi, ''), heading.innerHTML)
      if (item) {
        list.push(item)
      }
    })
  }
  if (list.length > 0) {
    toc = toc.concat(list)
    toc.push('</div>')
    return toc.join('')
  } else {
    return ''
  }
}

// To generate each ToC item
function generateToC (level, html) {
  if (level >= 1 && level <= window.$docsify.toc.tocMaxLevel) {
    const heading = ['<div class="lv' + level + '">', html, '</div>'].join('')
    return heading
  }
  return ''
}

// scroll listener
const scrollHandler = () => {
  const clientHeight = window.innerHeight
  const titleBlocks = document.querySelectorAll(`#main ${window.$docsify.toc.target}`)
  let insightBlocks = []
  titleBlocks.forEach((titleBlock, index) => {
    const rect = titleBlock.getBoundingClientRect()
    // still in sight
    if (rect.top <= clientHeight && rect.height + rect.top > 0) {
      insightBlocks.push(index)
    }
  })
  const scrollingElement = document.scrollingElement || document.body
  // scroll to top, choose the first one
  if (scrollingElement.scrollTop === 0) {
    insightBlocks = [0]
  } else if (scrollingElement.offsetHeight - window.innerHeight - scrollingElement.scrollTop < 5 &&
    insightBlocks.length > 0) {
    // scroll to bottom and still multi title in sight, choose the first one
    insightBlocks = [insightBlocks[0]]
  }
  if (insightBlocks.length) {
    const tocList = document.querySelectorAll('.page_toc>div')
    tocList.forEach((t, index) => {
      if (index === insightBlocks[0]) {
        t.classList.add('active')
      } else {
        t.classList.remove('active')
      }
    })
  }
}

export function install (hook, vm) {
  hook.mounted(function () {
    const content = window.Docsify.dom.find('.content')
    if (content) {
      const nav = window.Docsify.dom.create('aside', '')
      window.Docsify.dom.toggleClass(nav, 'add', 'toc-nav')
      window.Docsify.dom.before(content, nav)
    }
  })
  hook.doneEach(function () {
    const nav = window.Docsify.dom.find('.toc-nav')
    if (nav) {
      nav.innerHTML = pageToC().trim()
      if (nav.innerHTML === '') {
        window.Docsify.dom.toggleClass(nav, 'add', 'nothing')
        window.document.removeEventListener('scroll', scrollHandler)
      } else {
        window.Docsify.dom.toggleClass(nav, 'remove', 'nothing')
        scrollHandler()
        window.document.addEventListener('scroll', scrollHandler)
      }
    }
  })
}
