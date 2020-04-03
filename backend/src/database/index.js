const sqlite = require('sqlite3');
const path = require('path');

const db = new sqlite.Database(
  path.resolve(__dirname, 'fast-feet.sqlite'),
  err => {
    return err
      ? console.error(err.message)
      : console.log('Connected to the in-memory SQlite database.');
  }
);

module.exports = {
  dbRun(sql, params = []) {},
  dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  dbEach(sql, params = []) {}
};
