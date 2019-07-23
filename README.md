<img src="https://image.flaticon.com/icons/svg/190/190472.svg" alt="sphinx_icon" width="150"/>

# Sphinx

Sphinx is a delightful JavaScript Testing Library with a focus on simplicity.

# Installation

For now we provide the library only directly via GitHub install.

`npm install github:getmimo/sphinx`

```json
"dependencies": {
    "sphinx": "github:getmimo/sphinx"
  },
```

# Usage

Simply require the builder function and build your own personal Sphinx

```javascript
let fs = require('fs');
let htmlCode = fs.readFileSync('src/examples/index.html', 'utf8');
let HTMLParser = require('node-html-parser');
let root = HTMLParser.parse(htmlCode);

let sphinx = require('sphinx').buildSphinx(root, htmlCode, test, expect);
```

after you have successfully built it you can use it like this

```javascript
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
```

# Authors

Thomas Sattlecker ([@ThomasS09](https://twitter.com/ThomasS09)) - [Mimo](https://getmimo.com)

Christopher Simerle ([@simerle_c](https://twitter.com/simerle_c)) - [Mimo](https://getmimo.com)
