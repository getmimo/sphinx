const { test, isEqual, end } = require('../peregrine-falcon');
var rewire = require('rewire');

let jsCode = rewire('./script.js');
add2 = jsCode.__get__('add2');

test(2, '2 + 2 = 4', input => {
  let result = add2(input);
  isEqual(result, 4);
});

test(4, '4 + 2 = 6', input => {
  let result = add2(input);
  isEqual(result, 6);
});
end();
