const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("no");
  } else {
    jwt.verify(token, "ApolloTryes", (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: "failed to authenticate",
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
