const router = require("express").Router();
const injector = require("../services/injector_request");
const users = require("../controllers/usersControllers");
const parser = require("../imageUploadMiddleware/multer");

router.post(
  "/api/v1/adminSignUp",
  parser().single("picture"),
  injector(users.adminSignUp)
);
router.post(
  "/api/v1/customerSignUp",
  parser().single("picture"),
  injector(users.createCustomer)
);
router.post("/api/v1/adminLogin", injector(users.adminLogin));
router.get("/api/v1/getAllCustomer", injector(users.getAllCustomer));
router.get("/api/v1/getCustomerById/:id", injector(users.getCustomerById));
router.post(
  "/api/v1/updateCustomerProfileById/:id",

  injector(users.updateCustomerById)
);
router.post("/api/v1/deleteUserProfileById/:id", injector(users.deleteUserProfile));
module.exports = router;
