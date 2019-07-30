let HTMLParser = require('node-html-parser');
let sphinx = require('../../dist/index.js');

describe('test for the isTextSet implementation inside sphinx', () => {
  test('isTextSet should be false for empty paragraph', () => {
    let root = HTMLParser.parse('<html><body><p></p></body></html>');
    expect(sphinx.isTextSet(root, 'p')).toEqual(false);
  });

  test('isTextSet should be false for paragraph with spaces', () => {
    let root = HTMLParser.parse('<html><body><p>   </p></body></html>');
    expect(sphinx.isTextSet(root, 'p')).toEqual(false);
  });
  test('isTextSet should NOT be false for non-empty paragraph', () => {
    let root = HTMLParser.parse(
      '<html><body><p>hello world!</p></body></html>',
    );
    expect(sphinx.isTextSet(root, 'p')).toEqual(true);
  });
  test('isTextSet should be false for element not found', () => {
    let root = HTMLParser.parse(
      '<html><body><p>hello world!</p></body></html>',
    );
    expect(sphinx.isTextSet(root, 'img')).toEqual(false);
  });
});

describe('test for the isTextEqual implementation inside sphinx', () => {
  test('isTextEqual should be true for equal text', () => {
    let root = HTMLParser.parse('<html><body><p>hello</p></body></html>');
    expect(sphinx.isTextEqual(root, 'p', 'hello')).toEqual(true);
  });

  test('isTextEqual should NOT be true for unequal text', () => {
    let root = HTMLParser.parse('<html><body><p>not hello</p></body></html>');
    expect(sphinx.isTextEqual(root, 'p', 'hello')).toEqual(false);
  });

  test('isTextEqual should NOT be true element not found', () => {
    let root = HTMLParser.parse('<html><body><div>hello</div></body></html>');
    expect(sphinx.isTextEqual(root, 'p', 'hello')).toEqual(false);
  });
});

describe('test for the isAttributeSet implementation inside sphinx', () => {
  test('isAttributeSet should be true if the attribute is set', () => {
    let root = HTMLParser.parse(
      '<html><body><p id="paragraph">hello</p></body></html>',
    );
    expect(sphinx.isAttributeSet(root, 'p', 'id', 'paragraph')).toEqual(true);
  });
  test('isAttributeSet should be false if the attribute does not exist', () => {
    let root = HTMLParser.parse('<html><body><p>hello</p></body></html>');
    expect(sphinx.isAttributeSet(root, 'p', 'id', 'not_found')).toEqual(false);
  });

  test('isAttributeSet should be false if the attribute is set to a different value', () => {
    let root = HTMLParser.parse(
      '<html><body><p id="not_paragraph">hello</p></body></html>',
    );
    expect(sphinx.isAttributeSet(root, 'p', 'id', 'paragraph')).toEqual(false);
  });
});
