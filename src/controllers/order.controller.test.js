const {
  getAll, getById, update, save,
} = require('./order.controller')();
const Order = require('../models/order.model');
const User = require('../models/user.model');

jest.mock('../models/order.model');
jest.mock('../models/user.model');

describe('Given a orderController', () => {
  describe('invoking a getAll function without req arguments', () => {
    test('should return a status 404', async () => {
      Order.find.mockRejectedValueOnce(404);

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const req = {
      };

      await getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('invoking a getById function', () => {
    test('should call res.json with an object as argument', async () => {
      Order.findById.mockImplementationOnce(() => ({}));

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const req = {
        params: {
          orderId: '3',
        },
      };

      await getById(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('invoking a getById function without req arguments', () => {
    test('should return a status 404', async () => {
      Order.findById.mockRejectedValueOnce('error');

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      await getById(null, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('invoking a update function', () => {
    test('should call res.json with an object as argument', async () => {
      Order.findOneAndUpdate.mockImplementationOnce(() => ({}));

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const req = {
        params: {
          orderId: '3',
        },
      };

      await update(req, res);
      expect(res.json).toHaveBeenCalledWith({ updatedOrder: {} });
    });
  });
  describe('invoking a update function without req arguments', () => {
    test('should return a status 404', async () => {
      Order.findOneAndUpdate.mockRejectedValueOnce('error');

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      await update(null, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
  describe('invoking a save function', () => {
    test('should call res.json with an object as argument', async () => {
      Order.create.mockImplementationOnce(() => ({}));
      User.findOneAndUpdate.mockImplementationOnce(() => ({}));

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const req = {
        user: {
          _id: 'id',
        },
        body: {
          dishes: [],
        },
      };

      await save(req, res);
      expect(res.json).toHaveBeenCalledWith({});
    });
  });
  describe('invoking a update function without req arguments', () => {
    test('should return a status 404', async () => {
      Order.create.mockImplementationOnce(() => ({}));
      User.findOneAndUpdate.mockImplementationOnce(() => ({}));

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const req = {

      };

      await save(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
