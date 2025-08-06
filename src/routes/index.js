const router = require("express").Router();

// const moduleRoutes=[
//     {
//         path:"/dashboard",
//         route:require("./dashboard.routes/dashboard.routes")
//     },
//     {
//         path:"/users",
//         route:require("./users.routes/users.routes")
//     },

// ]

// user routes, [reviews, address]
const reviewsRoutes = require("./reviews.routes/reviews.routes");
const addressRoutes = require("./address.routes/address.routes");
const userRoutes = require("./users.routes/users.routes");
router.use("/users", [userRoutes, reviewsRoutes, addressRoutes]);

// dashboard routes
const dashboardRoutes = require("./dashboard.routes/dashboard.routes");
router.use("/dashboard", dashboardRoutes);

// auth routes
const authRoutes = require("./auth.routes/auth.routes");
router.use("/auth", authRoutes);

// admin routes
const adminAuthRoutes = require("./admin.routes/admin.auth.routes");
const adminRoutes = require("./admin.routes/admin.routes");
router.use("/admin", [adminRoutes, adminAuthRoutes]);

// carts routes
const cartsRoutes = require("./carts.routes/carts.routes");
router.use("/carts", cartsRoutes);

// orders routes
const ordersRoutes = require("./orders.routes/orders.routes");
router.use("/orders", ordersRoutes);

// payment routes
const paymentRoutes = require("./payment.route/payment.routes");
router.use("/payment", paymentRoutes);

// category routes
const categoriesRoutes = require("./category.routes/category.routes");
router.use("/categories", categoriesRoutes);

// brand routes
const brandRoutes = require("./brand.routes/brand.routes");
router.use("/brands", brandRoutes);

// wishlist routes
const wishlistRoutes = require("./wishlists.routes/wishlists.routes");
router.use("/wishlists", wishlistRoutes);

// product routes and comments
const productRoutes = require("./products.routes/products.routes");
const commentsRoutes = require("./comment.router/comment.routes");
router.use("/products", [productRoutes, commentsRoutes]);

// defined a seller routers
const sellerRoutes = require("./seller.routes/seller.routes");
router.use("/seller", sellerRoutes);

// defined a store routers
const storeRoutes = require("./store.routes/store.routes");
router.use("/stores", storeRoutes);

// moduleRoutes.forEach(module=>{
//     router.use(module.path,module.route)
// })

module.exports = router;
