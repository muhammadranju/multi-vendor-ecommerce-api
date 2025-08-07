# Multi-Vendor E-Commerce API

A powerful and scalable RESTful API built with Node.js and Express for managing a multi-vendor e-commerce platform. It includes authentication (with support for Google, Facebook, and Apple OAuth), product and order management, cart, checkout, reviews, and more.

## 🚀 Features

- User, Seller, and Admin authentication with JWT
- Social login (Google, Facebook, Apple)
- Password reset, email verification
- Product, category, and brand management
- Shopping cart and wishlist
- Checkout flow and order tracking
- Review and rating system
- Cloudinary integration for media uploads
- Full multi-vendor support (buyers & sellers)
- Admin panel-ready endpoints

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, OAuth 2.0
- **Email:** Nodemailer, Gmail SMTP
- **File Uploads:** Cloudinary
- **Session & Cookies:** express-session

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/muhammadranju/multi-vendor-ecommerce-api.git
cd multi-vendor-ecommerce-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the demo environment config:

```bash
cp demo.config.env .env
```

Then update `.env` with your actual credentials (DB, OAuth, email, Cloudinary, etc.).

### 4. Start the Development Server

```bash
npm run dev
```

---

## 📚 API Reference

Base URL: `http://localhost:3000/api/v1`

### 🔐 Auth & User Management

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive access/refresh tokens
- `POST /auth/forgot-password` - Send reset email
- `POST /auth/reset-password` - Reset user password
- `GET /auth/google` - Google OAuth login
- `GET /auth/facebook` - Facebook OAuth login
- `GET /auth/apple` - Apple OAuth login
- `POST /auth/logout` - Logout and invalidate token
- `GET /auth/me` - Get authenticated user details
- `PATCH /auth/profile` - Update user profile

### 📦 Products

- `GET /products` - List all products
- `GET /products/:id` - Get a product by ID
- `POST /products` - Create product _(seller only)_
- `PATCH /products/:id` - Update product _(seller only)_
- `DELETE /products/:id` - Delete product _(seller only)_

### 🛒 Cart

- `POST /cart` - Add product to cart
- `GET /cart` - View current user’s cart
- `PATCH /cart/:itemId` - Update quantity
- `DELETE /cart/:itemId` - Remove from cart

### ❤️ Wishlist

- `POST /wishlist` - Add to wishlist
- `GET /wishlist` - View wishlist
- `DELETE /wishlist/:productId` - Remove product

### 🧾 Orders

- `POST /orders` - Place an order
- `GET /orders` - View order history
- `GET /orders/:orderId` - Get single order details
- `PATCH /orders/:orderId/status` - Update order status _(admin/seller)_

### 🧾 Checkout & Payments

- `POST /checkout` - Begin checkout
- `POST /payment` - Process payment _(integration-ready)_

### 🗃️ Categories & Brands

- `GET /categories`
- `POST /categories` _(admin only)_
- `GET /brands`
- `POST /brands` _(admin only)_

### 📝 Reviews

- `POST /reviews` - Add product review
- `GET /reviews/:productId` - Fetch product reviews

---

## 🌍 Environment Variables

Below are required in the `.env` file:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI_LOCAL=mongodb://127.0.0.1:27017

FRONTEND_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=***
GOOGLE_CLIENT_SECRET=***
GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/auth/google/callback

# Facebook OAuth
FACEBOOK_APP_ID=***
FACEBOOK_APP_SECRET=***
FACEBOOK_CALLBACK_URL=http://localhost:3000/api/v1/auth/facebook/callback

# Apple OAuth
APPLE_SERVICE_ID=***
APPLE_TEAM_ID=***
APPLE_KEY_ID=***
APPLE_PRIVATE_KEY_PATH=***
APPLE_CALLBACK_URL=http://localhost:3000/api/v1/auth/apple/callback

# JWT Secrets
ACCESS_TOKEN_SECRET=***
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=***
REFRESH_TOKEN_EXPIRY=30d

SELLER_ACCESS_TOKEN_SECRET=***
SELLER_ACCESS_TOKEN_EXPIRY=1d
SELLER_REFRESH_TOKEN_SECRET=***
SELLER_REFRESH_TOKEN_EXPIRY=30d

ADMIN_ACCESS_TOKEN_SECRET=***
ADMIN_ACCESS_TOKEN_EXPIRY=1d
ADMIN_REFRESH_TOKEN_SECRET=***
ADMIN_REFRESH_TOKEN_EXPIRY=30d

# Admin Credentials
SUPER_ADMIN_EMAIL=***
SUPER_ADMIN_PASSWORD=***

# Cookies & Session
COOKIE_SECRET_KEY=***
SESSION_SECRET=***

# Gmail SMTP
EMAIL=***
EMAIL_PASSKEY=***
EMAIL_SERVICE=***
EMAIL_PORT=***
EMAIL_USERNAME=***
EMAIL_PASSWORD=***

# Cloudinary
CLOUDINARY_CLOUD_NAME=***
CLOUDINARY_API_KEY=***
CLOUDINARY_API_SECRET=***
```

---

## 🧪 Testing

To run the test suite (if implemented):

```bash
npm test
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

---

## 📄 License

MIT License © 2025 [Muhammad Ranju](https://github.com/muhammadranju)

---

## 📫 Contact

For inquiries or support, please contact \[[mdranju23@gmail.com](mailto:mdranju23@gmail.com)]
