class AlbumLikesHandler {
  constructor(service, validator, albumsService) {
    this._service = service;
    this._validator = validator;
    this._albumsService = albumsService;

    this.postLikeAlbumHandler = this.postLikeAlbumHandler.bind(this);
    this.getAlbumLikesHandler = this.getAlbumLikesHandler.bind(this);
    this.deleteLikeAlbumHandler = this.deleteLikeAlbumHandler.bind(this);
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

  async getAlbumLikesHandler(request) {
    const { albumId } = request.params;

    await this._albumsService.getAlbumById(albumId);
    const likes = await this._service.getAlbumLikes({ albumId });

    return {
      status: 'success',
      data: {
        likes,
      },
    };
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
