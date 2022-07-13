const mysql = require("mysql");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "newuser",
  password: "password",
  database: "acfdb",
  insecureAuth: true,
});

module.exports = { db };
