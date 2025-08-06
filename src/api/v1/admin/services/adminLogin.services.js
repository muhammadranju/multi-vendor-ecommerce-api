const AdminUser = require("../../../../models/AdminUser/AdminUser");
const Role = require("../../../../models/Role.model/Role.model");
const { options } = require("../../../../routes/auth.routes/auth.routes");
const ApiError = require("../../../../utils/ApiError");
const compareBcryptPassword = require("../../../../utils/compareBcryptPassword");
const generateUserTokens = require("../../../../utils/userTokens");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

const adminLoginController = async (req, res) => {
  // Extract data from the frontend or request body
  const { email, username, password } = req.body;

  // Validate the received data for correctness
  // This step could involve checking for required fields and data formats
  // It ensures that the received data is properly structured and conforms to expectations
  validateFieldsCheck(req.body, ["email", "password"]);

  // Search for the email in the database to verify if it exists
  // This step queries the database to find if the provided email exists in the records
  const admin = await AdminUser.findOne({
    $or: [{ email }, { username }],
  });

  // find role
  const role = await Role.findById(admin.role);

  // if admin not found
  if (!admin) {
    throw new ApiError(400, "Invalid credentials.");
  }

  // If the email is not found in the database, throw an error message "Invalid credentials, email or password."
  // This error message indicates that either the email provided is not registered or the combination of email and password is incorrect

  // Compare the password provided by the admin with the stored password in the database
  // This step involves verifying the password provided by the user against the hashed password stored in the database
  const comparePassword = await compareBcryptPassword(password, admin.password);
  if (!comparePassword) {
    throw new ApiError(400, "Invalid credentials, email or password.");
  }

  // If the password matches:
  // - Generate a admin access_token and save it into cookies for authentication
  // - This access_token is typically a secure token used for subsequent authenticated requests
  // - Storing it in cookies ensures persistence across requests and sessions

  const { accessToken, refreshToken } = generateUserTokens(admin, role);

  // HATEOAS links
  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/admin/auth/login`,
      method: "POST",
      description: "Login to your admin account",
    },
    {
      rel: "profile",
      href: `${host}/admin/profile`,
      method: "GET",
      description: "",
    },
  ];
  res.cookie("refreshToken", refreshToken, options);
  res.cookie("accessToken", accessToken, options);
  // eslint-disable-next-line no-unused-vars
  const { password: pass, ...data } = admin.toObject();

  return { accessToken, refreshToken, user: data, links };
};

module.exports = adminLoginController;
