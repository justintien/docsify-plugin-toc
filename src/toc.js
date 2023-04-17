// To collect headings and then add to the page ToC
function pageToC(headings, path) {
  let toc = ['<div class="page_toc"><p class="has-text-weight-bold margin--bottom--sm">On this page</p>'];
  const list = [];
  const ignoreHeaders = (window.$docsify.toc && window.$docsify.toc.ignoreHeaders) || [];
  headings = document.querySelectorAll(`#main ${(window.$docsify.toc && window.$docsify.toc.target) || 'h2, h3, h4, h5, h6'}`);

  if (headings) {
    headings.forEach(function (heading) {
      const innerText = heading.innerText;
      const innerHtml = heading.innerHTML;

      let needSkip = false;
      if (ignoreHeaders.length > 0) {
        needSkip = ignoreHeaders.some(str => innerText.match(str));
      }

      if (needSkip) return;

      const item = generateToC(heading.tagName.replace(/h/gi, ''), innerHtml);
      if (item) {
        list.push(item);
      }
    });
  }
  if (list.length > 0) {
    toc = toc.concat(list);
    toc.push('</div>');
    return toc.join('');
  } else {
    return '';
  }
}

// To generate each ToC item
function generateToC(level, html) {
  if (level >= 1 && level <= ((window.$docsify.toc && window.$docsify.toc.tocMaxLevel) || 5)) {
    const heading = ['<div class="lv' + level + ' is-size-8">', html, '</div>'].join('');
    return heading;
  }
  return '';
}

function scrollHandler() {
  // TOC
  const tocList = document.querySelectorAll('.page_toc > div');

  // Main
  const anchors = document.querySelectorAll('article#main ' + ((window.$docsify.toc && window.$docsify.toc.target) || 'h2, h3, h4, h5, h6'));
  const doc = document.documentElement;

  const coverHeight = (document.querySelector('section.cover') && document.querySelector('section.cover').getBoundingClientRect().height) || 0;
  const top = ((doc && doc.scrollTop) || document.body.scrollTop) - coverHeight;
  let last;

  for (let i = 0, len = anchors.length; i < len; i += 1) {
    const node = anchors[i];

    if (node.offsetTop > top) {
      if (!last) {
        last = node;
      }

      break;
    } else {
      last = node;
    }
  }

  if (!last) {
    return;
  }

  tocList.forEach((toc) => {
    const tocLink = toc.querySelector('a[data-id]');
    const tocLinkID = tocLink.getAttribute('data-id');
    const isActive = tocLinkID === last.getAttribute('id');
    toc.classList.toggle('active', isActive);
  });
}

export function install(hook, vm) {
  hook.mounted(function () {
    const content = window.Docsify.dom.find('.content');
    if (content) {
      const nav = window.Docsify.dom.create('aside', '');
      window.Docsify.dom.toggleClass(nav, 'add', 'toc-container');
      window.Docsify.dom.before(content, nav);
    }
  });
  hook.doneEach(function () {
    const nav = window.Docsify.dom.find('.toc-container');
    if (nav) {
      nav.innerHTML = pageToC().trim();
      if (nav.innerHTML === '') {
        window.Docsify.dom.toggleClass(nav, 'add', 'nothing');
        window.document.removeEventListener('scroll', scrollHandler);
      } else {
        window.Docsify.dom.toggleClass(nav, 'remove', 'nothing');
        scrollHandler();
        window.document.addEventListener('scroll', scrollHandler);
      }
    }
  });
  hook.ready(function () {
    // Parent elements
    const docMainContainer = document.querySelector('.content');
    // Child elements
    const tocContainer = document.querySelector('.toc-container');
    const markdownSection = document.querySelector('.markdown-section');
    // Check if it's doc portal by querying for els
    const isOnDocPortal = document.querySelector('.sgds-masthead') !== null;

    if (docMainContainer && tocContainer) {
      // Add classes for docMainContainer
      docMainContainer.classList.add('sgds-section', 'is-flex', 'is-flex-justify-c');
      docMainContainer.setAttribute('style', 'overflow-y: hidden;');

      // Create a new container element to hold the content and add classes
      const contentContainer = document.createElement('div');
      contentContainer.classList.add('content-container', 'row', 'w-100', 'sgds-container', 'is-fluid', 'is-flex', 'is-flex-justify-c', 'margin--right--none', 'margin--left--none', 'padding--left', 'padding--right');

      // Add classes for toc container
      tocContainer.classList.add('col', 'col', 'is-3-desktop', 'is-3-widescreen', 'is-3-fullhd', 'is-hidden-touch');

      // Add class for markdown container
      markdownSection.classList.add('col', 'is-9', 'is-12-touch');

      if (isOnDocPortal) {
        contentContainer.classList.add('margin--top');
        docMainContainer.classList.add('margin--top--lg');
      }

      // Move all the child elements of tocContainer to contentContainer
      while (tocContainer.nextSibling) {
        contentContainer.appendChild(tocContainer.nextSibling);
      }

      // Insert contentContainer before tocContainer inside docMainContainer
      docMainContainer.insertBefore(contentContainer, tocContainer);

      // Move tocContainer to the top of contentContainer
      contentContainer.insertBefore(tocContainer, contentContainer.firstChild);
    }
  });
}
