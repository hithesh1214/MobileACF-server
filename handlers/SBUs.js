const { db } = require("../util/admin");

exports.getSBU = (req, res) => {
  const sqlSelect = "SELECT * FROM sbutb";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

exports.addSBU = (req, res) => {
  const SBUname = req.body.SBUname;

  const sqlInsert = "INSERT INTO sbutb (SBUname) VALUES (?)";
  db.query(sqlInsert, [SBUname], (err, result) => {
    if (result) {
      res.json({
        message: SBUname + " added successfully",
      });
    }
  });
};
