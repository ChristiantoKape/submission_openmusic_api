const PlaylistSongsService = require('../../services/postgres/PlaylistSongsService');
const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, { validator, playlistsService, songsService }) => {
    const service = new PlaylistSongsService();
    const playlistSongsHandler = new PlaylistSongsHandler(
      service,
      validator,
      playlistsService,
      songsService,
    );
    server.route(routes(playlistSongsHandler));
  },
};
