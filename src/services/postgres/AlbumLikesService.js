const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class AlbumLikesService {
  constructor() {
    this._pool = new Pool();
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

  async getAlbumLikes({ albumId }) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);

    return result.rowCount;
  }

  async deleteLikeAlbum({ userId, albumId }) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

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
