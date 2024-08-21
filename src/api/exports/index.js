const ExportsHandler = require('./handler');
const ProducerService = require('../../services/rabbitmq/ProducerService');
const routes = require('./routes');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { validator, playlistsService }) => {
    const service = ProducerService; // Use ProducerService directly
    const exportsHandler = new ExportsHandler(
      service,
      validator,
      playlistsService,
    );
    server.route(routes(exportsHandler));
  },
};
