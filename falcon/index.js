'use strict';
const deepEqual = require('deep-equal');

// The stack of beforeEach callbacks
const beforeEachStack = [[]];
// Runs every beforeEach callback in the stack
const runEveryBeforeEach = () => {
  beforeEachStack.forEach((level) => level.forEach((cb) => cb()));
};
const beforeEach = (cb) => {
  beforeEachStack[beforeEachStack.length - 1].push(cb);
};

// Keeps some counters used to print the summary after the execution of a test suite is completed
const summary = { success: true, testResults: [] };
let tempResult = { logs: '' };

let consoleLogCache = console.log;
console.log = (input) => {
  tempResult.logs =
    tempResult.logs === '' ? input + '' : tempResult.logs + '\n' + input;
};

// Declares a test unit
const test = (param1, param2, param3) => {
  let input;
  let title;
  let cb;
  if (typeof param2 == 'function') {
    title = param1;
    cb = param2;
  } else {
    input = param1;
    title = param2;
    cb = param3;
  }
  runEveryBeforeEach();
  tempResult = { logs: '' };
  tempResult.input = input;
  try {
    cb(input);
    summary.testResults.push({
      title,
      passed: true,
      result: tempResult,
    });
    tempResult = {};
  } catch (e) {
    summary.success = false;
    summary.testResults.push({
      title,
      passed: false,
      result: tempResult,
      error: e.message,
    });
    tempResult = {};
  }
};

// Prints the test summary and finishes the process with the appropriate exit code
const end = () => {
  consoleLogCache(`${JSON.stringify(summary)}`);
  if (summary.fail > 0) process.exit(1);
  process.exit(0);
};

// ASSERTIONS

const isEqual = (actual, expected) => {
  tempResult.actual = actual;
  tempResult.expected = expected;
  if (!deepEqual(actual, expected)) {
    throw Error(actual);
  }
  return actual;
};

module.exports = {
  test,
  end,
  beforeEach,
  summary,
  isEqual,
};
