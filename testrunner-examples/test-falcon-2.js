const { test, isEqual, end, domLoaded } = require('../falcon');
var rewire = require('rewire');
var chai = require('chai');
chai.should();
chai.use(require('chai-dom'));
chai.use(require('chai-things'));
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

// empty element exists
elementName = 'div';
test(
  "Make there's an opening " + elementName + ' tag, <' + elementName + '>.',
  () => {
    let userCode = `
<!DOCTYPE html>
  <html>
    <body>
      <div>asdf</div>
      <div></div>
    </body>
  </html>
`;
    this.jsdom = require('jsdom-global')();
    document.body.innerHTML = userCode;
    const style = document.createElement('style');
    document.body.appendChild(style);
    let $ = jquery(window);
    global.$ = $; // make availble to other files if necessary

    let elements = document.querySelectorAll(elementName);

    expect(elements).to.exist;
    expect(
      [...elements].filter((e) => e.childNodes.length === 0).length,
    ).to.be.greaterThanOrEqual(1);
  },
);

// firstElementIsInsideSecondAll
innerElementName = 'div';
outerElementName = 'span';
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
      asdf
    </span>
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

    let outerElements = document.querySelectorAll(outerElementName);
    expect(outerElements).to.contain.some.have.descendants(innerElementName);
  },
);

// elementTextIsSetAll
elementName = 'div';
text = 'TEXT';
test('Make sure to place text between the ' + elementName + ' tags.', () => {
  let userCode = `
<html>
  <body>
    <div>
    </div>
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

  let outerElements = document.querySelectorAll(elementName);
  expect(outerElements).to.contain.some.have.trimmed.text(text);
});

// elementTextIsSetLooseAll
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

    </div>
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

    let tags = document.querySelectorAll(elementName);
    expect(tags).to.contain.some.have.trimmed.text(text);
  },
);

// elementAttributeSetToCorrectValueAll
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
    <div></div>
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
    let tags = document.querySelectorAll(elementName);
    expect(tags).to.contain.some.have.attribute(attributeName, attributeValue);
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
    <div class="blue">
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

  let elementComputedCSSProperties = [
    ...document.querySelectorAll(elementSelector),
  ].map((e) => window.getComputedStyle(e).getPropertyValue(propertyName));
  expect(elementComputedCSSProperties).to.contain.some.be.equal(propertyValue);
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

  let elementSiblings = [...document.querySelectorAll(previousElementName)].map(
    (e) => e.nextElementSibling,
  );

  expect(elementSiblings).to.contain.some.have.tagName(elementName);
});

async function start() {
  await test(`Make sure to set the color property to purple for the h1 selector.'`, async () => {
    let dom = await domLoaded('./testrunner-examples/index2.html');
    let button = dom.window.document.getElementsByTagName('button')[0];
    button.click();
    let span = dom.window.document.getElementsByTagName('span')[0];
    expect(span.innerHTML).to.equal('saved');
  });
  end();
  // await test(`Make sure to set the color property to purple for the h1 selector.'`, async () => {
  //   let dom = await domLoaded('../testrunner-examples/index2.html');
  //   let h1 = dom.window.document.getElementsByTagName('h1')[0];
  //   expect(h1.style.backgroundColor).to.equal('lightGray');
  // });
  // end();
}

start();
