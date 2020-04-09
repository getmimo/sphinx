
import json
import sys
import io

stdout = sys.stdout
sys.stdout = io.StringIO()

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
    sys.stdout = stdout
    print(json.dumps(summary))
