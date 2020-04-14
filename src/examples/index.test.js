let fs = require('fs');
let htmlCode = fs.readFileSync('src/examples/index.html', 'utf8');
let HTMLParser = require('node-html-parser');
let root = HTMLParser.parse(htmlCode);
let sphinx = require('../../dist/index.js').buildSphinx(
  root,
  htmlCode,
  test,
  expect,
);
let { isTextSimilar } = require('../../dist/index.js');

sphinx.test('Make sure to start your code with: <!doctype html>.', () => {
  openingTagIndex = htmlCode.indexOf('<!DOCTYPE html>');
  expect(openingTagIndex).toEqual(0);
});

sphinx.elementExists({ elementName: 'html' });
sphinx.elementExists({ elementName: 'body' });
sphinx.elementExists({ elementName: 'script' });
sphinx.elementExists({ elementName: 'h1' });
sphinx.elementExists({ elementName: 'p' });

let firstPClosingTagIndex = sphinx.getEndOfClosingTagIndexForElement({
  elementName: 'p',
});
sphinx.elementExists({ elementName: 'p', searchIndex: firstPClosingTagIndex });

sphinx.emptyElementExists({ elementName: 'img' });

sphinx.firstElementIsInsideSecond({
  firstElementName: 'body',
  secondElementName: 'html',
});
sphinx.firstElementIsInsideSecond({
  firstElementName: 'head',
  secondElementName: 'html',
});
sphinx.firstElementIsInsideSecond({
  firstElementName: 'script',
  secondElementName: 'body',
});
sphinx.firstElementIsInsideSecond({
  firstElementName: 'h1',
  secondElementName: 'body',
});
sphinx.firstElementIsInsideSecond({
  firstElementName: 'p',
  secondElementName: 'body',
});
sphinx.firstElementIsInsideSecond({
  firstElementName: 'h1',
  secondElementName: 'body',
});
sphinx.firstElementIsInsideSecond({
  firstElementName: 'em',
  secondElementName: 'p',
});

//test should pass if the user's text is equal to the sample text (for texts of length > 1)
sphinx.elementTextIsSetLoose({ elementName: 'title', text: 'abc a\n d' });
//test should pass if the user's text contains only the first and last words of the sample text
sphinx.elementTextIsSetLoose({ elementName: 'h2', text: 'abc a\n d' });
//test should pass if the user's text contains only the first word of the sample text, if the sample text's length is 1
sphinx.elementTextIsSetLoose({ elementName: 'span', text: 'abc' });

test('Test should fail when the user\'s text doesn\'t contain the last word of the sample text', () => {
  expect(isTextSimilar(root, 'title', 'abc a\n m')).toBe(false);
});
test('Test should fail when the user\'s text doesn\'t contain the first word of the sample text', () => {
  expect(isTextSimilar(root, 'title', 'ab a\n d')).toBe(false);
});
test('Test should fail when the user\'s text doesn\'t contain the first and last words of the sample text', () => {
  expect(isTextSimilar(root, 'title', 'ab a\n m')).toBe(false);
});
test('Test should fail when the sample text\'s length is greater than one, but the user\'s text length is less than or equal to one', () => {
  expect(isTextSimilar(root, 'span', 'abc d')).toBe(false);
});

sphinx.elementAttributeSetToCorrectValue({
  elementName: 'script',
  attributeName: 'src',
  attributeValue: 'script.js',
});
sphinx.elementAttributeSetToCorrectValue({
  elementName: 'img',
  attributeName: 'src',
  attributeValue: 'https://mimo.app/r/panda.png',
});
