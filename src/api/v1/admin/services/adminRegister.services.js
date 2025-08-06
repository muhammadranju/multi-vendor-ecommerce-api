const AdminUser = require("../../../../models/AdminUser/AdminUser");
const ApiError = require("../../../../utils/ApiError");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

const adminSignupServices = async (req) => {
  const { name, email, password, role, department } = req.body;

  // Check required fields
  validateFieldsCheck(req.body, ["email", "password", "role", "department"]);

  // Check if email already exists
  const existingUser = await AdminUser.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists.");
  }

  // Create new admin user
  const newAdmin = new AdminUser({ name, email, password, role, department });
  await newAdmin.save();

  // HATEOAS links
  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/admin/auth/signup`,
      method: "POST",
      description: "Sign up to your admin account",
    },
    {
      rel: "login",
      href: `${host}/admin/auth/login`,
      method: "GET",
      description: "Login to your admin account",
    },
  ];

  const userInfo = {
    user_id: newAdmin._id,
    email: newAdmin.email,
    role: role?.name,
  };

  return { user: userInfo, links };
};

module.exports = adminSignupServices;
