'use strict';

const tyrion = {
  SILENT: false,
};

// Runs every beforeEach callback in the stack
const runEveryBeforeEach = () => {
  beforeEachStack.forEach(level => level.forEach(cb => cb()));
};

// Logs a string to the console
const log = str => console.log(str);

// Keeps some counters used to print the summary after the execution of a test suite is completed
const summary = { success: [], fail: [], disabled: [] };

// The stack of beforeEach callbacks
const beforeEachStack = [[]];

// Declares a testing group
const group = (title, cb) => {
  beforeEachStack.push([]);
  cb();
  beforeEachStack.pop();
};

// Declares a test unit
const check = (input, expected, title, cb) => {
  runEveryBeforeEach();
  try {
    let result = cb(input, expected);
    summary.success.push(
      JSON.stringify({ title, expected, input, output: result }),
    );
  } catch (e) {
    summary.fail.push(
      JSON.stringify({ title, expected, input, output: e.message }),
    );
  }
};

// Disables a test unit
const xcheck = (title, cb) => {
  summary.disabled++;
};

// Prints the test summary and finishes the process with the appropriate exit code
const end = () => {
  log(`${JSON.stringify(summary)}`);

  if (summary.fail > 0) process.exit(1);
  process.exit(0);
};

// A dead simple (and not human-proof) implementation of the beforeAll function
const beforeAll = cb => cb();

// A simple and functional beforeEach implementation
const beforeEach = cb => {
  beforeEachStack[beforeEachStack.length - 1].push(cb);
};

// Exports Tyrion's DSL
const dsl = {
  check,
  xcheck,
  end,
  group,
  beforeEach,
  beforeAll,
  summary,
};
module.exports = Object.assign(tyrion, dsl);
