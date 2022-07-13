const { db } = require("../util/admin");

exports.getABU = (req, res) => {
  const RBUid = req.body.RBUid;
  var sqlSelect = "";
  if (RBUid === "all") {
    sqlSelect = "SELECT * FROM abutb";
  } else {
    sqlSelect = "SELECT * FROM abutb WHERE RBUid = ?";
  }
  db.query(sqlSelect, [RBUid], (err, result) => {
    res.send(result);
  });
};

exports.addABU = (req, res) => {
  const ABUname = req.body.ABUname;
  const RBUid = req.body.RBUid;
  const SBUid = req.body.SBUid;
  const ABUcode = req.body.ABUcode;
  const sqlInsert =
    "INSERT INTO abutb (SBUid,RBUid,ABUname,ABUcode) VALUES (?,?,?,?)";
  db.query(sqlInsert, [SBUid, RBUid, ABUname, ABUcode], (err, result) => {
    if (result) {
      res.json({
        message: ABUname + " added successfully",
      });
    }
  });
};
