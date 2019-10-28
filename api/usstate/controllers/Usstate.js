'use strict';

/**
 * Usstate.js controller
 *
 * @description: A set of functions called "actions" for managing `Usstate`.
 */

module.exports = {

  /**
   * Retrieve usstate records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.usstate.search(ctx.query);
    } else {
      return strapi.services.usstate.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a usstate record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.usstate.fetch(ctx.params);
  },

  /**
   * Count usstate records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.usstate.count(ctx.query);
  },

  /**
   * Create a/an usstate record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.usstate.add(ctx.request.body);
  },

  /**
   * Update a/an usstate record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.usstate.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an usstate record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.usstate.remove(ctx.params);
  }
};
