var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/search', async function(req, res, next) {
  console.log(req.body.subject);
  var adviceResponse = new Promise((resolve, reject) => {
    var options = {
      url: `https://api.adviceslip.com/advice/search/${req.body.subject}`
    }
    request(options, function(err, response, body){
      var responseJSON = JSON.parse(response.body);
      var rand = responseJSON.slips[Math.floor(Math.random() * responseJSON.slips.length)];
      resolve(rand);
    })
  })
  var advice = await adviceResponse;
  console.log(advice);
  res.render('index', { advice: advice })
})

module.exports = router;
