'use strict';

const databaseManager = require('./databaseManager');
const https = require('https');
let url = "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html";

exports.studentService =  function(event, context, callback) {
  console.log("test message studentService");
  https.get(url, (res) => {
    callback(null, res.statusCode)
  }).on('error', (e) => {
    callback(Error(e))
  })
}

exports.modelSearchService = async (event) => {
	return getCarModel(event);
}

exports.priceRetrievalService = async function (event){
	return getCarPrice(event);
}


exports.optionsRetrievalService = async function(event){
	return getCarOptions(event);
}


function getCarOptions(event) {
	const itemId = event.pathParameters.itemId;
	return databaseManager.getItem(itemId).then(response => {
		console.log(response);
		return sendResponse(200, JSON.stringify(response.options));
	});
}

function getCarPrice(event) {
	const itemId = event.pathParameters.itemId;
	return databaseManager.getItem(itemId).then(response => {
		console.log(response);
		return sendResponse(200, JSON.stringify(response.price));
	});
}

function getCarModel(event) {
	const modelName = event.pathParameters.modelName;
	return databaseManager.getAllCarModels().then(response => {
		let item = null;
		response.Items.forEach(element => {
			if(element.name.toLowerCase() === modelName.toLowerCase()){
				item = element;
			}
		});
		return sendResponse(200, JSON.stringify(item));
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
