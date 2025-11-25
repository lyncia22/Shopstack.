"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { placeOrder } from "@/lib/actions";
import { checkoutSchema } from "@/lib/schemas";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      mobile: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    startTransition(async () => {
      const result = await placeOrder(data);
      if (result.success) {
        toast({
          title: "Order Placed!",
          description: `Your order #${result.orderId} has been successfully placed.`,
        });
        clearCart();
        router.push("/order-success");
      } else {
        toast({
          title: "Error",
          description: result.message || "There was a problem placing your order.",
          variant: "destructive",
        });
      }
    });
  };

  if (cartItems.length === 0 && !isPending) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 text-center">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground mt-2">Add items to your cart before checking out.</p>
            <Button asChild className="mt-6">
                <Link href="/">Return to Shop</Link>
            </Button>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Checkout</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader><CardTitle>Shipping Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="mobile" render={({ field }) => (
                  <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Payment Details (Mock)</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="cardNumber" render={({ field }) => (
                  <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder=".... .... .... ...." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="expiryDate" render={({ field }) => (
                    <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cvc" render={({ field }) => (
                    <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader><CardTitle>Your Order</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="truncate pr-2">{item.product.name} x {item.quantity}</span>
                    <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
                <Separator className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                  {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Placing Order...</> : "Place Order"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
