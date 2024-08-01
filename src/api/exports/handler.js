class ExportsHandler {
  constructor(service, validator, playlistsService) {
    this._service = service;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postExportPlaylistHandler = this.postExportPlaylistHandler.bind(this);
  }

  async postExportPlaylistHandler(request, h) {
    this._validator.validateExportPlaylistsPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    const message = {
      userId: request.auth.credentials.id,
      playlistId: request.params.playlistId,
      targetEmail: request.payload.targetEmail,
    };

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._service.sendMessage('export:playlists', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
