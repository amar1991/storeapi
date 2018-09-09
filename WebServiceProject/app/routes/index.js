const noteRoutes = require('./note_routes');
module.exports = function(app, database) {
  noteRoutes(app, database);
  // Other route groups could go here, in the future
};