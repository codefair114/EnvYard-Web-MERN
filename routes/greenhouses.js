const router = require('express').Router();
let Greenhouse = require('../models/greenhouse.model');

router.route('/').get((req, res) => {
  Greenhouse.find()
    .then(greenhouses => res.json(greenhouses))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  
  const email = req.body.email;
  const gid = Number(req.body.gid);
  const name = req.body.name;
  const surface = Number(req.body.surface);
  const imageUrl = req.body.imageUrl;
 
  const newGreenhouse = new Greenhouse({
    email,
    gid,
    name,
    surface,
    imageUrl
  });

  newGreenhouse.save()
    .then(() => res.json('Greenhouse added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Greenhouse.findById(req.params.id)
      .then(greenhouse => res.json(greenhouse))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Greenhouse.findByIdAndDelete(req.params.id)
      .then(() => res.json('Greenhouse deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;