const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{albumId}/likes',
    handler: handler.postLikeAlbumHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/albums/{albumId}/likes',
    handler: handler.getAlbumLikesHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{albumId}/likes',
    handler: handler.deleteLikeAlbumHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

module.exports = routes;
