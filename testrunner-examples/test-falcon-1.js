const { test, end } = require('../falcon');
const chai = require('chai');
chai.should();
chai.use(require('chai-dom'));
chai.use(require('chai-things'));
let expect = chai.expect;
const fs = require('fs');

const userCode = fs.readFileSync('./testrunner-examples/index.html', 'utf8');
require('jsdom-global')(userCode);

test("Make sure there's an html tag in index.html.", (_) => {
  // console.error(document);
  // console.error('hello', 'world');
  // console.error('serialize', document.serialize());
  // console.error(dom.serialize());
  // chai.expect(document.serialize()).to.include('html');
  const user = {
    id: 101,
    email: 'jack@dev.com',
    personalInfo: {
      name: 'Jack',
      address: [
        {
          line1: 'westwish st',
          line2: 'washmasher',
          city: 'wallas',
          state: 'WX',
        },
      ],
    },
  };
  const h3 = document.getElementsByTagName('h3');
  console.error(h3[0].style);
  console.error('hello world');
  console.error('hello world\nnewline');
  console.error(user);
  expect(h3.length).to.equal(1);
});

end();
