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

let file = "https://iheart-db.s3.us-east-1.amazonaws.com/songData.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLWVhc3QtMSJHMEUCIDoH96SJ0tMD6jIUnpdJPHhZQN5NUDcPuxMIQ7pLgzv3AiEAr1U8Bzb%2F4zsD0shjHlFRqzM%2BcBwmssQfeC%2BNPQ9ZFxAqzQIIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2MzQxNDA3MTcwOTQiDLOcDSwJ4jUGnWgbsCqhAuTDYJmPGcdapdieUebr0jP0r9qyTZuDOKzhc5XgalaDrd1e6gFRMxlJEnjZD7PqqlrF%2BwpTMaTfWoyeMlgHZ9TwD%2Fqfy2GyuY%2Bs32IWusJStspduYKg%2B%2FvXIIMBBBoL2ZvxhGCbUsgXkOptdRHJNfd5HzfgyrWTdKltWGHgFXe9b4rnhlnjCw4K0blVCO1%2BbGge5%2FL2bVk7pIavnMu5VqxH76qHZTkQR7PnNq7uJGOuyiqx1gujJWFC0wVdVVcWLsFqYf1KuhprwP6M%2BeYtnHbUlhdtDLjyKn9fzsgp%2F89%2FXEBwCCP7Gh%2F7HYvaOT%2BdUhfWpnf8ALUbRzLg1eD09lM3uZzxvzm%2Bp0aJAPwmiN4tdrte4GyLmkvupFh9xSruYYMwjIKu%2FQU6sAItdnOTMvS5xKI%2BxBr1aLuKMLCtAktECQ82DM9v6bB6%2FSju6rfxenVkMV2KEN2JlpAXsRG8QNZFnfxA6XDLZzqirQQigzOFK9HZ2%2F%2Fu3VF4DoNr%2BFcNYptzpOqvUg1Ovn3wpnsrZhJ8lJPb44ZdH%2F9YQ1JqQopT4bsbyY1uabpjwGxmPYqP8aPnY84jGn8LgLCbj3Nu3TA1%2FKsxz2xHIHhrKIarVYnBhyf%2BiJ8nTyuqtCS7ROea8Lx8pf4CyeYmScOqh4WIBI0atpz5afMNF%2FuPE2dAyWJGvGZwpTSxqoa3oRJrqjmi5pQ0EWFGJwzZNkYiORFAIHRAYRpb9r91EG4PFoPa1PDr%2BViwxVR9Z192lhEC23cL8G%2FnpcNmJ9YIh5ENgv1tmzJn3YKrvAf6XDUn&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201111T075433Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZHJN3OATFBQD7ENE%2F20201111%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7f5db0a2051e5552890a0ad4a9be415fe25a8114bf345e199a1ab9f9ad2ff2f1"

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
