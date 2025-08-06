const User = require("../../../../models/User.model/User.model");
const ApiError = require("../../../../utils/ApiError");
const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const { ApiVersion, UserLoginType } = require("../../../../constants");

const signupController = asyncHandler(async (req, res) => {
  // Get user data from req.body frontend side
  const { name, email, password } = req.body;
  // Validate required fields
  if ((!email, !password)) {
    throw new ApiError(400, "Email and password are required!");
  }

  // Validate password length
  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters long.");
  }

  // Validate first name and last name
  if (!name) {
    throw new ApiError(400, "Name is required.");
  }

  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "This email already exists!");
  }
  // Create a user object
  const user = new User({
    username: email,
    name,
    email,
    password,
    loginType: UserLoginType.LOCAL,
  });

  // Save the user to the database
  await user.save();

  // HATEOAS links
  const links = [
    {
      rel: "self",
      href: `${req.myHost}${ApiVersion}/auth/signup`, // Example URL for signup
      method: "POST",
    },
    {
      rel: "login",
      href: `${req.myHost}${ApiVersion}/auth/login`, // Example URL for Login
      method: "POST",
    },
    {
      rel: "logout",
      href: `${req.myHost}${ApiVersion}/auth/logout`, // Example URL for logging out
      method: "POST",
    },
  ];

  // Respond with a success message
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user, links },
        "User account created successfully!"
      )
    );
});

module.exports = signupController;
