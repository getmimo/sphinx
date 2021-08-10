let fs = require('fs');
let htmlCode = fs.readFileSync('src/examples/index2.html', 'utf8');
let HTMLParser = require('node-html-parser');
let root = HTMLParser.parse(htmlCode);
let sphinx = require('../../dist/index.js').buildSphinx(
  root,
  htmlCode,
  test,
  expect,
);

sphinx.elementTextIsSetAll({ elementName: 'p', text: 'first paragraph' });
sphinx.elementTextIsSetAll({ elementName: 'p', text: 'second paragraph' });
sphinx.elementTextIsSetAll({ elementName: 'p' });
sphinx.elementTextIsSetAll({ elementName: 'p', text: '' });

sphinx.elementTextIsSetLooseAll({
  elementName: 'p',
  text: 'first woote paragraph',
});
sphinx.elementTextIsSetLooseAll({ elementName: 'p', text: 'paragraph' });
sphinx.elementTextIsSetLooseAll({ elementName: 'p', text: 'first paragraph' });
sphinx.elementTextIsSetLooseAll({ elementName: 'p', text: 'second paragraph' });
sphinx.elementTextIsSetLooseAll({
  elementName: 'p',
  text: 'second test test paragraph',
});
sphinx.elementTextIsSetLooseAll({
  elementName: 'div',
});

sphinx.firstElementIsInsideSecondAll({
  firstElementName: 'p',
  secondElementName: 'div',
});
sphinx.firstElementIsInsideSecondAll({
  firstElementName: 'div',
  secondElementName: 'body',
});
