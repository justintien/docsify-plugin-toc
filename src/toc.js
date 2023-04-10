// To collect headings and then add to the page ToC
function pageToC(headings, path) {
  let toc = ['<div class="page_toc"><h6 class="margin--bottom"><b>On This Page</b></h6>'];
  const list = [];
  const ignoreHeaders = (window.$docsify.toc && window.$docsify.toc.ignoreHeaders) || [];
  headings = document.querySelectorAll(`#main ${(window.$docsify.toc && window.$docsify.toc.target) || 'h2, h3, h4, h5, h6'}`);

  if (headings) {
    headings.forEach(function (heading) {
      const innerText = heading.innerText;
      const innerHtml = heading.innerHTML;

      let needSkip = false;
      if (ignoreHeaders.length > 0) {
        console.error(innerText);
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

// scroll listener
const scrollHandler = () => {
  const clientHeight = window.innerHeight;
  const titleBlocks = document.querySelectorAll(`#main ${(window.$docsify.toc && window.$docsify.toc.target) || 'h2, h3, h4, h5, h6'}`);
  let insightBlocks = [];
  titleBlocks.forEach((titleBlock, index) => {
    const rect = titleBlock.getBoundingClientRect();
    // still in sight
    if (rect.top <= clientHeight && rect.height + rect.top > 0) {
      insightBlocks.push(index);
    }
  });
  const scrollingElement = document.scrollingElement || document.body;
  // scroll to top, choose the first one
  if (scrollingElement.scrollTop === 0) {
    insightBlocks = [0];
  } else if (scrollingElement.offsetHeight - window.innerHeight - scrollingElement.scrollTop < 5 &&
    insightBlocks.length > 0) {
    // scroll to bottom and still multi title in sight, choose the first one
    insightBlocks = [insightBlocks[0]];
  }
  if (insightBlocks.length) {
    const tocList = document.querySelectorAll('.page_toc>div');
    tocList.forEach((t, index) => {
      if (index === insightBlocks[0]) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
  }
};

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
      contentContainer.classList.add('content-container', 'row', 'w-100', 'sgds-container', 'is-fluid', 'is-flex', 'is-flex-justify-c');

      // Add classes for toc container
      tocContainer.classList.add('col', 'col', 'is-3-desktop', 'is-3-widescreen', 'is-3-fullhd', 'is-hidden-mobile', 'is-hidden-tablet-only');

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
