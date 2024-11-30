import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-10" />
        <h3 className="text-3xl font-semibold">
          Invoice<span className="text-blue-500">Mailer</span>
        </h3>
      </Link>
      <Link href="/login">
        <Button className="bg-blue-500 hover:bg-blue-600" size={"lg"}>Get Started</Button>
      </Link>
    </div>
  );
}