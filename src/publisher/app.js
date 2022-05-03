/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

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

// The Lambda handler
exports.handler = async (event) => {
  // Params object for SQS
  //Nothing fancy, single message group, get clever and add more!
  const params = {
    MessageGroupId: `group-A`,
    MessageDeduplicationId: `m-A-1`,
    MessageBody: `Message at ${Date()}`,
    QueueUrl: process.env.SQSqueueName
  }

  // Send to SQS
  const result = await sqs.sendMessage(params).promise()
  console.log(result)

  try {
    // const ret = await axios(url);
    response = {
      'statusCode': 200,
      'body': JSON.stringify({
        message: 'hello world',
        // location: ret.data.trim()
      })
    }
  } catch (err) {
    console.log(err);
    return err;
  }

  return response
}