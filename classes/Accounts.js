const sql = require("sqlite3").verbose(),
  db = new sql.Database("./database.db");

db.serialize(function() {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), password VARCHAR(255), email VARCHAR(255), date_created VARCHAR(255))"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER, message TEXT)"
  );
});

class Accounts {
  static register(user, callback) {
    db.run(
      "INSERT INTO users(name, password, email, date_created) VALUES(?, ?, ?, ?)",
      [user.name, user.password, user.email, user.date_created],
      function(err) {
        if (err) {
          callback(false);
        } else {
          callback(true);
        }
      }
    );
  }

  static login(email, password, callback) {
    db.all(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, rows, fields) => {
        if (err) return callback(false);
        if (rows.length > 0) {
          if (rows[0].password == password) {
            callback(true);
          } else {
            callback(false);
          }
        } else {
          callback(false);
        }
      }
    );
  }

  static getUser(email, callback) {
    db.all(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, rows, fields) => {
        if (err) return callback({ status: false });
        if (rows.length > 0) {
          callback({
            status: true,
            username: rows[0].name,
            email: rows[0].email
          });
        } else {
          callback({ status: false });
        }
      }
    );
  }
}

exports.Accounts = Accounts;
