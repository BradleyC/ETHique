var axios = require('axios');
var Twit = require('twit');

const MAXPOSTS = 100

exports.handler = async (event) => {
  var keyError;
  console.log(event);
  // console.log(event.requestContext.authorizer.handle);
  // var handle = event.requestContext.authorizer.handle;
  // var body = JSON.parse(event.body);

  // Check user entry in lookup table for conditionals below.
  if (event.queryStringParameters.action === 'favorite') {
    var data = await likeStatus(event)
      .catch(error => {
        console.log(error);
        keyError = true;
      });
    if (keyError) return genResponse(400, 'Error accessing Twitter API');
    // console.log(data);

    return genResponse(200, data);
  }
  return genResponse(400, 'params needs to have statusId and action');
};

function genResponse(statusCode, body) {
  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: statusCode,
    body: JSON.stringify(body)
  };
  return response;
}
/** 
 * Starting with this endpoint. Returns most recent tweets for user and followed:
 * https://api.twitter.com/1.1/statuses/home_timeline.json
 * relevant params: count, since_id, exclude_replies
 */
function likeStatus(event) {
  var T = new Twit({
    consumer_key:         process.env.API_KEY,
    consumer_secret:      process.env.API_SECRET,
    access_token:         event.headers.oauth_token,
    access_token_secret:  event.headers.oauth_consumer_key,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    // strictSSL:            true,     // optional - requires SSL certificates to be valid.
  });
  var params = { id: event.queryStringParameters.statusId };
  return new Promise(async (resolve, reject) => {
    // T.get('search/tweets', { q: 'ethereum since:2019-03-01', count: 20 }, function(err, data, response) {
    T.post('favorites/create', params, function(err, data, response) {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      console.log(data)
      resolve(data)
    });
  });

function retweet(event) {
  var T = new Twit({
    consumer_key:         process.env.API_KEY,
    consumer_secret:      process.env.API_SECRET,
    access_token:         event.headers.oauth_token,
    access_token_secret:  event.headers.oauth_consumer_key,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    // strictSSL:            true,     // optional - requires SSL certificates to be valid.
  });
  var params = { id: event.queryStringParameters.statusId };
  return new Promise(async (resolve, reject) => {
    T.post('statuses/retweet/:id', params, function(err, data, response) {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      console.log(data)
      resolve(data)
    });
  });
}
