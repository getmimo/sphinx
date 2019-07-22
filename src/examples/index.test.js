let fs = require('fs');
let htmlCode = fs.readFileSync('src/examples/index.html', 'utf8');
let HTMLParser = require('node-html-parser');
let root = HTMLParser.parse(htmlCode);
let mist = new (require('../index.js'))(root, htmlCode, test, expect);

test('Make sure to start your code with: <!doctype html>.', () => {
  openingTagIndex = htmlCode.indexOf('<!doctype html>');
  expect(openingTagIndex).toEqual(0);
});

mist.elementExists({ elementName: 'html' });
mist.elementExists({ elementName: 'body' });
mist.elementExists({ elementName: 'script' });
mist.elementExists({ elementName: 'h1' });
mist.elementExists({ elementName: 'p' });

let firstPClosingTagIndex = mist.getEndOfClosingTagIndexForElement({
  elementName: 'p',
});
mist.elementExists({ elementName: 'p', searchIndex: firstPClosingTagIndex });

mist.emptyElementExists({ elementName: 'img' });

mist.firstElementIsInsideSecond({
  firstElementName: 'body',
  secondElementName: 'html',
});
mist.firstElementIsInsideSecond({
  firstElementName: 'script',
  secondElementName: 'body',
});
mist.firstElementIsInsideSecond({
  firstElementName: 'h1',
  secondElementName: 'body',
});
mist.firstElementIsInsideSecond({
  firstElementName: 'p',
  secondElementName: 'body',
});
mist.firstElementIsInsideSecond({
  firstElementName: 'h1',
  secondElementName: 'body',
});
mist.firstElementIsInsideSecond({
  firstElementName: 'em',
  secondElementName: 'p',
});

mist.elementTextIsSet({ elementName: 'h1' });
mist.elementTextIsSet({ elementName: 'p' });
mist.elementTextIsSet({ elementName: 'em' });
mist.elementTextIsSet({ elementName: 'p', text: '3 votes' });

mist.elementAttributeSetToCorrectValue({
  elementName: 'script',
  attributeName: 'src',
  attributeValue: 'script.js',
});
mist.elementAttributeSetToCorrectValue({
  elementName: 'img',
  attributeName: 'src',
  attributeValue: 'https://mimo.app/r/panda.png',
});
