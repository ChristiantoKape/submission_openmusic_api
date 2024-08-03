const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

const config = require('../../config/config');

class AlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool(config.pg);
    this._cacheService = cacheService;
  }

  async addLikeAlbum({ userId, albumId }) {
    await this.verifyLikeAlbum({ userId, albumId });

    const id = `like-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3, $4, $4) RETURNING id',
      values: [id, userId, albumId, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Like gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbumLikes(albumId) {
    try {
      const result = await this._cacheService.get(`likes:${albumId}`);
      return { likes: JSON.parse(result), cache: 1 };
    } catch (error) {
      const query = {
        text: 'SELECT * FROM user_album_likes WHERE album_id = $1',
        values: [albumId],
      };
      const result = await this._pool.query(query);

      await this._cacheService.set(`likes:${albumId}`, JSON.stringify(result.rowCount));
      return { likes: result.rowCount };
    }
  }

  async deleteLikeAlbum({ userId, albumId }) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    await this._cacheService.delete(`likes:${albumId}`);

    if (!result.rows.length) {
      throw new AuthorizationError('Like gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyLikeAlbum({ userId, albumId }) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Anda sudah memberikan like pada album ini');
    }

    return result.rows;
  }
}

module.exports = AlbumLikesService;
