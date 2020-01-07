const $ = require('jquery');

class Sphinx {
  private code: string;
  private root: any;
  private test: any;
  private expect: any;

  constructor(root: any, code: string, test: any, expect: any) {
    this.code = code;
    this.root = root;
    this.test = test;
    this.expect = expect;
  }

  /**
   * Test if the element with a specified elementName exists, starting from the searchIndex
   */
  elementExists({
    elementName,
    startIndex,
  }: {
    elementName: string;
    startIndex: number;
  }) {
    this.test(
      'Make sure there\'s an opening ' +
        elementName +
        ' tag, <' +
        elementName +
        '>.',
      () => {
        let openingTagIndex = this.code.indexOf('<' + elementName, startIndex);
        this.expect(openingTagIndex).toBeGreaterThan(0);
      },
    );

    this.test(
      'Make sure there\'s a closing ' +
        elementName +
        ' tag, </' +
        elementName +
        '>.',
      () => {
        let closingTagIndex = this.code.indexOf(
          '</' + elementName + '>',
          startIndex,
        );
        this.expect(closingTagIndex).toBeGreaterThan(0);
      },
    );

    this.test(
      'Make sure there are opening and closing '+
      elementName + 
      ' tags, <' +
        elementName +
        '></' +
        elementName +
        '>.',
      () => {
        let openingTagIndex = this.code.indexOf('<' + elementName, startIndex);
        let closingTagIndex = this.code.indexOf(
          '</' + elementName + '>',
          startIndex,
        );
        this.expect(closingTagIndex - openingTagIndex).toBeGreaterThan(0);
      },
    );
  }

  /**
   * Test if the element with a specified elementName exists and is empty, starting from the searchIndex
   */
  emptyElementExists({
    elementName,
    startIndex,
  }: {
    elementName: string;
    startIndex: number;
  }) {
    this.test(
      'Make there\'s an opening ' +
        elementName +
        ' tag, <' +
        elementName +
        '>.',
      () => {
        let openingTagIndex = this.code.indexOf('<' + elementName, startIndex);
        this.expect(openingTagIndex).toBeGreaterThan(0);
      },
    );
  }

  firstElementIsInsideSecond({
    firstElementName,
    secondElementName,
  }: {
    firstElementName: string;
    secondElementName: string;
  }) {
    this.test(
      'Make sure the ' +
        firstElementName +
        ' is inside the ' +
        secondElementName +
        ' element.',() => {
        let outerElement = this.root.querySelector(secondElementName);
        let innerElement = outerElement.querySelectorAll(firstElementName);
        this.expect(innerElement.length).toBeGreaterThan(0);
      },
    );
  }

  elementTextIsSet({
    elementName,
    text,
  }: {
    elementName: string;
    text: string;
  }) {
    this.test(
      'Make sure to place text between the ' + elementName + ' tags.',
      () => {
        let tag = this.root.querySelector(elementName);
        this.expect(tag.text.trim().length).toBeGreaterThan(0);
        this.expect(isTextSet(this.root, elementName)).toEqual(true);
      },
    );

    if (text !== undefined) {
      this.test(
        'Make sure to place ' +
          text +
          ' inside the ' +
          elementName +
          ' element.',() => {
          let tag = this.root.querySelector(elementName);
          this.expect(tag.text.trim().length).toBeGreaterThan(0);
          this.expect(isTextEqual(this.root, elementName, text)).toEqual(true);
        },
      );
    }
  }

  elementAttributeSetToCorrectValue({
    elementName,
    attributeName,
    attributeValue,
  }: {
    elementName;
    attributeName;
    attributeValue;
  }) {
    this.test(
      'Make sure the opening ' +
        elementName +
        ' tag contains a ' +
        attributeName +
        ' attribute with the value "' +
        attributeValue +
        '".',
      () => {
        this.expect(
          isAttributeSet(this.root, elementName, attributeName, attributeValue),
        ).toEqual(true);
      },
    );
  }

  elementCSSPropertySet({
    elementSelector,
    propertyName,
    propertyValue
  }: {
    elementSelector: string;
    propertyName: string;
    propertyValue: string;
  }) {
    this.test(
      `Make sure to set the ${propertyName} property to ${propertyValue} for the ${elementSelector} selector.'`,
      () => {
        let element = $(elementSelector);
        this.expect(element.length).toBeGreaterThan(0);
        this.expect($(element).css(propertyName)).toBe(propertyValue);
      },
    );
  }

  /**
   * 
   * 
   * @param param0 
   */
  elementCSSPropertySetWithCustomPropertyValue({
    elementSelector,
    propertyName,
    propertyValue,
    customPropertyValue
  }: {
    elementSelector: string;
    propertyName: string;
    propertyValue: string;
    customPropertyValue: string;
  }) {
    this.test(
      `Make sure to set the ${propertyName} property to ${customPropertyValue} for the ${elementSelector} selector.'`,
      () => {
        let element = $(elementSelector);
        this.expect(element.length).toBeGreaterThan(0);
        this.expect($(element).css(propertyName)).toBe(propertyValue);
      },
    );
  }

  getEndOfClosingTagIndexForElement({
    elementName,
    startIndex,
  }: {
    elementName: string;
    startIndex: number;
  }) {
    let searchIndex = startIndex;
    if (searchIndex === undefined) {
      searchIndex = 0;
    }

    let closingTagIndex = this.code.indexOf(
      '</' + elementName + '>',
      startIndex,
    );
    return closingTagIndex + elementName.length;
  }
}

function isTextSet(root, elementName) {
  let elements = root.querySelectorAll(elementName);
  let isTextSet = false;

  for (var index = 0; index < elements.length; index++) {
    if (elements[index].text.trim().length > 0) {
      isTextSet = true;
    }
  }

  return isTextSet;
}

function isTextEqual(root, elementName, text) {
  let elements = root.querySelectorAll(elementName);
  let isTextEqual = false;

  for (var index = 0; index < elements.length; index++) {
    if (
      elements[index].text.trim().toLowerCase() === text.trim().toLowerCase()
    ) {
      isTextEqual = true;
    }
  }

  return isTextEqual;
}

function isAttributeSet(root, elementName, attributeName, attributeValue) {
  let elements = root.querySelectorAll(elementName);
  let isAttributeSet = false;
  for (var index = 0; index < elements.length; index++) {
    let attribute = elements[index].attributes[attributeName];
    if (attribute !== undefined && attribute.trim() === attributeValue) {
      isAttributeSet = true;
    }
  }

  return isAttributeSet;
}

function buildSphinx(root: any, htmlCode: string, test: any, expect: any) {
  return new Sphinx(root, htmlCode, test, expect);
}

function buildSphinxWithJSDOM(test: any, expect: any) {
  return new Sphinx(undefined, undefined, test, expect);
}

module.exports = {
  buildSphinx: buildSphinx,
  buildSphinxWithJSDOM: buildSphinxWithJSDOM,
  isTextSet: isTextSet,
  isTextEqual: isTextEqual,
  isAttributeSet: isAttributeSet,
};
