const autoBind = require('auto-bind');

class PlaylistSongsHandler {
  constructor(service, validator, playlistsService, songsService) {
    this._service = service;
    this._songsService = songsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    autoBind(this);
  }

  async postSongToPlaylistHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { songId } = request.payload;
    const { playlistId } = request.params;

    await this._songsService.verifySongExists(songId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._service.addSongsToPlaylist({ playlistId, songId, userId: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    });
    response.code(201);
    return response;
  }

  async getSongsFromPlaylistHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const playlist = await this._service.getSongsFromPlaylist(playlistId);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deleteSongFromPlaylistHandler(request) {
    this._validator.validatePlaylistSongPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { songId } = request.payload;
    const { playlistId } = request.params;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._service.deleteSongFromPlaylist(playlistId, songId, credentialId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }

  async getPlaylistSongsActivitiesHandler(request) {
    const { id: playlistId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, userId);
    const playlistActivities = await this._playlistsService.getPlaylistActivityById(playlistId);

    return {
      status: 'success',
      data: {
        playlistId,
        activities: playlistActivities,
      },
    };
  }
}

module.exports = PlaylistSongsHandler;
