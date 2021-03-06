const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  
  const name = req.body.name;
  const description = req.body.description;
  const price = Number(req.body.price);
  const countInStock = Number(req.body.countInStock);
  const imageUrl = req.body.imageUrl;
  const type = Number(req.body.type);

  const newProduct = new Product({
    name,
    description,
    price,
    countInStock,
    imageUrl,
    type
  });

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
      .then(product => res.json(product))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => res.json('Product deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
      .then(product => {
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = Number(req.body.price);
        product.countInStock = Number(req.body.countInStock);
        product.imageUrl = req.body.imageUrl;
        product.type = req.body.type;

        product.save()
          .then(() => res.json('Product updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;