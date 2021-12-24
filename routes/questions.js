const router = require('express').Router();
let Question = require('../models/question.model');

router.route('/').get((req, res) => {
  Question.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  
  const email = req.body.email;
  const q = req.body.q;

  const newQuestion = new Question({
    email,
    q
  });

  newQuestion.save()
    .then(() => res.json('Question added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Question.findById(req.params.id)
      .then(question => res.json(question))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Question.findByIdAndDelete(req.params.id)
      .then(() => res.json('Question deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;