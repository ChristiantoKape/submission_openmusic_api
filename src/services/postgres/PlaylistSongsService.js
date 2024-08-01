const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

const config = require('../../config/config');

class PlaylistSongsService {
  constructor(playlistsService) {
    this._pool = new Pool(config.pg);
    this._playlistsService = playlistsService;
  }

  async addSongsToPlaylist({ playlistId, songId, userId }) {
    const id = `playlistSong-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const playlistActivitiesId = `playlistActivity-${nanoid(16)}`;
    await this._pool.query('BEGIN');

    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3, $4, $4) RETURNING id',
      values: [id, playlistId, songId, createdAt],
    };

    const playlistActivityQuery = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [playlistActivitiesId, playlistId, songId, userId, 'add', new Date().toISOString()],
    };

    const result = await this._pool.query(query);
    const activityResult = await this._pool.query(playlistActivityQuery);

    if (!result.rows[0].id || !activityResult.rows[0].id) {
      await this._pool.query('ROLLBACK');
      throw new InvariantError('Lagu gagal ditambahkan kedalam playlist');
    }

    await this._pool.query('COMMIT');
  }

  async getSongsFromPlaylist(playlistId) {
    const songsQuery = {
      text: `SELECT songs.id, songs.title, songs.performer 
             FROM playlist_songs
             LEFT JOIN songs ON songs.id = playlist_songs.song_id
             WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const playlistQuery = {
      text: `SELECT playlists.id, playlists.name, users.username 
             FROM playlists
             LEFT JOIN users ON users.id = playlists.owner_id 
             WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const songsResult = await this._pool.query(songsQuery);
    const playlistResult = await this._pool.query(playlistQuery);

    if (!playlistResult.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const playlist = playlistResult.rows[0];

    return {
      ...playlist,
      songs: songsResult.rows,
    };
  }

  async deleteSongFromPlaylist(playlistId, songId, userId) {
    const playlistActivitiesId = `playlistactivities-${nanoid(16)}`;

    const query = {
      text: 'DELETE FROM playlist_songs WHERE song_id = $1 AND playlist_id = $2 RETURNING id',
      values: [songId, playlistId],
    };

    const queryActivities = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [playlistActivitiesId, playlistId, songId, userId, 'delete', new Date().toISOString()],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }

    const resultActivity = await this._pool.query(queryActivities);

    if (resultActivity.rows[0].id === 1) {
      throw new InvariantError('Aktivitas gagal ditambahkan');
    }
  }
}

module.exports = PlaylistSongsService;
