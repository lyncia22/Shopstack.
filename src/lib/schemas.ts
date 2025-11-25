import { z } from "zod";

const addressSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid mobile number"),
});

const paymentSchema = z.object({
  cardNumber: z.string().length(16, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().length(3, "CVC must be 3 digits"),
});

export const checkoutSchema = addressSchema.merge(paymentSchema);
