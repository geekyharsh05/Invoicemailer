import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/hero.png";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="inline-flex items-center text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full animate-pulse">
          <Sparkles className="w-4 h-4 mr-2" />
          Unleashing InvoiceMailer 1.0
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter flex flex-col">
          Invoicing just got
          <span className="block mt-2 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text animate-gradient">
            irresistibly simple!
          </span>
        </h1>

        <p className="max-w-xl mx-auto mt-4 text-muted-foreground text-lg lg:text-xl">
          Creating Invoices can be a pain! We at InvoiceMailer make it super
          easy for you to get paid in time!
        </p>

        <div className="mt-7 mb-12">
          <Link href="/login">
            <Button className="bg-blue-500 hover:bg-blue-600" size={"lg"}>
              Get Unlimted Access
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative items-center w-full py-12 mx-auto mt-12">

        <div className="relative p-[2px] rounded-lg lg:rounded-2xl bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 animate-gradient">
          <Image
            src={HeroImage}
            alt="Hero image"
            className="relative object-cover w-full rounded-lg lg:rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section >
  );
}