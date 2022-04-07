// DONT REMOVE BEGINNING
const { test, end } = require('../dist/falcon');
const { domLoaded } = require('../async');
var chai = require('chai');
chai.use(require('chai-dom'));
let fs = require('fs');
let userCode = fs.readFileSync('./testrunner-examples/index3.html', 'utf8');
// this.jsdom = require('jsdom-global')(userCode);
// DONT REMOVE END

let elementSelector = '.container';
let propertyName = 'display';
let propertyValue = 'flex';

// test(`Make sure to set the ${propertyName} property to ${propertyValue} for the ${elementSelector} selector.'`, () => {
//   console.error(document.querySelectorAll('.container').length);
//   let elementComputedCSSProperties = [
//     ...document.querySelectorAll('.container'),
//   ].map((e) => window.getComputedStyle(e).getPropertyValue('display'));
//   console.error(elementComputedCSSProperties);
//   chai.expect(elementComputedCSSProperties[0]).to.equal('flex');
// });

// end();

// async function start() {
//   await test(`Make sure to set the color property to purple for the h1 selector.'`, async () => {
//     let dom = await domLoaded('./testrunner-examples/index3.html');
//     // console.error(dom.window.document.querySelectorAll('.container').length);
//     let elementComputedCSSProperties = [
//       ...dom.window.document.querySelectorAll('.container'),
//     ].map((e) => dom.window.getComputedStyle(e).getPropertyValue('display'));
//     // console.error(elementComputedCSSProperties);
//     chai.expect(elementComputedCSSProperties[0]).to.equal('flex');
//   });

//   await test(`Make sure to set the ${propertyName} property to ${propertyValue} for the ${elementSelector} selector.`, async () => {
//     let dom = await domLoaded('./testrunner-examples/index3.html');
//     let element = dom.window.document.getElementsByClassName('container')[0];
//     console.error(element);
//     let elementStyle = dom.window
//       .getComputedStyle(element)
//       .getPropertyValue('display');
//     console.error(elementStyle);
//     chai.expect(elementStyle).to.equal('flex');
//   });
//   end();
// }
async function start() {
  await test(`Make sure to set the color property to purple for the h1 selector.'`, async () => {
    let dom = await domLoaded('./testrunner-examples/index3.html');
    console.error(userCode.split('</html>')[1]);
  });
  end();
}

start();
