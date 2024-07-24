var express = require('express');
var router = express.Router();
var axios = require("axios")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/selectedtrivia', async function(req, res){
  let  numberOfQuestionsInput = req.query.numberOfQuestionsInput;
  let difficultyInput = req.query.difficultyInput;
  let typeInput = req.query.typeInput;
  const questions = await axios.get(`https://opentdb.com/api.php?amount=${numberOfQuestionsInput}&category=${9}&difficulty=${difficultyInput}&type=multiple`);
  res.render('quiz', {questionsArray: questions.data.results});
});
 

module.exports = router;
