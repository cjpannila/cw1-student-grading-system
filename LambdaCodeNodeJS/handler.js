'use strict';

exports.studentService = async (event) => {
  students = [{"studentName": "test1"},{"studentName": "test2"},{"studentName": "test3"}];
  return sendResponse(200, JSON.stringify(students));
}

function sendResponse(statusCode, message) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message),
    headers: {}
  };
  return response;
}
