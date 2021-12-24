const router = require('express').Router();
let Parameter = require('../models/parameter.model');

router.route('/').get((req, res) => {
  Parameter.find()
    .then(parameters => res.json(parameters))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const moisture = Number(req.body.moisture);
    const temperature = Number(req.body.temperature);
    const pressure = Number(req.body.pressure);
    const humidity = Number(req.body.humidity);
    const altitude = Number(req.body.altitude);
    const lpg = Number(req.body.lpg);
    const co = Number(req.body.co);
    const smoke = Number(req.body.smoke);
    const greenhouse = Number(req.body.greenhouse);
    const level = Number(req.body.level);
    const userid = req.body.userid;
    const plant = req.body.plant;
    const light = Number(req.body.light);
    const date = req.body.date;

  const newParameter = new Parameter({
    moisture,
    temperature,
    pressure,
    humidity,
    altitude,
    lpg,
    co,
    smoke,
    greenhouse,
    level,
    userid,
    light,
    plant,
    date
  });

  newParameter.save()
    .then(() => res.json('Parameter added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Parameter.findById(req.params.id)
      .then(parameter => res.json(parameter))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Parameter.findByIdAndDelete(req.params.id)
      .then(() => res.json('Parameter deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Parameter.findById(req.params.id)
      .then(parameter => {
        parameter.moisture = Number(req.body.moisture);
        parameter.temperature = Number(req.body.temperature);
        parameter.pressure = Number(req.body.pressure);
        parameter.humidity = Number(req.body.humidity);
        parameter.altitude = Number(req.body.altitude);
        parameter.lpg = Number(req.body.lpg);
        parameter.co = Number(req.body.co);
        parameter.smoke = Number(req.body.smoke);
        parameter.greenhouse = Number(req.body.greenhouse);
        parameter.level = Number(req.body.level);
        parameter.light = Number(req.body.light);
        parameter.userid = req.body.userid;
        parameter.plant = req.body.plant;
        parameter.date = req.body.date;

        parameter.save()
          .then(() => res.json('Parameter updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;