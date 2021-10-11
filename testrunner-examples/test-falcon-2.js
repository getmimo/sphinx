const { test, isEqual, end } = require('../falcon');
var chai = require('chai');
chai.use(require('chai-dom'));
let expect = chai.expect;
const jquery = require('jquery');
let fs = require('fs');

// elementExists
let elementName = 'div';
let startIndex = 10;
let code = fs.readFileSync(
  './testrunner-examples/index.element-exists.html',
  'utf8',
);

test(
  "Make sure there's an opening " +
    elementName +
    ' tag, <' +
    elementName +
    '>.',
  () => {
    let openingTagIndex = code.indexOf('<' + elementName, startIndex);
    expect(openingTagIndex).to.greaterThanOrEqual(0);
  },
);

test(
  "Make sure there's a closing " +
    elementName +
    ' tag, </' +
    elementName +
    '>.',
  () => {
    let closingTagIndex = code.indexOf('</' + elementName + '>', startIndex);
    expect(closingTagIndex).to.greaterThanOrEqual(0);
  },
);

test(
  'Make sure there are opening and closing ' +
    elementName +
    ' tags, <' +
    elementName +
    '></' +
    elementName +
    '>.',
  () => {
    let openingTagIndex = code.indexOf('<' + elementName, startIndex);
    let closingTagIndex = code.indexOf('</' + elementName + '>', startIndex);
    expect(closingTagIndex - openingTagIndex).to.greaterThanOrEqual(0);
  },
);

// emptyElementExists
elementName = 'div';
test(
  "Make there's an opening " + elementName + ' tag, <' + elementName + '>.',
  () => {
    let userCode = fs.readFileSync(
      './testrunner-examples/index.empty-element-exists.html',
      'utf8',
    );
    this.jsdom = require('jsdom-global')();
    document.body.innerHTML = userCode;
    const style = document.createElement('style');
    document.body.appendChild(style);
    let $ = jquery(window);
    global.$ = $; // make availble to other files if necessary

    let element = $(elementName).get(0);
    expect(element).to.exist;
    expect(element).to.be.empty;
  },
);

// firstElementIsInsideSecond
let innerElementName = 'div';
let outerElementName = 'body';
test(
  'Make sure the ' +
    innerElementName +
    ' is inside the ' +
    outerElementName +
    ' element.',
  () => {
    let userCode = `
<html>
  <body>
    <div></div>
  </body>
</html>`;
    this.jsdom = require('jsdom-global')();
    document.body.innerHTML = userCode;
    const style = document.createElement('style');
    document.body.appendChild(style);
    let $ = jquery(window);
    global.$ = $; // make availble to other files if necessary

    let innerElement = $(outerElementName).children(':first').get(0);
    expect(innerElement).to.have.tagName(innerElementName);
  },
);

// firstElementIsInsideSecondAll
innerElementName = 'div';
outerElementName = 'body';
test(
  'Make sure the ' +
    innerElementName +
    ' is inside the ' +
    outerElementName +
    ' element.',
  () => {
    let userCode = `
<html>
  <body>
    <span>
      <div></div>
    </span>
  </body>
</html>`;
    this.jsdom = require('jsdom-global')();
    document.body.innerHTML = userCode;
    const style = document.createElement('style');
    document.body.appendChild(style);
    let $ = jquery(window);
    global.$ = $; // make availble to other files if necessary

    let outerElement = $(outerElementName).get(0);
    expect(outerElement).to.have.descendants(innerElementName);
  },
);

// elementTextIsSet

// elementTextIsSetAll
elementName = 'div';
text = 'TEXT';
test('Make sure to place text between the ' + elementName + ' tags.', () => {
  let userCode = `
<html>
  <body>
    <div>
      TEXT
    </div>
  </body>
</html>`;
  this.jsdom = require('jsdom-global')();
  document.body.innerHTML = userCode;
  const style = document.createElement('style');
  document.body.appendChild(style);
  let $ = jquery(window);
  global.$ = $; // make availble to other files if necessary

  let outerElement = $(elementName).get(0);
  expect(outerElement).to.have.trimmed.text(text);
});

// elementTextIsSetLoose
elementName = 'div';
text = 'TEXT';
test('Make sure to place text between the ' + elementName + ' tags.', () => {
  let userCode = `
<html>
  <body>
    <span>
    <div>
      1
    </div>
    <div>
      TEXT
    </div>
    </span>
    <div>
      hellow
    </div>
  </body>
</html>`;
  this.jsdom = require('jsdom-global')();
  document.body.innerHTML = userCode;
  const style = document.createElement('style');
  document.body.appendChild(style);
  let $ = jquery(window);
  global.$ = $; // make availble to other files if necessary

  let tags = document.querySelectorAll(elementName);
  tags.forEach((tag) => {
    expect(tag.textContent.trim().length).to.be.greaterThan(0);
  });
});

test(
  'Make sure to place ' + text + ' between the ' + elementName + ' tags.',
  () => {
    let userCode = `
<html>
  <body>
    <div>
      TEXT
    </div>
  </body>
</html>`;
    this.jsdom = require('jsdom-global')();
    document.body.innerHTML = userCode;
    const style = document.createElement('style');
    document.body.appendChild(style);
    let $ = jquery(window);
    global.$ = $; // make availble to other files if necessary

    expect(document.querySelectorAll(elementName)).to.have.trimmed.text(text);
  },
);

// elementTextIsSetLooseAll

// elementAttributeSetToCorrectValue
elementName = 'div';
attributeName = 'value';
attributeValue = '1';
test(
  'Make sure the opening ' +
    elementName +
    ' tag contains a ' +
    attributeName +
    ' attribute with the value "' +
    attributeValue +
    '".',
  () => {
    let userCode = `
<html>
  <body>
    <div value="1">
      TEXT
    </div>
  </body>
</html>`;
    this.jsdom = require('jsdom-global')();
    document.body.innerHTML = userCode;
    const style = document.createElement('style');
    document.body.appendChild(style);
    let $ = jquery(window);
    global.$ = $; // make availble to other files if necessary

    expect(document.querySelector(elementName)).to.have.attribute(
      attributeName,
      attributeValue,
    );
  },
);

// elementCSSPropertySet
elementSelector = 'div';
propertyName = 'background-color';
propertyValue = 'red';
test(`Make sure to set the ${propertyName} property to ${propertyValue} for the ${elementSelector} selector.'`, () => {
  let userCode = `
<html>
  <body>
    <div class="red">
      TEXT
    </div>
  </body>
</html>`;
  this.jsdom = require('jsdom-global')();
  document.body.innerHTML = userCode;
  const style = document.createElement('style');
  style.innerHTML = `.red { ${propertyName}: ${propertyValue}; }`;
  document.body.appendChild(style);
  let $ = jquery(window);
  global.$ = $; // make availble to other files if necessary

  expect(
    window
      .getComputedStyle(document.querySelector(elementSelector))
      .getPropertyValue(propertyName),
  ).to.equal(propertyValue);
});

elementName = 'div';
previousElementName = 'span';
test(`Make sure the element ${elementName} is right after ${previousElementName}.'`, () => {
  let userCode = `
<html>
  <body>
    <span></span> 
    <div class="red">
      TEXT
    </div>
  </body>
</html>`;
  this.jsdom = require('jsdom-global')();
  document.body.innerHTML = userCode;
  const style = document.createElement('style');
  style.innerHTML = `.red { ${propertyName}: ${propertyValue}; }`;
  document.body.appendChild(style);
  let $ = jquery(window);
  global.$ = $; // make availble to other files if necessary

  expect(
    document.querySelector(previousElementName).nextElementSibling,
  ).to.have.tagName(elementName);
});

end();
