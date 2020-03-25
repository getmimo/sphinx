const $ = require('jquery');
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
        this.test("Make sure there's an opening " +
            elementName +
            ' tag, <' +
            elementName +
            '>.', () => {
            let openingTagIndex = this.code.indexOf('<' + elementName, startIndex);
            this.expect(openingTagIndex).toBeGreaterThan(0);
        });
        this.test("Make sure there's a closing " +
            elementName +
            ' tag, </' +
            elementName +
            '>.', () => {
            let closingTagIndex = this.code.indexOf('</' + elementName + '>', startIndex);
            this.expect(closingTagIndex).toBeGreaterThan(0);
        });
        this.test('Make sure there are opening and closing ' +
            elementName +
            ' tags, <' +
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
        this.test("Make there's an opening " + elementName + ' tag, <' + elementName + '>.', () => {
            let openingTagIndex = this.code.indexOf('<' + elementName, startIndex);
            this.expect(openingTagIndex).toBeGreaterThan(0);
        });
    }
    firstElementIsInsideSecond({ firstElementName, secondElementName, }) {
        this.test('Make sure the ' +
            firstElementName +
            ' is inside the ' +
            secondElementName +
            ' element.', () => {
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
            this.test('Make sure to place ' +
                text +
                ' inside the ' +
                elementName +
                ' element.', () => {
                let tag = this.root.querySelector(elementName);
                this.expect(tag.text.trim().length).toBeGreaterThan(0);
                this.expect(isTextEqual(this.root, elementName, text)).toEqual(true);
            });
        }
    }
    elementTextIsSetLoose({ elementName, text, }) {
        this.test('Make sure to place text between the ' + elementName + ' tags.', () => {
            let tag = this.root.querySelector(elementName);
            this.expect(tag.text.trim().length).toBeGreaterThan(0);
            this.expect(isTextSet(this.root, elementName)).toEqual(true);
        });
        if (text !== undefined) {
            this.test('Make sure to place ' +
                text +
                ' inside the ' +
                elementName +
                ' element.', () => {
                let tag = this.root.querySelector(elementName);
                this.expect(tag.text.trim().length).toBeGreaterThan(0);
                this.expect(isTextSimilar(this.root, elementName, text)).toEqual(true);
            });
        }
    }
    elementAttributeSetToCorrectValue({ elementName, attributeName, attributeValue, }) {
        this.test('Make sure the opening ' +
            elementName +
            ' tag contains a ' +
            attributeName +
            ' attribute with the value "' +
            attributeValue +
            '".', () => {
            this.expect(isAttributeSet(this.root, elementName, attributeName, attributeValue)).toEqual(true);
        });
    }
    elementCSSPropertySet({ elementSelector, propertyName, propertyValue, }) {
        this.test(`Make sure to set the ${propertyName} property to ${propertyValue} for the ${elementSelector} selector.'`, () => {
            let element = $(elementSelector);
            this.expect(element.length).toBeGreaterThan(0);
            this.expect($(element).css(propertyName)).toBe(propertyValue);
        });
    }
    /**
     *
     *
     * @param param0
     */
    elementCSSPropertySetWithCustomPropertyValue({ elementSelector, propertyName, propertyValue, customPropertyValue, }) {
        this.test(`Make sure to set the ${propertyName} property to ${customPropertyValue} for the ${elementSelector} selector.'`, () => {
            let element = $(elementSelector);
            this.expect(element.length).toBeGreaterThan(0);
            this.expect($(element).css(propertyName)).toBe(propertyValue);
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
function isTextSimilar(root, elementName, text) {
    let elements = root.querySelectorAll(elementName);
    let isTextSimilar = true;
    for (var index = 0; index < elements.length; index++) {
        let sampleTextArray = text
            .trim()
            .toLowerCase()
            .split(' ');
        let elementText = elements[index].text.trim().toLowerCase();
        for (let i = 0; i < sampleTextArray.length; i++) {
            if (!elementText.includes(sampleTextArray[i])) {
                isTextSimilar = false;
                break;
            }
        }
    }
    return isTextSimilar;
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
function buildSphinxWithJSDOM(test, expect) {
    return new Sphinx(undefined, undefined, test, expect);
}
module.exports = {
    buildSphinx: buildSphinx,
    buildSphinxWithJSDOM: buildSphinxWithJSDOM,
    isTextSet: isTextSet,
    isTextEqual: isTextEqual,
    isTextSimilar: isTextSimilar,
    isAttributeSet: isAttributeSet,
};
//# sourceMappingURL=index.js.map