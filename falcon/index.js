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

/**
We are overloading this function. It can be used with either 2 or 3 params
  * using it with 2 params means the first param is the `title` and the second is the `callback`
  * using it with 3 params means the first param is the test `input`, the second is the `title` and the third is the `callback`
 */
// Declares a test unit
const test = async (param1, param2, param3) => {
  let input;
  let title;
  let cb;
  // This check sets the function up for overloading the params. If the second param is a function, we ignore the third param
  // if the second param is not a function, we expect 3 params to be provided.
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
    await cb(input);
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
