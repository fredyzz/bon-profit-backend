/* eslint-disable no-underscore-dangle */
const debug = require('debug')('server:userController');
const { ObjectId } = require('mongoose').Types;
const Order = require('../models/order.model');
const User = require('../models/user.model');

function orderController() {
  debug('Entered to orderController');
  async function getById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      return res.json(order);
    } catch (error) {
      return res.status(404);
    }
  }

  async function update(req, res) {
    try {
      const { orderId } = req.params;
      const updatedOrder = await Order.findOneAndUpdate(orderId,
        { ...req.body },
        { new: true });
      return res.json({
        updatedOrder,
      });
    } catch (error) {
      return res.status(404);
    }
  }

  async function save(req, res) {
    try {
      const newOrder = await Order.create({
        userId: req.user._id,
        date: Date.now(),
        dishes: req.body.dishes,
        isDelivered: false,
        isPaid: false,
      });

      await User.findOneAndUpdate(
        req.user._id,
        { $addToSet: { orders: newOrder._id } },
      );

      return res.json(newOrder);
    } catch (error) {
      return res.status(404);
    }
  }

  async function getAll(req, res) {
    console.log(req.user._id);
    try {
      const orders = await Order.find({ userId: new ObjectId(req.user._id) });
      return res.json(orders);
    } catch (error) {
      return res.status(404);
    }
  }

  return {
    getById,
    update,
    getAll,
    save,
  };
}

module.exports = orderController;
