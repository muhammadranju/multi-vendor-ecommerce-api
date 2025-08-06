const Category = require("../../../../../models/Category.model/Category.model");
const ApiError = require("../../../../../utils/ApiError");
const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");

const categoriesUpdateController = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name, description, image } = req.body;
  const host = req.apiHost;

  // Find the category using category_url
  const category = await Category.findOne({ category_url: categoryId }).select(
    "name description image isActive category_url"
  );

  if (!category) {
    throw new ApiError(404, "This Category not found.");
  }

  // Update the category fields
  category.name = name ?? category.name;
  category.description = description ?? category.description;
  category.image = image ?? category.image;

  // Save the updated category
  await category.save();

  const links = [
    {
      rel: "self",
      href: `${host}/categories/${categoryId}`,
      method: "GET",
      description: "Retrieve the updated category",
    },
    {
      rel: "delete_category",
      href: `${host}/categories/${categoryId}`,
      method: "DELETE",
      description: "Delete the updated category",
    },
  ];

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { category, links },
        "Category updated successfully."
      )
    );
});

module.exports = categoriesUpdateController;

// const Category = require("../../../../../models/Category.model/Category.model");
// const ApiError = require("../../../../../utils/ApiError");
// const ApiResponse = require("../../../../../utils/ApiResponse");
// const asyncHandler = require("../../../../../utils/asyncHandler");

// const categoriesUpdateController = asyncHandler(async (req, res) => {
//   // get category by id come form params categoryId
//   const { categoryId } = req.params;

//   const { name, description, image } = req.body;

//   // check the category id from database is exits or not
//   const categories = await Category.findOne({
//     category_url: categoryId,
//   })?.select("name description image isActive category_url");

//   // check data from database it's have database
//   if (!categories) {
//     throw new ApiError(404, "This Category not found.");
//   }
//   // if category is exits then update the category by id
//   categories.name = name ?? categories.name;
//   categories.description = description ?? categories.description;
//   categories.image = image ?? categories.image;

//   // then save the data in to the database
//   await categories.save();

//   const host = req.apiHost;

//   const links = [
//     {
//       rel: "self",
//       href: `${host}/categories/${categoryId}`,
//       method: "GET",
//       description: "Retrieve the updated category",
//     },
//     {
//       rel: "delete_category",
//       href: `${host}/categories/${categoryId}`,
//       method: "DELETE",
//       description: "Delete the updated category",
//     },
//   ];
//   return res
//     .status(200)
//     .json([
//       new ApiResponse(
//         200,
//         { categories, links },
//         "Category update successfully."
//       ),
//     ]);
// });

// module.exports = categoriesUpdateController;
