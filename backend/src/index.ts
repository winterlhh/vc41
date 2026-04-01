export default {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    await configurePublicPermissions(strapi);
  },
};

/**
 * Automatically grant Public role the minimum permissions needed
 * for the profile page to work without manual admin setup.
 */
async function configurePublicPermissions(strapi: any) {
  const pluginStore = strapi.store({
    environment: '',
    type: 'plugin',
    name: 'users-permissions',
  });

  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' }, populate: ['permissions'] });

  if (!publicRole) return;

  const permissionsToGrant = [
    { action: 'api::profile.profile.find'            },
    { action: 'api::profile.profile.update'          },
    { action: 'api::profile.profile.like'            },
    { action: 'api::profile.profile.unlike'          },
    { action: 'api::social-link.social-link.find'    },
    { action: 'api::social-link.social-link.findOne' },
    { action: 'api::social-link.social-link.create'  },
  ];

  for (const perm of permissionsToGrant) {
    const existing = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action: perm.action, role: publicRole.id } });

    if (!existing) {
      await strapi
        .query('plugin::users-permissions.permission')
        .create({ data: { ...perm, role: publicRole.id, enabled: true } });

      strapi.log.info(`[bootstrap] Granted public permission: ${perm.action}`);
    } else if (!existing.enabled) {
      await strapi
        .query('plugin::users-permissions.permission')
        .update({ where: { id: existing.id }, data: { enabled: true } });

      strapi.log.info(`[bootstrap] Enabled public permission: ${perm.action}`);
    }
  }
}
