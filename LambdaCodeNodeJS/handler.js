'use strict';

const databaseManager = require('./databaseManager');

exports.studentService =  function(event, context, callback) {
  console.log("test studentService");
  const response = {
    statusCode: 200,
    body: JSON.stringify("test success response"),
    headers: {'Content-Type': 'application/json'}
  };
  callback(null, response);
}

exports.studentSearchService = async (event) => {
  return getStudentModel(event);
}

function getStudentModel(event) {
  const studentName = event.pathParameters.studentName;
  return databaseManager.getAllStudentModels().then(response => {
    let student = null;
    response.Items.forEach(element => {
      if(element.name.toLowerCase() === studentName.toLowerCase()){
        student = element;
      }
    });
  return sendResponse(200, JSON.stringify(student));
});
}  

function sendResponse(statusCode, message) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message),
    headers: {'Content-Type': 'application/json'}
  };
  return response;
}
