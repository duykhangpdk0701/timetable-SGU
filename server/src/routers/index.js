const CrawlDataRoute = require("../routers/CrawlDataRoute");
const AuthRoute = require("../routers/AuthRoute");

const Route = (app) => {
  app.use("/", CrawlDataRoute);
  app.use("/auth", AuthRoute);
};

module.exports = Route;
