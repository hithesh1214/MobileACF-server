const { db } = require("../util/admin");

exports.getTyre = (req, res) => {
  const sqlSelect = "SELECT * FROM tyretb";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
};

exports.addTyre = (req, res) => {
  const TyreCompanyname = req.body.TyreCompanyname;
  const sqlInsert = "INSERT INTO tyretb (TyreCompanyname) VALUES (?)";
  db.query(sqlInsert, [TyreCompanyname], (err, result) => {
    if (result) {
      res.json({
        message: TyreCompanyname + " added succesfully",
      });
    }
  });
};

exports.getTyreSize = (req, res) => {
  const vechid = req.body.Vechid;
  const sqlSelect = "SELECT * FROM tyresizetb WHERE Vechileid = ?";
  db.query(sqlSelect, [vechid], (err, result) => {
    res.send(result);
  });
};

exports.getTyreBrand = (req, res) => {
  const tyresizeid = req.body.Sizeid;
  const sqlSelect = "SELECT * FROM sizebrandcodetb WHERE Sizeid = ?";
  db.query(sqlSelect, [tyresizeid], (err, result) => {
    res.send(result);
  });
};
