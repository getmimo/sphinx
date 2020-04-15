import sys
import parser
# This is only required in this repository, since the test runner is in a different directory than the tests
sys.path.append("..")
from falcon import falcon

globals = {}
locals = {}
exec(open("./script_function.py").read(), globals, locals)


def testReturnsDouble(input):
    actual = locals["returnDouble"](input)
    falcon.isEqual(actual, input * 2)


falcon.test(1, "The function returns 2", testReturnsDouble)
falcon.test(2, "The function returns 4", testReturnsDouble)
falcon.test(3, "The function returns 6", testReturnsDouble)

falcon.end()
