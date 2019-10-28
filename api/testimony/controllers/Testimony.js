'use strict';

/**
 * Testimony.js controller
 *
 * @description: A set of functions called "actions" for managing `Testimony`.
 */

module.exports = {

  /**
   * Retrieve testimony records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.testimony.search(ctx.query);
    } else {
      return strapi.services.testimony.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a testimony record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.testimony.fetch(ctx.params);
  },

  /**
   * Count testimony records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.testimony.count(ctx.query);
  },

  /**
   * Create a/an testimony record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.testimony.add(ctx.request.body);
  },

  /**
   * Update a/an testimony record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.testimony.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an testimony record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.testimony.remove(ctx.params);
  }
};
