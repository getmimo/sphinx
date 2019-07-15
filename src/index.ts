class Mist {
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

  elementExists(elementName, searchIndex) {
    this.test(
      'Make sure to create the opening ' +
        elementName +
        ' tag with: <' +
        elementName +
        '>.',
      () => {
        let openingTagIndex = this.code.indexOf('<' + elementName, searchIndex);
        this.expect(openingTagIndex).toBeGreaterThan(0);
      },
    );

    this.test(
      'Make sure to create the closing ' +
        elementName +
        ' tag with: </' +
        elementName +
        '>.',
      () => {
        let closingTagIndex = this.code.indexOf(
          '</' + elementName + '>',
          searchIndex,
        );
        this.expect(closingTagIndex).toBeGreaterThan(0);
      },
    );

    this.test(
      'Make sure to put the opening and closing tags in their correct place: <' +
        elementName +
        '></' +
        elementName +
        '>.',
      () => {
        let openingTagIndex = this.code.indexOf('<' + elementName, searchIndex);
        let closingTagIndex = this.code.indexOf(
          '</' + elementName + '>',
          searchIndex,
        );
        this.expect(closingTagIndex - openingTagIndex).toBeGreaterThan(0);
      },
    );
  }

  getEndOfClosingTagIndexForElement(elementName, startIndex) {
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

  emptyElementExists(elementName, startIndex) {
    let searchIndex = startIndex;
    if (searchIndex === undefined) {
      searchIndex = 0;
    }

    this.test(
      'Make sure to create the ' +
        elementName +
        ' tag with: <' +
        elementName +
        '/>.',
      () => {
        let openingTagIndex = this.code.indexOf('<' + elementName, searchIndex);
        this.expect(openingTagIndex).toBeGreaterThan(0);
      },
    );
  }

  firstElementIsInsideSecond(firstElement, secondElement) {
    this.test(
      'Make sure to place the <' +
        firstElement +
        '></' +
        firstElement +
        '> tags inside the <' +
        secondElement +
        '></' +
        secondElement +
        '> tags.',
      () => {
        let outerElement = this.root.querySelector(secondElement);
        let innerElement = outerElement.querySelectorAll(firstElement);
        this.expect(innerElement.length).toBeGreaterThan(0);
      },
    );
  }

  elementTextIsSet(elementName, text) {
    this.test(
      'Make sure to place text between the ' + elementName + ' tags.',
      () => {
        let tag = this.root.querySelector(elementName);
        this.expect(tag.text.trim().length).toBeGreaterThan(0);

        let elements = this.root.querySelectorAll(elementName);
        let isTextSet = false;

        for (var index = 0; index < elements.length; index++) {
          if (elements[index].text.trim().length > 0) {
            isTextSet = true;
          }
        }

        this.expect(isTextSet).toEqual(true);
      },
    );

    if (text !== undefined) {
      this.test(
        'Make sure to place the correct text between the ' +
          elementName +
          ' tags: <' +
          elementName +
          '>' +
          text +
          '</' +
          elementName +
          '>.',
        () => {
          let tag = this.root.querySelector(elementName);
          this.expect(tag.text.trim().length).toBeGreaterThan(0);

          let elements = this.root.querySelectorAll(elementName);
          let isTextSimilar = false;

          for (var index = 0; index < elements.length; index++) {
            if (
              elements[index].text.trim().toLowerCase() ===
              text.trim().toLowerCase()
            ) {
              isTextSimilar = true;
            }
          }

          this.expect(isTextSimilar).toEqual(true);
        },
      );
    }
  }

  elementAttributeSetToCorrectValue(
    elementName,
    attributeName,
    attributeValue,
  ) {
    this.test(
      'Make sure the <' +
        elementName +
        '> tag contains the ' +
        attributeName +
        ' attribute set to "' +
        attributeValue +
        '".',
      () => {
        let elements = this.root.querySelectorAll(elementName);
        let isAttributeSet = false;

        for (var index = 0; index < elements.length; index++) {
          let attribute = elements[index].attributes[attributeName];
          if (attribute !== undefined && attribute.trim() === attributeValue) {
            isAttributeSet = true;
          }
        }

        this.expect(isAttributeSet).toEqual(true);
      },
    );
  }
}
export = Mist;
