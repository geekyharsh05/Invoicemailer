import { buttonVariants } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

interface iAppProps {
    title: string;
    description: string;
    buttontext: string;
    href: string;
}

export function EmptyState({
    buttontext,
    description,
    href,
    title,
}: iAppProps) {
    return (
        <div className="flex flex-col flex-1 h-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 text-center animate-in fade-in-50 hover:shadow-lg transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-center size-24 rounded-full bg-primary/10 mb-4 transform hover:scale-110 transition-transform duration-300 ease-in-out shadow-md">
                <Ban className="size-12 text-primary/80 hover:text-primary transition-colors duration-300" />
            </div>
            <h2 className="mt-2 text-2xl font-bold text-gray-800 mb-3 tracking-tight">
                {title}
            </h2>
            <p className="mb-8 text-sm text-gray-600 max-w-md mx-auto text-center opacity-80 hover:opacity-100 transition-opacity duration-300">
                {description}
            </p>
            <Link
                href={href}
                className={`${buttonVariants({ variant: "default" })} group relative overflow-hidden`}
            >
                <PlusCircle className="size-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                <span className="relative z-10">{buttontext}</span>
                <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
            </Link>
        </div>
    );
}

export default EmptyState;