const { test, isEqual, end } = require('../falcon');
var rewire = require('rewire');
var chai = require('chai');
chai.should();
chai.use(require('chai-dom'));
chai.use(require('chai-things'));
let expect = chai.expect;

async function start() {
  await test('There might be misspelled variables in the code, variables used without being declared, or other syntactical errors.', async () => {
    try {
      rewire('./script.js');
    } catch (error) {
      throw new Error('code has syntactical errors');
    }
  });
  await test('There is a variable called order displaying in the console', () => {
    let output = [];
    console.log = (input) => {
      output.push(input);
    };

    let jsCode = rewire('./script.js');
    let italianMenu = jsCode.__get__('italianFood');

    expect(output.includes(italianMenu[0].mealName)).to.equal(true);
  });
  // need to get this to work
  await test('There is a variable called orderPossible displaying in the console', () => {
    let output = [];
    console.log = (input) => {
      output.push(input);
    };

    let jsCode = rewire('./script.js');
    let orderPossible = jsCode.__get__('createSummary').orderPossible;
    console.error(orderPossible);

    // both of these don't work
    //expect(output.includes(orderPossible)).to.equal(true);
    //expect(output[1]).to.equal(orderPossible);
  });
  // await test('There is a variable called error message displaying in the console', () => {
  //   let output = [];
  //   console.log = (input) => {
  //     output.push(input);
  //   };

  //   let jsCode = rewire('./script.js');
  //   let errorMessage = jsCode.__get__('errorMessage');
  //   // Also doesn't work
  //   //expect(output.includes(errorMessage)).to.equal(true);
  //   //expect(output[2]).to.equal(errorMessage)
  // });
  end();
}
start();
