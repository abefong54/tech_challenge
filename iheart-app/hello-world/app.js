// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({region: 'us-east-1'});

// Create S3 service object
s3 = new AWS.S3();


let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */


exports.lambdaHandler = async (event, context) => {
    try {
        console.log(`Hi from Node.js ${process.version} on Lambda!`);
        const data = await s3.getObject({Bucket: 'iheart-db', Key: 'songData.json'}).promise();
        let result = data.Body.toString('utf-8');

        response = {
            'statusCode': 200,
            'body': result,
            'headers': {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:3000",
            },
        }
    } catch (err) {
        response = {
            'statusCode': 500,
            'body': JSON.stringify({
                error: err,
            })
        }
        console.log(err);
        return err;
    }

    return response

};
