import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/hero.png";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "../utils/auth";

export default async function Hero() {
  const session = await auth();

  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center px-4 sm:px-8">
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

        <p className="max-w-xl mx-auto mt-4 text-muted-foreground text-lg sm:text-xl lg:text-2xl">
          Creating Invoices can be a pain! We at InvoiceMailer make it super
          easy for you to get paid in time!
        </p>

        <div className="mt-7 mb-12">
          <Link href={session?.user ? "/dashboard" : "/login"}>
            <Button
              className="bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 lg:mt-0"
              size="lg"
            >
              {session?.user ? "Go To Dashboard" : "Get Unlimited Access"}
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative flex justify-center w-full mt-12 px-2 sm:px-8">
        <div className="relative p-[2px] rounded-lg lg:rounded-2xl bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 animate-gradient">
          <Image
            src={HeroImage}
            alt="Hero image"
            className="object-cover w-full max-w-4xl lg:max-w-6xl rounded-lg lg:rounded-2xl shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}