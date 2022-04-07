// // const { test, isEqual, end } = require('../dist/falcon');
// // const { domLoaded } = require('../async');
// // const chai = require('chai');
// // const expect = chai.expect;
// const rewire = require('rewire');
// const { test, end } = require('../dist/falcon');
// const { domLoaded } = require('../async');
// var chai = require('chai');
// chai.use(require('chai-dom'));
// const fs = require('fs');

// //look here
// async function start() {
//   await test(`Test`, async () => {
//     let dom = await domLoaded('./testrunner-examples/index5.html');
//     let script_ =
//       dom.window.document.getElementsByTagName('script')[0].innerHTML;
//     await fs.writeFileSync('./temp-script.js', script_);
//     let script = rewire('./temp-script.js');
//     let x = script.__get__('x');
//     console.errror(x);
//     expect(x).to.equal(2); //but x is 1, not 2
//   });
//   end();
// }

// start();

const { test, isEqual, end } = require('../dist/falcon');
const { domLoaded } = require('../async');
var rewire = require('rewire');
var chai = require('chai');
chai.should();
chai.use(require('chai-dom'));
chai.use(require('chai-things'));
let expect = chai.expect;

require('jsdom-global')();

async function start() {
  await test('Make sure backgroundColor property is equal to lightGray', async (_) => {
    let dom = await domLoaded('./testrunner-examples/index5.html');
    let h1 = dom.window.document.querySelector('h1');

    expect(
      dom.window.getComputedStyle(h1).getPropertyValue('background-color'),
    ).to.equal('lightGray');

    // doesnt work
    // isEqual(h1.style.backgroundColor.includes('lightGray'),true);
    // expect(el.style.color).to.be.equal(el.style.color);
    // expect(h1).to.be.equal(h1.style.backgroundColor);
    // isEqual(h1.style.backgroundColor.includes(h1.style.backgroundColor),true);
    // expect(el.style.backgroundColor).to.be.equal("lightGray");

    //also  doesn't work
    //  let elementComputedCSSProperties = [...dom.window.document
    //    .querySelector("h1"),
    //   ].map((e) => dom.window.getComputedStyle(e).getPropertyValue(
    //    "backgroundColor"));
    //  expect(elementComputedCSSProperties).to.contain.some.be.equal(
    //  "lightGray");
    // });
  });
  end();
}
start();
