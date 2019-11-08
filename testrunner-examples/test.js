const tyrion = require('../testrunner');

const jquery = require('jquery');
let fs = require('fs');
let userCode = fs.readFileSync('./testrunner-examples/index.html', 'utf8');
let userCss = fs.readFileSync('./testrunner-examples/styles.css', 'utf8');

this.jsdom = require('jsdom-global')();

document.body.innerHTML = userCode;
const style = document.createElement('style');
style.innerHTML = userCss;
document.body.appendChild(style);

tyrion.group('playing with the beforeAll function', () => {
  let $ = jquery(window);
  global.$ = $; // make availble to other files if necessary
  tyrion.check(null, 'Above 0', 'some test', t => {
    let doneElems = $('#votes');
    if (doneElems.length <= 0) {
      throw Error(doneElems.length);
    }
    return doneElems.length;
  });
  tyrion.end();
});
