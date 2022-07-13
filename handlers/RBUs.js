const { db } = require("../util/admin");

exports.getRBU = (req, res) => {
  const SBUid = req.body.SBUid;
  var sqlSelect = "";
  if (SBUid === "all") {
    sqlSelect = "SELECT * FROM rbutb";
  } else {
    sqlSelect = "SELECT * FROM rbutb WHERE SBUid = ?";
  }
  db.query(sqlSelect, [SBUid], (err, result) => {
    res.send(result);
  });
};

exports.addRBU = (req, res) => {
  const RBUname = req.body.RBUname;
  const SBUid = req.body.SBUid;
  const sqlInsert = "INSERT INTO rbutb (RBUname,SBUid) VALUES (?,?)";
  db.query(sqlInsert, [RBUname, SBUid], (err, result) => {
    res.json({
      message: RBUname + " added successfully",
    });
  });
};
