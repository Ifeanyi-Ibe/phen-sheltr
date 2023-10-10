const Api = require("../models/api");

class ApiController {
  constructor() {}

  static add = async (req, res) => {
    const apiKey = "slkfdjqiwoejrqlqwek2134qwerqwe";
    try {
      const { serviceName, originUrl } = req.body;

      console.log(serviceName, originUrl);

      const newApi = await Api.create({ serviceName, originUrl, apiKey });

      res.send({ api: newApi, apiKey });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = ApiController;
