const ApiResponse = require("../../../../utils/ApiResponse");
const asyncHandler = require("../../../../utils/asyncHandler");

const verify = asyncHandler(async (req, res) => {
  try {
    const { userId, name, email, role } = req.user;

    // const role

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: {
            userId,
            name,
            email,
            role,
          },
        },
        "Successfully verified!"
      )
    );
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = verify;
