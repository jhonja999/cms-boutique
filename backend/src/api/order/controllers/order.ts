/**
 * order controller
 * api para pasarela en backend, 
 */

import { factories } from '@strapi/strapi'


// src/api/order/controllers/order.js
'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async find(ctx) {
    const orders = await strapi.entityService.findMany('api::order.order');
    return orders;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const order = await strapi.entityService.findOne('api::order.order', id);
    if (!order) {
      return ctx.notFound('Order not found');
    }
    return order;
  },

  async create(ctx) {
    const { orderId, items, totalPrice, paymentMethod, status, customerInfo } = ctx.request.body;

    // Validar que todos los campos requeridos estén presentes
    if (!orderId || !items || !totalPrice || !paymentMethod || !customerInfo) {
      return ctx.badRequest('Missing required fields');
    }

    try {
      const order = await strapi.entityService.create('api::order.order', {
        data: {
          orderId,
          items: JSON.stringify(items), // Convertir items a JSON
          totalPrice,
          paymentMethod,
          status: status || 'pending',
          customerInfo: JSON.stringify(customerInfo), // Convertir customerInfo a JSON
          publishedAt: new Date(),
        },
      });
      return order;
    } catch (error) {
      return ctx.internalServerError('Error creating order');
    }
  },

  async update(ctx) {
    const { id } = ctx.params;
    const updateData = ctx.request.body;

    try {
      const order = await strapi.entityService.update('api::order.order', id, {
        data: updateData,
      });
      return order;
    } catch (error) {
      return ctx.internalServerError('Error updating order');
    }
  },
}));
/* export default factories.createCoreController('api::order.order'); */
