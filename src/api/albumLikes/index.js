const AlbumLikesService = require('../../services/postgres/AlbumLikesService');
const AlbumLikesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albumLikes',
  version: '1.0.0',
  register: async (server, { validator, albumsService, cacheService }) => {
    const service = new AlbumLikesService(cacheService);
    const albumLikesHandler = new AlbumLikesHandler(
      service,
      validator,
      albumsService,
      cacheService,
    );
    server.route(routes(albumLikesHandler));
  },
};
