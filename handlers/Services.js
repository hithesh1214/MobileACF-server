const { db } = require("../util/admin");

exports.getService = (req, res) => {
  const sqlSelect = "SELECT * FROM servicetb";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

exports.addService = (req, res) => {
  const Servicename = req.body.Servicename;
  const sqlInsert = "INSERT INTO servicetb (Servicename) VALUES (?)";
  db.query(sqlInsert, [Servicename], (err, result) => {
    if (result) {
      res.json({
        message: Servicename + " added succesfully",
      });
    }
  });
};
