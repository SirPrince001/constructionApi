require("../imageUploadMiddleware/cloudinary");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const { Response, ResponseError } = require("../utils/responses");
require("dotenv").config();

exports.adminSignUp = async (request) => {
  let values = { ...request.body, picture: request.file.path };
  values.password = bcrypt.hashSync(request.body.password, 12);
  // check if admin email already exist
  let existAdmin = await User.findOne({ email: request.body.email });

  if (!existAdmin) {
    //create new Admin
    let newAdmin = new User({
      name: values.name,
      picture: values.picture,
      email: values.email,
      password: values.password,
      phone: values.phone,
      role: values.role,
    });
    let userData = await newAdmin.save();
    userData = userData.toJSON();
    delete userData.password;

    return new Response(200, [{ status: "Success", message: userData }]);
  } else {
    return  new ResponseError(500, "User email already exist");
  }
};

exports.createCustomer = async (request) => {
  let values = { ...request.body, picture: request.file.path };
  values.password = bcrypt.hashSync(request.body.password, 12);

  let existCustomer = await User.findOne({ email: request.body.email });
  if (!existCustomer) {
    let newCustomer = new User({
      name: values.name,
      picture: values.picture,
      email: values.email,
      phone: values.phone,
      password: values.password,
      role: values.role,
    });

    let customer = await newCustomer.save();
    customer = customer.toJSON();
    delete customer.password;
    return new Response(200, { status: "Sucess", message: customer });
  } else {
    return new ResponseError(500, {
      status: "error",
      message: "Cannot create new customer, try again with another email",
    });
  }
};

exports.adminLogin = async (request) => {
  //check if user is login

  const adminLogin = await User.findOne({ email: request.body.email });

  if (!adminLogin) return new ResponseError(400, "User email not exist");
  if (!bcrypt.compareSync(request.body.password, adminLogin.password))
   return new ResponseError(400, "Admin password do not match");

  const payLoad = {
    name: adminLogin.name,
    email: adminLogin.email,
    phone: adminLogin.phone,
    role: adminLogin.role,
  };

  const userToken = jwt.sign(payLoad, process.env.SECRETKEY);

  return new Response(200, [
    {
      status: "Login Successful",
      responseMessage: adminLogin,
      userToken: userToken,
    },
  ]);
};

exports.getAllCustomer = async (request) => {
  try {
    const allCustomers = await User.find({ role: "customer" });
    console.log(allCustomers);

    return new Response(200, {
      status: "success",
      responseMessage: allCustomers,
    });
  } catch (error) {
    return new ResponseError(400, {
      status: "error",
      responseMessage: "Failed to fetech Customer" + error,
    });
  }
};

// get a single custome by ID
exports.getCustomerById = async (request) => {
  try {
    const customerId = request.params.id;
    let singleCustomer = await User.findById({ _id: customerId });
    console.log(singleCustomer);
    return new Response(200, {
      status: "Success",
      responseMessage: singleCustomer,
    });
  } catch (error) {
    throw new ResponseError(400, {
      status: "error",
      responseMessage: "Failed to get a User" + error,
    });
  }
};

//update customer by Id

exports.updateCustomerById = async (request) => {
  let token = request.headers.authorization;
  if (!token) throw new ResponseError(400, "Please provide token");
  // accept and check if your have token
  token = token.split(" ")[1];
  let decoded = jwt.verify(token, process.env.SECRETKEY);

  if (decoded.role === "admin") {
    console.log(decoded.role);
    let { name, picture, email, phone } = request.body;
    const updateProfile = await User.findByIdAndUpdate(
      request.params.id,
      { name, picture, email, phone },
      { new: true }
    );
    console.log(updateProfile);
    return new Response(200, {
      status: "success",
      responseMessage: updateProfile,
    });
  } else {
    throw new ResponseError(400, {
      responseMessage: "Failed to update customer profile",
    });
  }
};

// Delete user by ID

exports.deleteUserProfile = async (request) => {
  let token = request.headers.authorization;
  if (!token)
    throw new ResponseError(400, {
      status: "error",
      responseMessage: "Please provide token",
    });

  token = token.split(" ")[1];
  const payload = jwt.verify(token, process.env.SECRETKEY);

  if (payload.role === "admin") {
    let userId = request.params.id;
    await User.findByIdAndDelete(userId);
    return new Response(200, {
      status: "success",
      responseMessage: `The user with this ID ${userId} have been deleted successfully`,
    });
  } else {
    throw new ResponseError(400, {
      status: "error",
      responseMessage: `Failed to delete a user`,
    });
  }
};


exports.logoutUser = async(request)=>{
  request.logout()
}