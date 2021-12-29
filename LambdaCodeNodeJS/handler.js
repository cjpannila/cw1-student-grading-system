'use strict';

exports.studentService = async (event) => {
    student = { name: "Johnx", age: 31, city: "New York1" };
    return {statusCode: 200, body: JSON.stringify(student)}
}

function sendResponse(statusCode, message) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message),
    headers: {}
  };
  return response;
}
