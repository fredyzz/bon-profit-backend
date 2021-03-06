/* eslint-disable no-underscore-dangle */
const debug = require('debug')('server:userController');
const Restaurant = require('../models/restaurant.model');
const Order = require('../models/order.model');
const Dish = require('../models/dish.model');

function restaurantController() {
  debug('Entered to restaurantController');
  async function getAll(req, res) {
    try {
      const restaurants = await Restaurant.find({})
        .populate([{ path: 'orders', model: Order }, { path: 'dishes', model: Dish }]);
      return res.json(restaurants);
    } catch (error) {
      return res.status(404);
    }
  }

  async function getById(req, res) {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId)
        .populate([{ path: 'orders', model: Order }, { path: 'dishes', model: Dish }]);
      return res.json(restaurant);
    } catch (error) {
      return res.status(404);
    }
  }

  return {
    getAll,
    getById,
  };
}

module.exports = restaurantController;
