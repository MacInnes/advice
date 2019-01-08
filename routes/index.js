var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/search', async function(req, res, next) {
  var adviceResponse = new Promise((resolve, reject) => {
    var options = {
      url: `https://api.adviceslip.com/advice/search/${req.body.subject}`
    }
    request(options, function(err, response, body){
      var responseJSON = JSON.parse(response.body);
      if (responseJSON.slips){
        var rand = responseJSON.slips[Math.floor(Math.random() * responseJSON.slips.length)];
        resolve(rand);
      } else {
        res.render('index', { advice: "No advice found for that subject, please try again!" })
      }
    })
  })
  var advice = await adviceResponse;
  res.render('index', { advice: advice.advice })
})

module.exports = router;
