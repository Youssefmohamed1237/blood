const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const compression = require("compression");
const globalErrorHandler = require("./controller/globalcontroller");
const donorroute = require("./routs/donorrouter");
const needroute = require("./routs/needrouter");
const placeroute = require("./routs/placerouter");
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(compression());
app.use("/api/donor", donorroute);
app.use("/api/need", needroute);
app.use("/api/place", placeroute);
app.use(globalErrorHandler);
module.exports = app;

