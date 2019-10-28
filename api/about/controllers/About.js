'use strict';

/**
 * About.js controller
 *
 * @description: A set of functions called "actions" for managing `About`.
 */

module.exports = {

  /**
   * Retrieve about records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.about.search(ctx.query);
    } else {
      return strapi.services.about.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a about record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.about.fetch(ctx.params);
  },

  /**
   * Count about records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.about.count(ctx.query);
  },

  /**
   * Create a/an about record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.about.add(ctx.request.body);
  },

  /**
   * Update a/an about record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.about.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an about record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.about.remove(ctx.params);
  }
};
