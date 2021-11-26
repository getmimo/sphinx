const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let path = require('path');

// HELPER
async function domLoaded(file) {
  return JSDOM.fromFile(path.resolve(file), {
    resources: 'usable',
    runScripts: 'dangerously',
  }).then(async (dom) => {
    return await new Promise((resolve, reject) => {
      dom.window.document.addEventListener('DOMContentLoaded', () => {
        resolve(dom);
      });
    });
  });
}

module.exports = {
  domLoaded,
};
