const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/').get((req, res) => {
  Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name= req.body.name;
  const amount = Number(req.body.amount);

  const newOrder = new Order({
    name,
    amount
  });

  newOrder.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Order.findById(req.params.id)
      .then(order => res.json(order))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    order.findByIdAndDelete(req.params.id)
      .then(() => res.json('Orderdeleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;