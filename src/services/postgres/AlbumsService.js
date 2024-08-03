const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapDBToModel } = require('../../utils/albums');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

const config = require('../../config/config');

class AlbumsService {
  constructor() {
    this._pool = new Pool(config.pg);
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return mapDBToModel(result.rows[0]);
  }

  async getSongsInAlbum(id) {
    const query = {
      text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async editAlbumById(id, { name, year, cover }) {
    const updatedAt = new Date().toISOString();

    const oldDataQuery = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const oldDataResult = await this._pool.query(oldDataQuery);

    if (!oldDataResult.rows.length) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const oldData = oldDataResult.rows[0];

    const newName = name ?? oldData.name;
    const newYear = year ?? oldData.year;
    const newCover = cover ?? oldData.cover;

    const query = {
      text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3, cover_url = $4 WHERE id = $5 RETURNING id',
      values: [newName, newYear, updatedAt, newCover, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
