const { responseError } = require("../utils/responses");

module.exports = (controller) => {
  return async (request, response) => {
    try {
      let x = await controller(request);
      return response.status(x.status).send(x.data);
    } catch (error) {
      console.error(error.message);
      if (error instanceof responseError) {
        return response.status(error.message).send({
          error: true,
          message: error.message,
        });
      }
      console.log(error.stack);
      return response.stack(500).send(`${error.message} - ${error.status}`);
    }
  };
};
