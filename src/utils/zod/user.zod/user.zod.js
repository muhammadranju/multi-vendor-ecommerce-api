const { z } = require("zod");
const userSchema = z.object({
  avatar: z.string().optional(),
  username: z.string().min(2),

  email: z.string().email({ pattern: z.regexes.email }),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(10),
  address: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(5),
  country: z.string().min(2),
  isSeller: z.boolean(),
  isCustomer: z.boolean(),
  isAdmin: z.boolean(),
  isSuperAdmin: z.boolean(),
  sellerId: z.string().min(1),
  customerId: z.string().min(1),
  adminId: z.string().min(1),
  superAdminId: z.string().min(1),
});

module.exports = userSchema;
