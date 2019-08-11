import './main.css'

// To collect headings and then add to the page ToC
function pageToC (headings, path) {
  var toc = ['<div class="page_toc">', '<p class="title">TOC</p>']
  var list = []
  headings = document.querySelectorAll(window.$docsify.toc.target)

  if (headings) {
    headings.forEach(function (heading) {
      var item = generateToC(heading.tagName.replace(/h/gi, ''), heading.innerHTML)
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
  if (level > 1 && level <= window.$docsify.toc.tocMaxLevel) {
    var heading = ['<div class="lv' + level + '">', html, '</div>'].join('')
    return heading
  }
  return ''
}

export function install (hook, vm) {
  hook.mounted(function () {
    var content = window.Docsify.dom.find('.content')
    if (content) {
      var nav = window.Docsify.dom.create('aside', '')
      window.Docsify.dom.toggleClass(nav, 'add', 'nav')
      window.Docsify.dom.before(content, nav)
    }
  })
  hook.doneEach(function () {
    var nav = window.Docsify.dom.find('.nav')
    if (nav) {
      nav.innerHTML = pageToC().trim()
      if (nav.innerHTML === '') {
        window.Docsify.dom.toggleClass(nav, 'add', 'nothing')
      } else {
        window.Docsify.dom.toggleClass(nav, 'remove', 'nothing')
      }
    }
  })
}
