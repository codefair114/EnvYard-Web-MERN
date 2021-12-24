const router = require('express').Router();
let Review = require('../models/review.model');

router.route('/').get((req, res) => {
  Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  
  const email = req.body.email;
  const productname = req.body.productname;
  const description = req.body.description;
  const rating = Number(req.body.rating);
  const marked = req.body.marked;

  const newReview = new Review({
    email,
    productname,
    description,
    rating,
    marked
  });

  newReview.save()
    .then(() => res.json('Review added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Review.findById(req.params.id)
      .then(review => res.json(review))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Review.findByIdAndDelete(req.params.id)
      .then(() => res.json('Review deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Review.findById(req.params.id)
      .then(review => {
        review.email = req.body.email;
        review.productname = req.body.productname;
        review.description = req.body.description;
        review.rating = Number(req.body.rating);
        review.marked = req.body.marked;
  
        review.save()
          .then(() => res.json('Review updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;