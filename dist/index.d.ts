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
    elementTextIsSet({ elementName, text, }: {
        elementName: string;
        text: string;
    }): void;
    elementAttributeSetToCorrectValue({ elementName, attributeName, attributeValue, }: {
        elementName: any;
        attributeName: any;
        attributeValue: any;
    }): void;
    getEndOfClosingTagIndexForElement({ elementName, startIndex, }: {
        elementName: string;
        startIndex: number;
    }): number;
}
declare function buildSphinx(root: any, htmlCode: string, test: any, expect: any): Sphinx;
