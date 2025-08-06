const asyncHandler = require("../../../../utils/asyncHandler");
const ApiResponse = require("../../../../utils/ApiResponse");
const { adminLoginServices } = require("../services");

const adminLoginController = asyncHandler(async (req, res) => {
  const {
    accessToken,
    refreshToken,
    user: data,
    links,
  } = await adminLoginServices(req, res);

  // This response could include a success message or any relevant data indicating a successful login
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken, user: data, links },
        "Admin logging in account successfully."
      )
    );
});

module.exports = adminLoginController;
