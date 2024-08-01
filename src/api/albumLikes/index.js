const AlbumLikesService = require('../../services/postgres/AlbumLikesService');
const AlbumLikesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albumLikes',
  version: '1.0.0',
  register: async (server, { validator, albumsService }) => {
    const service = new AlbumLikesService();
    const albumLikesHandler = new AlbumLikesHandler(service, validator, albumsService);
    server.route(routes(albumLikesHandler));
  },
};
