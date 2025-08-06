const { default: slugify } = require("slugify");
const ApiError = require("../../../../utils/ApiError");
const asyncHandler = require("../../../../utils/asyncHandler");
const Brand = require("../../../../models/Brand.model/Brand.model");
const ApiResponse = require("../../../../utils/ApiResponse");
const validateFieldsCheck = require("../../../../utils/validateFieldsCheck");

const createBrandController = asyncHandler(async (req, res) => {
  // Extract data from the request body or frontend: name, description, logo, website, socialMedia
  const { name, description, logo, website, socialMedia } = req.body;

  // Check if all required data is provided
  validateFieldsCheck(req.body, [
    "name",
    "description",
    "logo",
    "website",
    "socialMedia",
  ]);

  // Normalize the brand URL using the slugify library
  const normalizedUrl = slugify(name, { lower: true });

  // Check if a brand with the same URL already exists in the database
  const existingBrand = await Brand.findOne({ slug: normalizedUrl });
  console.log(existingBrand);

  //you need to fix existingBrand, the normalizedUrl is not working,
  // it is not creating a brand with the same name as an existing brand in the database
  if (existingBrand) {
    // If a brand with the same URL exists, throw a 400 Bad Request error
    throw new ApiError(400, "brand name already exits");
  }

  // If all data is valid and unique, create a new Brand instance
  const brand = new Brand({ name, description, logo, website, socialMedia });

  // Save the new brand to the database
  await brand.save();

  // HATEOAS links
  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/brands/${brand.brand_url}`,
      method: "GET",
      description: "Get created brand details",
    },
    {
      rel: "all_brands",
      href: `${host}/brands`,
      method: "GET",
      description: "Get all brands",
    },
    {
      rel: "update_brand",
      href: `${host}/brands/${brand._id}`,
      method: "PUT",
      description: "Update brand details",
    },
    {
      rel: "delete_brand",
      href: `${host}/brands/${brand._id}`,
      method: "DELETE",
      description: "Delete brand",
    },
  ];

  // Send a success response with the created brand details
  return res
    .status(201)
    .json(
      new ApiResponse(201, { brand, links }, "Brand Created successfully.")
    );
});

module.exports = createBrandController;
