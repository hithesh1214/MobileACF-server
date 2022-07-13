const { db } = require("../util/admin");

exports.getServiceCount = (req, res) => {
  const ACFid = req.body.ACFid;
  const sqlSelect = "SELECT * FROM orderstb WHERE ACFid=?";
  db.query(sqlSelect, [ACFid], (err, result) => {
    var orders = [];
    result.map((row) => {
      // console.log(JSON.parse(row.Service));
      orders = orders.concat(JSON.parse(row.Service).Orders);
    });
    var counts = {};
    orders.map((row) => {
      if (row.Servicename in counts) {
        counts[row.Servicename]++;
      } else {
        counts[row.Servicename] = 1;
      }
    });
    var Services = [];
    for ([key, val] of Object.entries(counts)) {
      Services.push({ name: key, amount: val });
    }
    res.send(Services);
  });
};

exports.getVechileCount = (req, res) => {
  const ACFid = req.body.ACFid;
  const sqlSelect = "SELECT * FROM orderstb WHERE ACFid=?";
  db.query(sqlSelect, [ACFid], (err, result) => {
    var counts = {};
    result.map((row) => {
      var vech = JSON.parse(row.Service).Vechilecat;
      if (vech in counts) {
        counts[vech]++;
      } else {
        counts[vech] = 1;
      }
    });
    var Vechiles = [];
    for ([key, val] of Object.entries(counts)) {
      Vechiles.push({ name: key, amount: val });
    }
    res.send(Vechiles);
  });
};

exports.getRevenue = (req, res) => {
  const ACFid = req.body.ACFid;
  const sqlSelect = "SELECT * FROM orderstb WHERE ACFid=?";
  db.query(sqlSelect, [ACFid], (err, result) => {
    var orders = {};
    result.map((row) => {
      var serv = JSON.parse(row.Service);
      if (serv.Vechilecat in orders) {
        orders[serv.Vechilecat] = orders[serv.Vechilecat].concat(serv.Orders);
      } else {
        orders[serv.Vechilecat] = serv.Orders;
      }
    });
    var vech_rev = {};
    for ([key, val] of Object.entries(orders)) {
      temp = {};
      val.map((row) => {
        if (row.Servicename in temp) {
          temp[row.Servicename] += row.cost;
        } else {
          temp[row.Servicename] = row.cost;
        }
      });
      vech_rev[key] = temp;
    }
    var revenue = [];
    for ([key, val] of Object.entries(vech_rev)) {
      temp = { name: key };
      for ([k, v] of Object.entries(val)) {
        temp[k] = v;
      }
      revenue.push(temp);
    }
    // console.log(revenue);
    res.send(revenue);
  });
};
