const ApiError = require("./ApiError");

/**
 * Validates the required fields for creating a product.
 * @param {Object} body The request body.
 */
function validateFieldsCheck(body, requiredFields) {
  const missingFields = requiredFields.filter((field) => !body[field]);
  if (missingFields.length > 0) {
    throw new ApiError(
      400,
      `Missing required fields: ${missingFields.join(", ")}`
    );
  }
}

module.exports = validateFieldsCheck;
