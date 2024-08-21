const CollaborationsService = require('../../services/postgres/CollaborationsService');
const CollaborationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, { validator, playlistsService, usersService }) => {
    const service = new CollaborationsService();
    const collaborationsHandler = new CollaborationsHandler(
      service,
      validator,
      playlistsService,
      usersService,
    );
    server.route(routes(collaborationsHandler));
  },
};
