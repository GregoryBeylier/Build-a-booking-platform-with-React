const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "data", "kasa.sqlite3"));

const email = "alice@example.com";

db.run(
  "UPDATE users SET role = ? WHERE email = ?",
  ["owner", email],
  function (err) {
    if (err) {
      console.error("Erreur:", err.message);
    } else {
      console.log(`${this.changes} compte(s) mis à jour.`);
    }
    db.close();
  },
);
