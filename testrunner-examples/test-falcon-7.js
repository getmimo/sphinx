const { test, end } = require('../dist/falcon');
const { domLoaded } = require('../async');
var chai = require('chai');
chai.should();
chai.use(require('chai-dom'));
chai.use(require('chai-things'));
let expect = chai.expect;

async function start() {
  await test("Make sure to find the input elements and assign the type to 'password''", async (_) => {
    let dom = await domLoaded('./testrunner-examples/index7.html');
    expect(1).to.equal(1);
  });
  end();
}
start();
