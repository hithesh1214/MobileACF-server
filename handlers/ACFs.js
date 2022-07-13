const { db } = require("../util/admin");

exports.getACF = (req, res) => {
  const ABUid = req.body.ABUid;
  var sqlSelect = "";
  if (ABUid === "all") {
    sqlSelect = "SELECT * FROM acfstb";
  } else {
    sqlSelect = "SELECT * FROM acfstb WHERE ABUid = ?";
  }
  db.query(sqlSelect, [ABUid], (err, result) => {
    res.send(result);
  });
};

exports.getACFdet = (req, res) => {
  const user_id = req.body.user_id;
  const sqlSelect = "SELECT * FROM acfstb WHERE ACFid=?";
  db.query(sqlSelect, [user_id], (err, result) => {
    res.send(result);
  });
};

exports.addACF = (req, res) => {
  const User = req.body.User;
  const Pricesheet = JSON.stringify(req.body.Pricesheet);
  const SBUid = req.body.SBUid;
  const RBUid = req.body.RBUid;
  const ABUid = req.body.ABUid;
  const Recommends = JSON.stringify(req.body.Recommends);
  const sqlInsert =
    "INSERT INTO acfstb (Shopname,Ownername,Contactno,Shopaddress,Pincode,Emailid,SBUid,RBUid,ABUid,Latitude,Longitude,Pricesheet,Recommends) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      User.ShopName,
      User.OwnerName,
      User.ContactNo,
      User.ShopAddress,
      User.Pincode,
      User.Emailid,
      SBUid,
      RBUid,
      ABUid,
      User.Latitude,
      User.Longitude,
      Pricesheet,
      Recommends,
    ],
    (err, result) => {
      if (result.length !== 0) {
        const sqlInsertcreds =
          "INSERT INTO logincredstb (Username,Password,Userid,type) VALUES (?,?,?,?)";
        db.query(
          sqlInsertcreds,
          [User.Username, User.Password, result.insertId, "user"],
          (error, answer) => {
            if (answer) {
              res.json({
                message: "ACF added succesfully",
              });
            }
          }
        );
      }
    }
  );
};
