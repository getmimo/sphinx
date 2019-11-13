'use strict';
const deepEqual = require('deep-equal');

// The stack of beforeEach callbacks
const beforeEachStack = [[]];
// Runs every beforeEach callback in the stack
const runEveryBeforeEach = () => {
  beforeEachStack.forEach(level => level.forEach(cb => cb()));
};
const beforeEach = cb => {
  beforeEachStack[beforeEachStack.length - 1].push(cb);
};

// Keeps some counters used to print the summary after the execution of a test suite is completed
const summary = { success: true, testResults: [] };
let tempResult = {};

// Declares a test unit
const test = (input, title, cb) => {
  runEveryBeforeEach();
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
    });
    tempResult = {};
  }
};

// Prints the test summary and finishes the process with the appropriate exit code
const end = () => {
  console.log(`${JSON.stringify(summary)}`);
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
