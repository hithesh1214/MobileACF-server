const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

const verifyJWT = require("./util/Authentication");

const { login, logincheck } = require("./handlers/login");
const { getSBU, addSBU } = require("./handlers/SBUs");
const { getRBU, addRBU } = require("./handlers/RBUs");
const { getABU, addABU } = require("./handlers/ABUs");
const { getACF, addACF, getACFdet } = require("./handlers/ACFs");
const { getService, addService } = require("./handlers/Services");
const { getVechile, addVechile } = require("./handlers/Vechiles");
const { getTyre, addTyre } = require("./handlers/Tyres");
const { getTyreBrand, getTyreSize } = require("./handlers/Tyres");
const { getorders, addorder } = require("./handlers/orders");
const {
  getServiceCount,
  getVechileCount,
  getRevenue,
} = require("./handlers/Analysis");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "ApolloTryes",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// app.get("/Auth", verifyJWT, (req, res) => {
//   res.send("hello");
// });

//login routes
app.post("/login", login);
app.get("/login", logincheck);

//SBU routes
app.get("/getSBU", getSBU);
app.post("/addSBU", addSBU);

//RBU rpoutes
app.post("/getRBU", getRBU);
app.post("/addRBU", addRBU);

//ABU routes
app.post("/getABU", getABU);
app.post("/addABU", addABU);

//ACF routes
app.post("/getACF", getACF);
app.post("/addACF", addACF);
app.post("/getACFdet", getACFdet);

//Service routes
app.get("/getService", getService);
app.post("/addService", addService);

//Tyre routes
app.get("/getTyre", getTyre);
app.post("/addTyre", addTyre);
app.post("/gettyresize", getTyreSize);
app.post("/gettyrebrand", getTyreBrand);

//Vechile routes
app.get("/getVechile", getVechile);
app.post("/addVechile", addVechile);

//order routes
app.post("/addorder", addorder);
app.post("/getorders", getorders);

//analysis routes
app.post("/getservicecount", getServiceCount);
app.post("/getvechilecount", getVechileCount);
app.post("/getrevenue", getRevenue);

app.listen(3001, () => {
  console.log("running on port 3001");
});
