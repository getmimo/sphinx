import sys
import parser
# This is only required in this repository, since the test runner is in a different directory than the tests
sys.path.append("..")
from falcon import falcon

globals = {}
locals = {}
exec(open("./script_simple_variable.py").read(), globals, locals)


def helloIsTrue(input):
    actual = locals["hello"]
    falcon.isEqual(actual, input)


falcon.test(True, "The variable is True", helloIsTrue)

falcon.end()
