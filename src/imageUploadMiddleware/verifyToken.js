const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyAdminToken(request, next) {
  let token = request.headers.authorization;
  console.log(token);
  if (!token) throw new ResponseError(400, "Please provide token");
  // accept and check if your have token

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRETKEY, (error, decoded) => {
      if(error)console.log(error)
    if (decoded.role === "admin") {
      
    } else {
      throw new ResponseError(400, {
        response: "error",
        errorMessage: error.message,
      });
    }
  });
  next();
}

module.exports = verifyAdminToken;
