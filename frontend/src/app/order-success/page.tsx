import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 flex items-center justify-center">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
              <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Order Placed Successfully!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Thank you for your purchase. You will receive an email confirmation shortly.
          </p>
          <Button asChild className="mt-6 w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
