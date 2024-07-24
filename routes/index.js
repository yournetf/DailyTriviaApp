var express = require('express');
var router = express.Router();
var axios = require("axios");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/selectedtrivia', async function(req, res){
  let  numberOfQuestionsInput = req.query.numberOfQuestionsInput;
  let difficultyInput = req.query.difficultyInput;
  let categoryInput = req.query.selectCategoryInput;
  let typeInput = req.query.typeInput;
  console.log(typeInput);
  const response = await axios.get(`https://opentdb.com/api.php?amount=${numberOfQuestionsInput}&category=${categoryInput}&difficulty=${difficultyInput}&type=${typeInput}`);
  let shuffledQuestions = [];
  for(let i=0; i<response.data.results.length;i++){
    shuffledQuestions.push({
      question: response.data.results[i].question,
      type: response.data.results[i].type,
      correctAnswer: response.data.results[i].correct_answer,
      allAnswers: shuffleArray(response.data.results[i].incorrect_answers.concat(response.data.results[i].correct_answer))
    })
  }
  let category = translateCategory(categoryInput);
  res.render('quiz', {questionsArray: shuffledQuestions, category:category, type: typeInput});
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

function translateCategory(x){
  switch(x){
    case "":
      return "Any";
    case "9":
      return "General Knowledge";
    case "10":
      return "Books";
    case "11":
      return "Film";
    case "12":
      return "Music";
    case "13":
      return "Musical and Theaters";
    case "14":
      return "Television";
    case "15":
      return "Video Games";
    case "16":
      return "Board Games";
    case "17":
      return "Science and Nature";
    case "18":
      return "Computers";
    case "19":
      return "Mathematics";
    case "20":
      return "Mythology";
    case "21":
      return "Sports";
    case "22":
      return "Geography";
    case "23":
      return "History";
    case "24":
      return "Politics";
    case "25":
      return "Art";
    case "26":
      return "Celebrities";
    case "27":
      return "Animals";
    case "28":
      return "Comics";
    case "29":
      return "Vehicles";
    case "30":
      return "Gadgets";
    case "31":
      return "Anime and Manga";
    case "32":
      return "Cartoons and Animations";
  }
}
 

module.exports = router;
