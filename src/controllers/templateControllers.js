const { Response, ResponseError } = require("../utils/responses");
const Template = require("../models/template");
require("dotenv").config();

exports.createTemplate = async (request) => {
  // check if Template exist
  let { templateName, stages } = request.body;
  console.log(request.body);

  //let existingTemplate = await Template.find({templateName:request.body.templateName})

  let newTemplate = new Template({
    templateName,
    stages,
  });

  let templateData = await newTemplate.save();
  console.log(templateData);
  return new Response(200, {
    status: "Success",
    responseMessage: templateData,
  });
};

// Get template

exports.getAllTemplate = async (request) => {
  const template = await Template.find({});
  if (template) {
    return new Response(200, { status: "Success", responseMessage: template });
  } else {
    throw new ResponseError(400, {
      status: "Error",
      responseMessage: "Cannot get template",
    });
  }
};

exports.getSingleTemplate = async (request) => {
  const singleTemplate = await Template.findById({ _id: request.params.id });
  if (singleTemplate) {
    return new Response(200, {
      status: "Success",
      responseMessage: singleTemplate,
    });
  } else {
    throw new ResponseError(400, {
      status: "Error",
      responseMessage: "Failed to get a template by Id",
    });
  }
};
