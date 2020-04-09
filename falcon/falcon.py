
import json
import sys
import io

# Intercept stdout, so we can capture user output
stdoutCache = sys.stdout
sys.stdout = io.StringIO()

# The test runner summary that we add the individual test results to
summary = {
    "success": True,
    "testResults": []
}


def test(input, title, testCallback):
    try:
        testCallback(input)
    except Exception as e:
        summary["success"] = False
        summary["testResults"].append({
            "title": title,
            "passed": False,
            "error": str(e),
            "result": {
                "input": input,
                "logs": sys.stdout.getvalue()
            }
        })
    else:
        summary["testResults"].append({
            "title": title,
            "passed": True,
            "result": {
                "input": input,
                "logs": sys.stdout.getvalue()
            }
        })
    finally:
        sys.stdout = io.StringIO()


def end():
    """Ends the test runner and prints the summary"""
    sys.stdout = stdoutCache
    print(json.dumps(summary))
    exit(0)
