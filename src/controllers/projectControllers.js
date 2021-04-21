require("../imageUploadMiddleware/cloudinary");
const Project = require("../models/project");
const jwt = require("jsonwebtoken");
const { Response, ResponseError } = require("../utils/responses");

require("dotenv").config();

exports.createProject = async (request) => {
  // check if a project exist else create new project

  const existingProject = await Project.findOne({ _id: request.body.id });

  if (!existingProject) {
    let values = { ...request.body, projectImage: request.file.path };
    const newProject = new Project({
      projectName: values.projectName,
      projectImage: values.projectImage,
      latitude: values.latitude,
      longitude: values.longitude,
      customerId: values.customerId,
      templateId: values.templateId,
      projectStatus: values.projectStatus,
    });
    const projectData = await newProject.save();
    console.log(projectData);
    return new Response(200, {
      status: "Success",
      responsMessage: projectData,
    });
  } else {
    throw new ResponseError(400, {
      status: "Error",
      responsMessage: "Failed to create new project",
    });
  }
};

exports.getAllProjects = async (request) => {
  try {
    const allProject = await Project.find({}).populate("projects");
    return new Response(200, { status: "Success", responsMessage: allProject });
  } catch (error) {
    throw new ResponseError(400, {
      status: "Error",
      responsMessage: "Failed to load projects" + error,
    });
  }
};

exports.getSingleProject = async (request) => {
  try {
    const singleProject = await Project.findById({
      _id: request.params.id,
    }).populate("user");
    return new Response(200, {
      status: "Success",
      responsMessage: singleProject,
    });
  } catch (error) {
    throw new ResponseError(400, {
      status: "Error",
      responsMessage: "Failed to load a project" + error,
    });
  }
};

// delete a project by ID

exports.deleteProjectById = async (request) => {
  let token = request.headers.authorization;
  if (!token) throw new ResponseError(400, "Please provide token");

  token = token.split(" ")[1];
  let decodedToken = jwt.verify(token, process.env.SECRETKEY);
  if (decodedToken.role === "admin") {
    let projectId = request.params.id;
    await Project.findByIdAndDelete(projectId);
    return new Response(200, {
      status: "sucesss",
      responsMessage: `Project with this ID ${projectId} have been deleted successfully`,
    });
  } else {
    throw new ResponseError(400, {
      status: "error",
      responsMessage: `Failed to delete a project with this ID ${projectId}`,
    });
  }
};
