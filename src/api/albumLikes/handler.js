const autoBind = require('auto-bind');

class AlbumLikesHandler {
  constructor(service, validator, albumsService, cacheService) {
    this._service = service;
    this._validator = validator;
    this._albumsService = albumsService;
    this._cacheService = cacheService;

    autoBind(this);
  }

  async postLikeAlbumHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { albumId } = request.params;

    await this._albumsService.getAlbumById(albumId);
    await this._service.addLikeAlbum({ albumId, userId: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Like album berhasil ditambahkan',
    });
    response.code(201);
    return response;
  }

  async getAlbumLikesHandler(request, h) {
    const { albumId } = request.params;
    const { likes, cache } = await this._service.getAlbumLikes(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });
    response.code(200);
    if (cache) {
      response.header('X-Data-Source', 'cache');
    }
    return response;
  }

  async deleteLikeAlbumHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { albumId } = request.params;

    await this._albumsService.getAlbumById(albumId);
    await this._service.deleteLikeAlbum({ albumId, userId: credentialId });

    return {
      status: 'success',
      message: 'Like album berhasil dihapus',
    };
  }
}

module.exports = AlbumLikesHandler;
