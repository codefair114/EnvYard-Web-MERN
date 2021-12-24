const router = require('express').Router();
let Image = require('../models/image.model');

router.route('/').get((req, res) => {
  Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  
  const greenhouse = Number(req.body.greenhouse);
  const name = req.body.name;
  const level = Number(req.body.level);
  const userid = req.body.userid;
  const diagnosis = req.body.diagnosis;
  const type = req.body.type;
  const url = req.body.url;

  const newImage = new Image({
    greenhouse,
    name,
    level,
    userid,
    diagnosis,
    type,
    url
  });

  newImage.save()
    .then(() => res.json('Image added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Image.findById(req.params.id)
      .then(image => res.json(image))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Image.findByIdAndDelete(req.params.id)
      .then(() => res.json('Image deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Image.findById(req.params.id)
      .then(image => {
        image.greenhouse = Number(req.body.greenhouse);
        image.level = Number(req.body.level);
        image.userid = req.body.userid;
        image.diagnosis = req.body.diagnosis;
        image.type = req.body.type;
        image.url = req.body.url;
        image.name = req.body.name;

        image.save()
          .then(() => res.json('Image updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;