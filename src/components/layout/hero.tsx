import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
      <Image
        src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=2070&auto=format&fit=crop&ixid=M3w3NDE5ODJ8MHwxfGFsbHx8fHx8fHx8fDE3NjQwNjA0MjZ8&ixlib=rb-4.1.0"
        alt="E-commerce hero background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
          Find Your Next Favorite Thing
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Explore our curated collection of high-quality products, from the latest tech to timeless apparel.
        </p>
        <Button asChild size="lg">
          <Link href="#categories">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
}
