'use strict';

const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME;
const TABLE_NAME1 = process.env.TABLE_NAME1;

module.exports.initializateDynamoClient = newDynamo => {
	dynamo = newDynamo;
};

module.exports.saveItem = student => {
	const params = {
		TableName: TABLE_NAME,
		Item: student
	};

	return dynamo
		.put(params)
		.promise()
		.then(() => {
			return student.studentId;
		});
};

module.exports.getItem = studentId => {
	const params = {
		Key: {
			studentId: studentId
		},
		TableName: TABLE_NAME
	};

	return dynamo
		.get(params)
		.promise()
		.then(result => {
			return result.Item;
		});
};

module.exports.deleteItem = studentId => {
	const params = {
		Key: {
			studentId: studentId
		},
		TableName: TABLE_NAME
	};

	return dynamo.delete(params).promise();
};

module.exports.updateItem = (studentId, paramsName, paramsValue) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			studentId
		},
		ConditionExpression: 'attribute_exists(studentId)',
		UpdateExpression: 'set ' + paramsName + ' = :v',
		ExpressionAttributeValues: {
			':v': paramsValue
		},
		ReturnValues: 'ALL_NEW'
	};

	return dynamo
		.update(params)
		.promise()
		.then(response => {
			return response.Attributes;
		});
};

module.exports.getAllStudentModels = () => {
	const params = {
    TableName: TABLE_NAME,
    Limit: 10
  };

	return dynamo
	    .scan(params)
	    .promise()
	    .then((result) => {
	      return result;
	    });
};

module.exports.getAllStudentMarks = () => {
	const params = {
    TableName: TABLE_NAME1,
    Limit: 10
  };

	return dynamo
	    .scan(params)
	    .promise()
	    .then((result) => {
	      return result;
	    });
};
