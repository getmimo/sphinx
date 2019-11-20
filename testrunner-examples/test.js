const { test, isEqual, end } = require('../falcon');
var rewire = require('rewire');

let jsCode = rewire('./script.js');
reverse = jsCode.__get__('reverse');

test([1,2,3,4,5],'Test 1', input => {
  let result = reverse(input);
  isEqual(result, [5,4,3,2,1])
});

test([8,10,2,27],'Test 2', input => {
  let result = reverse(input);
  isEqual(result, [27,2,10,8])
});

end();