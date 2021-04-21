require('../imageUploadMiddleware/cloudinary')
const parser = require('../imageUploadMiddleware/multer')
const router = require("express").Router();
const displayProject = require("../controllers/projectControllers");
const injector = require("../services/injector_request");
require("dotenv").config();

router.post("/api/v1/createProject",  parser().single('projectImage') , injector(displayProject.createProject));
router.get("/api/v1/getAllProjects", injector(displayProject.getAllProjects));
router.get(
  "/api/v1/getProjectById/:id",
  injector(displayProject.getSingleProject)
);

router.post("/api/v1/deleteProjectById/:id" , injector(displayProject.deleteProjectById))

module.exports = router;
