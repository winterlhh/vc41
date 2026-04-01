import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::profile.profile', ({ strapi }) => ({
  async like(ctx) {
    const entry = await strapi.db.query('api::profile.profile').findOne({});
    if (!entry) return ctx.notFound();

    const updated = await strapi.db.query('api::profile.profile').update({
      where: { id: entry.id },
      data: { likeCount: (entry.likeCount ?? 0) + 1 },
    });

    ctx.body = { likeCount: updated.likeCount };
  },

  async unlike(ctx) {
    const entry = await strapi.db.query('api::profile.profile').findOne({});
    if (!entry) return ctx.notFound();

    const updated = await strapi.db.query('api::profile.profile').update({
      where: { id: entry.id },
      data: { likeCount: Math.max(0, (entry.likeCount ?? 0) - 1) },
    });

    ctx.body = { likeCount: updated.likeCount };
  },
}));
