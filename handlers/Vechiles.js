const { db } = require("../util/admin");

exports.getVechile = (req, res) => {
  const sqlSelect = "SELECT * FROM vechiletb";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

exports.addVechile = (req, res) => {
  const Vechilename = req.body.Vechilename;
  const sqlInsert = "INSERT INTO vechiletb (Vechilename) VALUES (?)";
  db.query(sqlInsert, [Vechilename], (err, result) => {
    if (result) {
      res.json({
        message: Vechilename + " added successfully",
      });
    }
  });
};
