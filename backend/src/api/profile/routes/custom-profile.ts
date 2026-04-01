export default {
  routes: [
    {
      method: 'POST',
      path: '/profile/like',
      handler: 'profile.like',
      config: { policies: [], auth: false },
    },
    {
      method: 'POST',
      path: '/profile/unlike',
      handler: 'profile.unlike',
      config: { policies: [], auth: false },
    },
  ],
};
