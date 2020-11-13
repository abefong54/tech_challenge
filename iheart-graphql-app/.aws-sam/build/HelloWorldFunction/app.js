// // Create S3 service object
// var { graphql, buildSchema } = require('graphql');

// // type RootQuery {
// //     hello: String!
// //     }
    
// //     schema {
// //         query: RootQuery
// //         mutation: RootMutation
// // }
// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`

//     type RootQuery {
//         song: Song
//     }

//     type Song {
//         song : String
//         artist : String
//         songReleaseDate : String
//         playCount : Int
//         metricA : Int
//         metricB : Int
//         metricC : Int
//         metricD : Int
//         metricE : Int
//         metricF : Int
//         metricG : Int
//         metricH : Int
//         metricI : Int
//         metricJ : Int
//         metricK : Int
//         metricL : Int
//         metricM : Int
//         metricN : Int
//         metricO : Int
//         metricP : Int
//     }

//     type Songs {
//         listOfSongs: [Song!]!
//     }
// `);
 

// const AWS = require('aws-sdk');


// // Set the Region 
// AWS.config.update({region: 'us-east-1'});
// s3 = new AWS.S3();
// let response;


// // RESOLVER : generates a response for a query
// let Songs = () => {
//     return new Promise(async function(resolve, reject) {
//         try {
//             console.log(`Hi from Node.js ${process.version} on Lambda!`);
//             const data = await s3.getObject({Bucket: 'iheart-db', Key: 'songData.json'}).promise();
//             let result = data.Body.toString('utf-8');
    
//             response = {
//                 'statusCode': 200,
//                 'body': result,
//                 'headers': {
//                     "Access-Control-Allow-Headers" : "Content-Type",
//                     "Access-Control-Allow-Origin": "http://localhost:3000",
//                 },
//             }
//         } catch (err) {
//             response = {
//                 'statusCode': 500,
//                 'body': JSON.stringify({
//                     error: err,
//                 })
//             }
//             console.log(err);
//             return err;
//         }
//         return response;
//     });
// };

// exports.lambdaHandler = (event, context, callback) => {
//     graphql(schema, '{ songs }', root).then((response) => {
//         console.log({"response": response});
//         return {response}
//     });
// };
var { graphql, buildSchema } = require('graphql');
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

    type Query {
        hello: String
        songs: {Song}
    }

    type Song {
        song : String
        artist : String
        songReleaseDate : String
        playCount : Int
        metricA : Int
        metricB : Int
        metricC : Int
        metricD : Int
        metricE : Int
        metricF : Int
        metricG : Int
        metricH : Int
        metricI : Int
        metricJ : Int
        metricK : Int
        metricL : Int
        metricM : Int
        metricN : Int
        metricO : Int
        metricP : Int
    }
`);
 
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  songs: () => {
        return new Promise(async function(resolve, reject) {
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

                console.log(result);

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
            return response['body'];
        });
    }
};
 
// Run the GraphQL query '{ hello }' and print out the response

exports.lambdaHandler = (event, context, callback) => {
    graphql(schema, '{ songs }', root).then((response) => {
      console.log(response);
    });
};