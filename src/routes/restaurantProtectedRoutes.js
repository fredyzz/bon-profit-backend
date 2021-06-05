/* eslint-disable no-underscore-dangle */
const express = require('express');
const restaurantController = require('../controllers/restaurant.controller')();

const router = express.Router();

router
  .route('/')
  .get(restaurantController.getAll);

router
  .route('/:restaurantId')
  .get(restaurantController.getById);

module.exports = router;
