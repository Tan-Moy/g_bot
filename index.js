var Twit = require('twit');
var fs = require('fs');


var T = new Twit({
  consumer_key:         process.env.consumer_key,
  consumer_secret:      process.env.consumer_secret,
  access_token:         process.env.access_token,
  access_token_secret:  process.env.access_token_secret,
  // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//
// post a tweet with media
//
function tweet(){
    var b64content = fs.readFileSync('googleiphone.png', { encoding: 'base64' })

    // first we must post the media to Twitter
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      var mediaIdStr = data.media_id_string
      var altText = "Google mocking Iphone for lacking a headphone jack."
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

      T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // now we can reference the media and post a tweet (media will attach to the tweet)
          var params = { status: '@madebygoogle Remember this??!! #Google #GooglePixel2', media_ids: [mediaIdStr] }

          T.post('statuses/update', params, function (err, data, response) {
            console.log(data)
          })
        }
      })
    })
}
console.log('Started!!!');
console.log(T);
//setInterval(tweet, 43200000);
