declare const $: any;
declare const jsdom: any;
declare const JSDOM: any;
declare let path: any;
declare class Sphinx {
    private code;
    private root;
    private test;
    private expect;
    constructor(root: any, code: string, test: any, expect: any);
    /**
     * Test if the element with a specified elementName exists, starting from the searchIndex
     */
    elementExists({ elementName, startIndex, }: {
        elementName: string;
        startIndex: number;
    }): void;
    /**
     * Test if the element with a specified elementName exists and is empty, starting from the searchIndex
     */
    emptyElementExists({ elementName, startIndex, }: {
        elementName: string;
        startIndex: number;
    }): void;
    firstElementIsInsideSecond({ firstElementName, secondElementName, }: {
        firstElementName: string;
        secondElementName: string;
    }): void;
    firstElementIsInsideSecondAll({ firstElementName, secondElementName, }: {
        firstElementName: string;
        secondElementName: string;
    }): void;
    elementTextIsSet({ elementName, text, }: {
        elementName: string;
        text: string;
    }): void;
    elementTextIsSetAll({ elementName, text, }: {
        elementName: string;
        text: string;
    }): void;
    elementTextIsSetLoose({ elementName, text, }: {
        elementName: string;
        text: string;
    }): void;
    elementTextIsSetLooseAll({ elementName, text, }: {
        elementName: string;
        text: string;
    }): void;
    elementAttributeSetToCorrectValue({ elementName, attributeName, attributeValue, }: {
        elementName: any;
        attributeName: any;
        attributeValue: any;
    }): void;
    elementCSSPropertySet({ elementSelector, propertyName, propertyValue, }: {
        elementSelector: string;
        propertyName: string;
        propertyValue: string;
    }): void;
    /**
     *
     *
     * @param param0
     */
    elementCSSPropertySetWithCustomPropertyValue({ elementSelector, propertyName, propertyValue, customPropertyValue, }: {
        elementSelector: string;
        propertyName: string;
        propertyValue: string;
        customPropertyValue: string;
    }): void;
    getEndOfClosingTagIndexForElement({ elementName, startIndex, }: {
        elementName: string;
        startIndex: number;
    }): number;
}
declare function isTextSet(root: any, elementName: any): boolean;
declare function isTextEqual(root: any, elementName: any, text: any): boolean;
declare function isTextSimilar(root: any, elementName: any, text: any): any;
declare function isAttributeSet(root: any, elementName: any, attributeName: any, attributeValue: any): boolean;
declare function buildSphinx(root: any, htmlCode: string, test: any, expect: any): Sphinx;
declare function buildSphinxWithJSDOM(test: any, expect: any): Sphinx;
declare function domLoaded(file: any): Promise<any>;
