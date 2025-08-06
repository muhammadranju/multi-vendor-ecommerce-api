const ApiError = require("../utils/ApiError");

function userAgent(req, res, next) {
  try {
    const reqHeaders = req.headers["user-agent"]?.toLowerCase() || "";

    const allowedDevices = [
      "windows",
      "android",
      "iphone",
      "ipad",
      "macintosh",
      "linux",
      "ubuntu",
      "aarch64",
      "intel mac os",
      "x11",
      "crios",
      "samsung",
      "huawei",
      "miui",
      "oppo",
      "vivo",
      "oneplus",
      "nokia",
      "chrome",
      "firefox",
      "edg",
    ];

    const isAllowed = allowedDevices.some((device) =>
      reqHeaders.includes(device)
    );

    if (!isAllowed) {
      console.log("Blocked User-Agent:", req.headers["user-agent"]);
      return res.status(403).json(
        new ApiError(403, "Access declined", {
          message: "Access declined",
          error: {
            userAgent: req.headers["user-agent"],
            message: "This user agent is not supported!",
          },
        })
      );
    }

    return next();
  } catch (error) {
    next(error);
  }
}

module.exports = userAgent;
