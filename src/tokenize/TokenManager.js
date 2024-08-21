const Jwt = require('@hapi/jwt');
const config = require('../config/config');

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, config.jwt.accessToken),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, config.jwt.refreshToken),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verify(artifacts, config.jwt.refreshToken);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new Error('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
