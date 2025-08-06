const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");
const { changePasswordService } = require("../services");

const changePasswordController = asyncHandler(async (req, res) => {
  // change password service
  const user = await changePasswordService(req.body, req);

  const host = req.apiHost;
  // HATEOAS links
  const links = [
    {
      rel: "logout",
      href: `${host}/auth/logout`,
      method: "POST",
      description: "Logout",
    },
    {
      rel: "reset_password",
      href: `${host}/auth/reset-password`,
      method: "PATCH",
      description: "Reset Password",
    },
    // Add more links as needed
  ];
  // Respond with success message
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userId: user._id },
        links,
        "Password was change successfully."
      )
    );
});

module.exports = changePasswordController;
