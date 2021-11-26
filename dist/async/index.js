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
    dom.window.document.addEventListener('DOMContentLoaded', () => {
      resolve(dom);
    });
  });
}

module.exports = {
  domLoaded,
};
