const mapDBToModel = ({
  id,
  name,
  year,
  cover_url: coverUrl,
}) => ({
  id,
  name,
  year,
  coverUrl,
});

module.exports = { mapDBToModel };
