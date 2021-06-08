const { model, Schema } = require('mongoose');

const orderSchema = Schema({
  userId: String,
  date: Date,
  dishes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dish',
  }],
  isDelivered: Boolean,
  isPaid: Boolean,
});

module.exports = model('Order', orderSchema);
