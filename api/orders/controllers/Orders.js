'use strict';
// stripe - secret key
const stripe = require('stripe')('sk_test_Yxm0xzw9fc3k1bZ2QtsiZUab00uqVRdab1');

/**
 * Orders.js controller
 *
 * @description: A set of functions called "actions" for managing `Orders`.
 */

module.exports = {
  /**
   * Retrieve orders records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.orders.search(ctx.query);
    } else {
      return strapi.services.orders.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a orders record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.orders.fetch(ctx.params);
  },

  /**
   * Count orders records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.orders.count(ctx.query);
  },

  /**
   * Create a/an orders record.
   *
   * @return {Object}
   */

  create: async ctx => {
    //return strapi.services.orders.add(ctx.request.body);
    // fetching inserted data from the Strapi request body.
    const {
      name,
      address,
      amount,
      zipcode,
      city,
      token,
      cart,
      user_id,
      purchase_date
    } = ctx.request.body;
    // sending data to Stripe payment system
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      customer: ctx.state.user_id,
      description: `Order ${new Date(Date.now())}- User, ${name} ${user_id}`,
      source: token
    });

    const order = await strapi.services.orders.add({
      user: ctx.state.user_id,
      amount,
      cart,
      user_id,
      token,
      purchase_date
    });
    return order;
  },

  /**
   * Update a/an orders record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.orders.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an orders record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.orders.remove(ctx.params);
  }
};
