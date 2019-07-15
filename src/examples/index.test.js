let fs = require('fs');
let htmlCode = fs.readFileSync('src/examples/index.html', 'utf8');
let HTMLParser = require('node-html-parser');
let root = HTMLParser.parse(htmlCode);
let mist = new (require('../index.js'))(root, htmlCode, test, expect);
// let mist = new Mist

test('Make sure to start your code with: <!doctype html>.', () => {
  openingTagIndex = htmlCode.indexOf('<!doctype html>');
  expect(openingTagIndex).toEqual(0);
});

mist.elementExists('html');
mist.elementExists('body');
mist.elementExists('script');
mist.elementExists('h1');
mist.elementExists('p');

let firstPClosingTagIndex = mist.getEndOfClosingTagIndexForElement('p');
mist.elementExists('p', firstPClosingTagIndex);

mist.emptyElementExists('img');

mist.firstElementIsInsideSecond('body', 'html');
mist.firstElementIsInsideSecond('script', 'body');
mist.firstElementIsInsideSecond('h1', 'body');
mist.firstElementIsInsideSecond('p', 'body');
mist.firstElementIsInsideSecond('h1', 'body');

mist.firstElementIsInsideSecond('em', 'p');

// mist.scriptElementIsAtBottomOfBody();

mist.elementTextIsSet('h1');
mist.elementTextIsSet('p');
mist.elementTextIsSet('em');
mist.elementTextIsSet('p', '3 votes');

mist.elementAttributeSetToCorrectValue('script', 'src', 'script.js');
mist.elementAttributeSetToCorrectValue(
  'img',
  'src',
  'https://mimo.app/r/panda.png',
);
