const { test, isEqual, end } = require('../dist/falcon');
const jquery = require('jquery');
let fs = require('fs');
let userCode = fs.readFileSync('./testrunner-examples/index4.html', 'utf8');
this.jsdom = require('jsdom-global')(userCode);
//document.body.innerHTML = userCode;

//chai assertion library
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('chai-things'));
let expect = chai.expect;
//rewire
var rewire = require('rewire');

let $ = jquery(window);
global.$ = $; // make available to other files if necessary

test("Make sure that you've added a script element just above the closing '</body>' tag", (_) => {
  isEqual($('script').length, 1);
});

// why test fails?
let elementName = 'script';
let attributeName = 'src';
let attributeValue = 'script.js';

test(
  'Make sure the opening ' +
    elementName +
    ' tag contains a ' +
    attributeName +
    ' attribute with the value "' +
    attributeValue +
    '".',
  () => {
    let tags = document.querySelectorAll(elementName);
    expect(tags).to.contain.some.have.attribute(attributeName, attributeValue);
  },
);

// test('Make sure that the script element has the correct content', (_) => {
//   document.body.innerHTML =
//     '<h1>Leave a Review</h1>' +
//     '<textarea rows="3" cols="15"></textarea>' +
//     '<script>' +
//     'const docBody = document.getElementById("the-body");' +
//     '</script>';
//   let scriptEl = document.getElementsByTagName('script')[0];
//   console.error(scriptEl.innerHTML);
//   console.error(scriptEl.innerText);
//   expect(scriptEl.innerHTML).to.equal(
//     'const docBody = document.getElementById("the-body");',
//   );
// });

// test("Make sure there is a script element just above the closing '</body>' tag", (_) => {
//   isEqual($('script').length, 1);
// });
// test('Make sure that the script element has the correct content', (_) => {
//   document.body.innerHTML =
//     '<h1 id="the-heading">Leave a Review</h1>' +
//     '<textarea rows="3" cols="15"></textarea>' +
//     '<script>' +
//     'const docBody = document.getElementById("the-body");' +
//     'const h1 = document.getElementById("the-heading");' +
//     '</script>';
//   let scriptEl = document.getElementsByTagName('script')[0];
//   /* does not work
//  expect(scriptEl.innerHTML).to.equal(
//     `const docBody = document.getElementById("the-body");
//    console.log(docBody);
//    const h1 = document.getElementById("the-heading");`,
//   );
//   */
//   expect(scriptEl.innerHTML).to.equal(
//     'const docBody = document.getElementById("the-body");' +
//       'const h1 = document.getElementById("the-heading");',
//   );
// });
// end();

end();
