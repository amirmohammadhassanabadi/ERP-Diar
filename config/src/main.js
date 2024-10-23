const { name, version } = require("../../package.json");

module.exports = {
  development: {
    name: name,
    version: version,
  },
  test: {
    name: name,
    version: version,
  },
  production: {
    name: name,
    version: version,
  },
};
