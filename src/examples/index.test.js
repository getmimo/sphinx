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

sphinx.test('Make sure to start your code with: <!doctype html>.', () => {
  openingTagIndex = htmlCode.indexOf('<!doctype html>');
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

sphinx.elementTextIsSet({ elementName: 'h1' });
sphinx.elementTextIsSet({ elementName: 'p' });
sphinx.elementTextIsSet({ elementName: 'em' });
sphinx.elementTextIsSet({ elementName: 'p', text: '3 votes' });

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
