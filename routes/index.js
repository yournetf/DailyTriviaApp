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
  const response = await axios.get(`https://opentdb.com/api.php?amount=${numberOfQuestionsInput}&category=${9}&difficulty=${difficultyInput}&type=multiple`);
  let shuffledQuestions = [];
  for(let i=0; i<response.data.results.length;i++){
    shuffledQuestions.push({
      question: response.data.results[i].question,
      correctAnswer: response.data.results[i].correct_answer,
      allAnswers: shuffleArray(response.data.results[i].incorrect_answers.concat(response.data.results[i].correct_answer))
    })
  }
  console.log(shuffledQuestions);
  res.render('quiz', {questionsArray: shuffledQuestions});
});

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}
 

module.exports = router;
