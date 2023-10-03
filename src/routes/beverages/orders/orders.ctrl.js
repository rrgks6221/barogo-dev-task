import { OrdersService } from '../../../services/orders/orders.service.js';

const ordersCtrl = {};

ordersCtrl.beverage = (req, res) => {
  const { params } = req;
  const { id } = params;

  const ordersService = new OrdersService();
  ordersService.orderBeverage(id);

  return res.status(204).json();
};

export default ordersCtrl;
