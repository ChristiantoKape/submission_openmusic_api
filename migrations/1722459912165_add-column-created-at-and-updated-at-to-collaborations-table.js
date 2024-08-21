exports.up = (pgm) => {
  pgm.addColumns('collaborations', {
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('collaborations', ['created_at', 'updated_at']);
};
