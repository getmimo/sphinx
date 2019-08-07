class Sphinx {
    constructor(root, code, test, expect) {
        this.code = code;
        this.root = root;
        this.test = test;
        this.expect = expect;
    }
    /**
     * Test if the element with a specified elementName exists, starting from the searchIndex
     */
    elementExists({ elementName, startIndex, }) {
        this.test('Make sure to create the opening ' +
            elementName +
            ' tag with: <' +
            elementName +
            '>.', () => {
            let openingTagIndex = this.code.indexOf('<' + elementName, startIndex);
            this.expect(openingTagIndex).toBeGreaterThan(0);
        });
        this.test('Make sure to create the closing ' +
            elementName +
            ' tag with: </' +
            elementName +
            '>.', () => {
            let closingTagIndex = this.code.indexOf('</' + elementName + '>', startIndex);
            this.expect(closingTagIndex).toBeGreaterThan(0);
        });
        this.test('Make sure to put the opening and closing tags in their correct places: <' +
            elementName +
            '></' +
            elementName +
            '>.', () => {
            let openingTagIndex = this.code.indexOf('<' + elementName, startIndex);
            let closingTagIndex = this.code.indexOf('</' + elementName + '>', startIndex);
            this.expect(closingTagIndex - openingTagIndex).toBeGreaterThan(0);
        });
    }
    /**
     * Test if the element with a specified elementName exists and is empty, starting from the searchIndex
     */
    emptyElementExists({ elementName, startIndex, }) {
        this.test('Make sure to create the ' +
            elementName +
            ' tag with: <' +
            elementName +
            '/>.', () => {
            let openingTagIndex = this.code.indexOf('<' + elementName, startIndex);
            this.expect(openingTagIndex).toBeGreaterThan(0);
        });
    }
    firstElementIsInsideSecond({ firstElementName, secondElementName, }) {
        this.test('Make sure to place the <' +
            firstElementName +
            '></' +
            firstElementName +
            '> tags inside the <' +
            secondElementName +
            '></' +
            secondElementName +
            '> tags.', () => {
            let outerElement = this.root.querySelector(secondElementName);
            let innerElement = outerElement.querySelectorAll(firstElementName);
            this.expect(innerElement.length).toBeGreaterThan(0);
        });
    }
    elementTextIsSet({ elementName, text, }) {
        this.test('Make sure to place text between the ' + elementName + ' tags.', () => {
            let tag = this.root.querySelector(elementName);
            this.expect(tag.text.trim().length).toBeGreaterThan(0);
            this.expect(isTextSet(this.root, elementName)).toEqual(true);
        });
        if (text !== undefined) {
            this.test('Make sure to place the correct text between the ' +
                elementName +
                ' tags: <' +
                elementName +
                '>' +
                text +
                '</' +
                elementName +
                '>.', () => {
                let tag = this.root.querySelector(elementName);
                this.expect(tag.text.trim().length).toBeGreaterThan(0);
                this.expect(isTextEqual(this.root, elementName, text)).toEqual(true);
            });
        }
    }
    elementAttributeSetToCorrectValue({ elementName, attributeName, attributeValue, }) {
        this.test('Make sure the <' +
            elementName +
            '> tag contains the ' +
            attributeName +
            ' attribute set to "' +
            attributeValue +
            '".', () => {
            this.expect(isAttributeSet(this.root, elementName, attributeName, attributeValue)).toEqual(true);
        });
    }
    getEndOfClosingTagIndexForElement({ elementName, startIndex, }) {
        let searchIndex = startIndex;
        if (searchIndex === undefined) {
            searchIndex = 0;
        }
        let closingTagIndex = this.code.indexOf('</' + elementName + '>', startIndex);
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
        if (elements[index].text.trim().toLowerCase() === text.trim().toLowerCase()) {
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
function buildSphinx(root, htmlCode, test, expect) {
    return new Sphinx(root, htmlCode, test, expect);
}
module.exports = {
    buildSphinx: buildSphinx,
    isTextSet: isTextSet,
    isTextEqual: isTextEqual,
    isAttributeSet: isAttributeSet,
};
//# sourceMappingURL=index.js.map