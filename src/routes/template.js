const router = require("express").Router();
const displayTemplate = require("../controllers/templateControllers");
const injector = require("../services/injector_request");

router.post("/api/v1/createTemplate", injector(displayTemplate.createTemplate));
router.get("/api/v1/getAllProject", injector(displayTemplate.getAllTemplate));
router.get(
  "/api/v1/getSingleProject",
  injector(displayTemplate.getSingleTemplate)
);

module.exports = router;
