const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let path = require('path');

// HELPER
async function domLoaded(file) {
  const dom = await JSDOM.fromFile(path.resolve(file), {
    resources: 'usable',
    runScripts: 'dangerously',
  });
  return await new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      reject('Loading the DOM timed out');
    }, 5000);
    dom.window.document.addEventListener('load', () => {
      clearTimeout(timeout);
      resolve(dom);
    });
  });
}

module.exports = {
  domLoaded,
};
