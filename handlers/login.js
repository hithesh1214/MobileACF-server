const { db } = require("../util/admin");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const username = req.body.usernamelogin;
  const password = req.body.passwordlogin;
  const sqlLogin = "SELECT * FROM logincredstb WHERE Username = ?";
  db.query(sqlLogin, [username], (err, result) => {
    if (result.length > 0) {
      if (password === result[0].Password) {
        const id = result[0].id;
        const token = jwt.sign({ id }, "ApolloTryes", {
          expiresIn: 60 * 60,
        });
        req.session.user = result;
        res.json({
          auth: true,
          token: token,
          result: result,
        });
      } else {
        res.json({
          auth: false,
          message: "Wrong username/password combination",
        });
      }
    } else {
      res.json({
        auth: false,
        message: "User not registered",
      });
    }
  });
};

exports.logincheck = (req, res) => {
  if (req.session.user) {
    res.json({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.json({
      loggedIn: false,
    });
  }
};
