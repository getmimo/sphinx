/**
 * @jest-environment jsdom
 */

'use strict';

let fs = require('fs');
let userCode = fs.readFileSync('src/examples/index.html', 'utf8');
let userCss = fs.readFileSync('src/examples/style.css', 'utf8');

document.body.innerHTML = userCode;

const style = document.createElement('style');
style.innerHTML = userCss;
document.body.appendChild(style);

let sphinx = require('../../dist/index.js').buildSphinxWithJSDOM(test, expect);

sphinx.elementCSSPropertySet({
  elementSelector: 'h1',
  propertyName: 'color',
  propertyValue: 'blue',
});

sphinx.elementCSSPropertySet({
  elementSelector: 'h1',
  propertyName: 'font-size',
  propertyValue: '33px',
});

sphinx.elementCSSPropertySet({
  elementSelector: 'h1',
  propertyName: 'margin',
  propertyValue: '0px',
});

sphinx.elementCSSPropertySetWithCustomPropertyValue({
  elementSelector: 'h1',
  propertyName: 'font-size',
  propertyValue: '33px',
  customPropertyValue: '33',
});
