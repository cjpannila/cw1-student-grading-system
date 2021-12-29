import json

def student_handler(event, context):
    student = {"name": "John", "age": 30, "address": "Sri Lanka"}
    response = json.dumps(student)
    return {"statusCode": 200, "body": json.dumps(response)}
