exports.up = (pgm) => {
  pgm.addColumns('albums', {
    // add before column created_at
    cover_url: {
      type: 'TEXT',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('albums', 'cover_url');
};
