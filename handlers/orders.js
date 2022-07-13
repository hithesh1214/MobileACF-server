const { db } = require("../util/admin");

exports.addorder = (req, res) => {
  const ACFid = req.body.ACFid;
  const User = JSON.stringify(req.body.Userdet);
  const Services = JSON.stringify(req.body.Servicedet);
  const recommendation = JSON.stringify(req.body.recom);
  const date = new Date().toISOString();
  const sqlInsertorder =
    "INSERT INTO orderstb (User,Service,recommendation,date,ACFid) VALUES (?,?,?,?,?)";
  db.query(
    sqlInsertorder,
    [User, Services, recommendation, date, ACFid],
    (err, result) => {
      // console.log(err);
      if (result) {
        res.json({
          message: "Order Placed",
        });
      }
    }
  );
};

exports.getorders = (req, res) => {
  const ACFid = req.body.ACFid;
  const sqlSelect = "SELECT * FROM orderstb WHERE ACFid = ? ";
  db.query(sqlSelect, [ACFid], (err, result) => {
    // console.log(err);
    // console.log(result);
    res.send(result);
  });
};
