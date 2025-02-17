/**
 * order router
 */

/* import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::order.order');
 */

'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/orders',
      handler: 'order.find',
    },
    {
      method: 'GET',
      path: '/orders/:id',
      handler: 'order.findOne',
    },
    {
      method: 'POST',
      path: '/orders',
      handler: 'order.create',
    },
    {
      method: 'PUT',
      path: '/orders/:id',
      handler: 'order.update',
    }
  ]
};