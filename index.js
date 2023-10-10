const app = require("./app");
const connectToMongoose = require("./config/dbConnector");
require("dotenv").config();

const PORT = process.env.PORT || 5002;

connectToMongoose().then(() =>
  app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`))
);
