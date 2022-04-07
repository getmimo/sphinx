const { test, isEqual, end } = require('../dist/falcon');
const { domLoaded } = require('../async');
var chai = require('chai');
chai.should();
chai.use(require('chai-dom'));
chai.use(require('chai-things'));
let expect = chai.expect;
let fs = require('fs');
let userCode = fs.readFileSync('./testrunner-examples/index6.html', 'utf8');
//Load JS just like above
//I should be able to reference this from one of my other projects
// const cleanup = require('jsdom-global')(userCode);
var rewire = require('rewire');

/*
async function start() {
  await test('There might be misspelled variables in the code, variables used without being declared, or other syntactical errors.', async () => {
    const cleanup = require('jsdom-global')(userCode);
    try {
      rewire('./script6.js');
    } catch (error) {
      throw new Error('code has syntactical errors');
    }
    cleanup();
  });

  await test('The function getValue() exists', async () => {
    const cleanup = require('jsdom-global')(userCode);
    let jsCode = rewire('./script6.js');
    //if getValue doesn't exist, the next line will throw an error and the test will fail
    let getValue = jsCode.__get__('getValue');
    cleanup();
  });

  // await test(//Overall, we:
  // //- Import index.html
  // //- Locate and invoke function
  // //- Check if innerHTML value is true
  // "Make sure that getElementById is targeting the 'select-value' id", async (_) => {
  //   //This loads index.html
  //   let dom = await domLoaded('./testrunner-examples/index6.html');
  //   let select = dom.window.document.getElementsByTagName('select')[0];
  //   let jsCode = rewire('./script6.js');
  //   let onchangeValue = jsCode.__get__('getValue');
  //   //If you're working with an event listener
  //   //Click event would need to be mocked, but not all are easy
  //   //Invoking the function mocks the event
  //   onchangeValue();
  //   let employmentStatus =
  //     dom.window.document.getElementById('employment-status');
  //   //This expression equals true
  //   isEqual(employmentStatus.innerHTML.includes(select.value), true);
  //   //v This was not the solution:
  //   //expect(employmentStatus.innerHTML).to.inc(
  //   //`Please select employment status: ${select.value}`);
  // });

  //v This doesn't work:
  // await test(
  // "Make sure the color is set to the correct value",
  // async (_) => {
  //  //This loads index.html
  //   let dom = await domLoaded('index.html');
  //   let select = dom.window.document.getElementsByTagName('select')[0];
  //   let jsCode = rewire('./testrunner-examples/script6.js');
  //   let onchangeValue = jsCode.__get__('getValue');
  //   //If you're working with an event listener
  //   //Click event would need to be mocked, but not all are easy
  //   //Invoking the function mocks the event
  //   onchangeValue();
  //   let employmentStatus = dom.window.document.getElementById(
  //     'employment-status');
  //     //v This was not the solution:
  //     expect(employmentStatus.style.color).to.inc("#62d76b");
  // });

  await test('Make sure the color is set to the correct value', async () => {
    // let dom = await domLoaded('./testrunner-examples/index6.html');
    const cleanup = require('jsdom-global')(userCode);
    let jsCode = rewire('./script6.js');
    let getValue = jsCode.__get__('getValue');

    getValue();

    const heading = document.getElementById('employment-status');
    const color = window.getComputedStyle(heading).getPropertyValue('color');
    // let elementComputedCSSProperties = [
    //   ...dom.window.document.querySelectorAll('#employment-status'),
    // ].map((e) => dom.window.getComputedStyle(e).getPropertyValue('color'));
    //expect(elementComputedCSSProperties).to.contain.some.be.equal('rgb(98, 215, 107)');
    isEqual(color, 'rgb(98, 215, 107)');
    cleanup();
  });

  await test('Make sure that selectBool equals true', async () => {
    const cleanup = require('jsdom-global')(userCode);
    let jsCode = rewire('./script6.js');
    //v This was for a rewire test that didn't work
    // let selectBool = jsCode.__get__('selectBool');
    let func = jsCode.__get__('getValue');
    const funcToString = func.toString();
    const removeSpaces = funcToString.replace(/\s/g, '');
    let test = removeSpaces.indexOf('selectBool=true') > -1;
    isEqual(test, true);
    cleanup();
    //v This doesn't work:
    // isEqual(selectBool, false);
    // sumUp();
    // isEqual(selectBool, true)
    //NOTE:
    //Test as string - load code as string
    //If a function isn't automatically called, it's going to be more difficult to test
    //Test this as a string and not rewire. Rewire doesn't hold a reference.
  });

  await test('Make sure that selectBool equals true', async () => {
    const cleanup = require('jsdom-global')(userCode);
    let jsCode = rewire('./script6.js');
    //v This was for a rewire test that didn't work
    // let selectBool = jsCode.__get__('selectBool');
    let func = jsCode.__get__('getValue');
    expect(document.querySelectorAll('h6').length).to.equal(1);
    cleanup();
  });

  //REFERENCE
  // test("", "Function expression exists.", _ => {
  // let jsCode = rewire("./testrunner-examples/script6.js");
  // element = jsCode.__get__("getValue");
  // const func = element.toString().toLowerCase();
  // const noSpaces = func.replace(/\s/g, '');
  // let test = noSpaces.indexOf("init+(init*(rate/100)*time)") > -1;
  // isEqual(test, true);
  // });

  end();
}
start();
*/

async function start() {
  await test('Make sure the color is set to the correct value', async () => {
    const cleanup = require('jsdom-global')(userCode);
    // let dom = await domLoaded('./testrunner-examples/index6.html');
    let select = document.getElementsByTagName('select')[0];
    let jsCode = rewire('./script6.js');
    let onchangeValue = jsCode.__get__('getValue');
    select.value = 'temporary';
    //If you're working with an event listener
    //Click event would need to be mocked, but not all are easy
    //Invoking the function mocks the event
    onchangeValue();
    let employmentStatus = document.getElementById('employment-status');
    //This expression equals true
    isEqual(employmentStatus.innerHTML.includes(select.value), true);
    cleanup();
  });
  // await test('Make sure the color is set to the correct value', async () => {
  //   // let dom = await domLoaded('./testrunner-examples/index6.html');
  //   let jsCode = rewire('./script6.js');
  //   let getValue = jsCode.__get__('getValue');

  //   getValue();

  //   console.error(document.getElementById('employment-status'));

  //   let elementComputedCSSProperties = [
  //     ...dom.window.document.querySelectorAll('#employment-status'),
  //   ].map((e) => dom.window.getComputedStyle(e).getPropertyValue('color'));
  //   //expect(elementComputedCSSProperties).to.contain.some.be.equal('rgb(98, 215, 107)');
  //   isEqual(elementComputedCSSProperties.includes('rgb(98, 215, 107)'));
  // });
  end();
}
start();
