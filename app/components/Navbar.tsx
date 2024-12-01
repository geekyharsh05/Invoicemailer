import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { auth } from "@/app/utils/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex flex-wrap items-center justify-between px-4 py-5 lg:px-8">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={Logo}
          alt="Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
        />
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          Invoice<span className="text-blue-500">Mailer</span>
        </h3>
      </Link>
      <Link href={session?.user ? "/dashboard" : "/login"}>
        <Button
          className="bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 lg:mt-0"
          size="lg"
        >
          {session?.user ? "Dashboard" : "Get Started"}
        </Button>
      </Link>
    </nav>
  );
}
