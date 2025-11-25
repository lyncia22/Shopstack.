"use server";

import { z } from "zod";
import { checkoutSchema } from "@/lib/schemas";

export async function placeOrder(data: z.infer<typeof checkoutSchema>) {
  try {
    const validatedData = checkoutSchema.parse(data);

    // Simulate backend processes:
    // 1. Process payment with a mock gateway
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    console.log("Payment processed for:", validatedData.name);

    // 2. Update inventory (mock)
    console.log("Inventory updated.");

    // 3. Create order in database (mock)
    const orderId = `order_${Math.random().toString(36).substr(2, 9)}`;
    console.log(`Order ${orderId} created.`);
    
    // 4. Send email confirmation (mock)
    console.log(`Order confirmation email sent to ${validatedData.email}`);
    
    return { success: true, orderId: orderId };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    console.error("Checkout error:", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
