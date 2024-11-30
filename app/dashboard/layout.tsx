import Link from "next/link"
import { requireUser } from "@/hooks/require-user"
import Logo from "../../public/logo.png"
import Image from "next/image"
import DashboardLinks from "../components/DashboardLinks"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MenuIcon, Users2 } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { signOut } from "../utils/auth"
import prisma from "../utils/db"
import { redirect } from "next/navigation"
import { Toaster } from "@/components/ui/sonner"

async function getUser(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            firstName: true,
            lastName: true,
            address: true,
        },
    })

    if (!data?.firstName || !data?.lastName || !data?.address) {
        return redirect("/onboarding")
    }
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await requireUser()
    const data = await getUser(session.user?.id as string)

    return (
        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex flex-col max-h-screen h-full gap-2">
                        <div className="h-14 flex border-b items-center px-4 lg:h-[60px] lg:px-6">
                            <Link href="/" className="flex items-center gap-2">
                                <Image src={Logo} alt="logo" className="size-7" />
                                <p className="text-2xl font-bold">
                                    Invoice<span className="text-blue-600">Mailer</span>
                                </p>
                            </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                <DashboardLinks />
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b px-4 bg-muted/40 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="md:hidden">
                                    <MenuIcon className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <nav className="grid gap-2 mt-10">
                                    <DashboardLinks />
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <div className="flex items-center ml-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-full" variant="outline" size={"icon"}>
                                        <Users2 />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={`/dashboard`}>
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/invoices`}>
                                            Invoices
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <form action={async () => {
                                            "use server"
                                            await signOut()
                                        }} className="w-full">
                                            <button type="submit" className="w-full text-left">
                                                Logout
                                            </button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
            <Toaster richColors closeButton theme="light"/>
        </>
    )
}


// export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
//     const session = await requireUser()

//     return (
//         <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//             {/* Sidebar */}
//             <div className="hidden border-r bg-muted/40 md:block">
//                 <div className="flex flex-col max-h-screen h-full gap-2">
//                     {/* Logo Section */}
//                     <div className="h-14 flex border-b items-center px-4 lg:h-[60px] lg:px-6">
//                         <Link href="/" className="flex items-center gap-2">
//                             <Image src={Logo} alt="InvoiceMailer Logo" className="size-8" />
//                             <p className="text-2xl font-bold">
//                                 Invoice<span className="text-blue-600">Mailer</span>
//                             </p>
//                         </Link>
//                     </div>

//                     {/* Navigation */}
//                     <nav className="flex-1 px-2 lg:px-4">
//                         <div className="space-y-1">
//                             <Link 
//                                 href="/dashboard" 
//                                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//                             >
//                                 <LayoutDashboard className="size-5" />
//                                 Dashboard
//                             </Link>
//                             <Link 
//                                 href="/invoices" 
//                                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//                             >
//                                 <FileText className="size-5" />
//                                 Invoices
//                             </Link>
//                         </div>
//                     </nav>
//                 </div>
//             </div>

//             {/* Main Content Area */}
//             <div className="flex flex-col">
//                 {/* Header */}
//                 <header className="flex h-14 items-center gap-4 border-b px-4 bg-muted/40 lg:h-[60px] lg:px-6">
//                     {/* Mobile Menu Toggle */}
//                     <Sheet>
//                         <SheetTrigger asChild>
//                             <Button variant="outline" size="icon" className="md:hidden">
//                                 <Menu className="size-5" />
//                             </Button>
//                         </SheetTrigger>
//                         <SheetContent side="left">
//                             <nav className="grid gap-2 mt-10">
//                                 <Link 
//                                     href="/dashboard" 
//                                     className="flex items-center gap-3 p-2 hover:bg-muted rounded"
//                                 >
//                                     <LayoutDashboard className="size-5" />
//                                     Dashboard
//                                 </Link>
//                                 <Link 
//                                     href="/invoices" 
//                                     className="flex items-center gap-3 p-2 hover:bg-muted rounded"
//                                 >
//                                     <FileText className="size-5" />
//                                     Invoices
//                                 </Link>
//                             </nav>
//                         </SheetContent>
//                     </Sheet>

//                     {/* User Account Dropdown */}
//                     <div className="flex items-center ml-auto">
//                         <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                                 <Button className="rounded-full" variant="outline" size="icon">
//                                     <UserCircle2 className="size-6" />
//                                 </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel className="flex items-center justify-center gap-2">
//                                     My Account
//                                 </DropdownMenuLabel>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem asChild>
//                                     <Link href="/dashboard" className="flex items-center gap-2">
//                                         <LayoutDashboard className="size-4" />
//                                         Dashboard
//                                     </Link>
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem asChild>
//                                     <Link href="/invoices" className="flex items-center gap-2">
//                                         <FileText className="size-4" />
//                                         Invoices
//                                     </Link>
//                                 </DropdownMenuItem>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem asChild>
//                                     <form action={async () => {
//                                         "use server"
//                                         await signOut()
//                                     }} className="w-full">
//                                         <button 
//                                             type="submit" 
//                                             className="flex items-center gap-2 w-full text-left text-red-600"
//                                         >
//                                             <LogOut className="size-4" />
//                                             Logout
//                                         </button>
//                                     </form>
//                                 </DropdownMenuItem>
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                     </div>
//                 </header>

//                 {/* Main Content */}
//                 <main className="flex-1 p-4 md:p-6 lg:p-8">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     )
// }








// export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
//     const session = await requireUser()

//     return (
//         <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//             <div className="hidden border-r bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 md:block">
//                 <div className="flex flex-col max-h-screen h-full gap-2">
//                     <div className="h-14 flex border-b items-center px-4 lg:h-[60px] lg:px-6">
//                         <Link href="/" className="flex items-center gap-2">
//                             <Image src={Logo} alt="logo" className="size-7" />
//                             <p className="text-2xl font-bold">
//                                 Invoice<span className="text-blue-600">Mailer</span>
//                             </p>
//                         </Link>
//                     </div>
//                     <div className="flex-1 overflow-auto">
//                         <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//                             <DashboardLinks />
//                         </nav>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex flex-col">
//                 <header className="flex h-14 items-center gap-4 border-b bg-white dark:bg-gray-950 px-4 lg:h-[60px] lg:px-6">
//                     <Sheet>
//                         <SheetTrigger asChild>
//                             <Button variant="ghost" size="icon" className="md:hidden">
//                                 <MenuIcon className="size-5" />
//                                 <span className="sr-only">Toggle menu</span>
//                             </Button>
//                         </SheetTrigger>
//                         <SheetContent side="left" className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
//                             <nav className="grid gap-2 mt-10">
//                                 <DashboardLinks />
//                             </nav>
//                         </SheetContent>
//                     </Sheet>
//                     <div className="flex items-center ml-auto">
//                         <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                                 <Button className="rounded-full" variant="ghost" size="icon">
//                                     <Users2 className="size-5 text-gray-600 dark:text-gray-400" />
//                                     <span className="sr-only">Open user menu</span>
//                                 </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end" className="w-56">
//                                 <DropdownMenuLabel className="font-normal">
//                                     <div className="flex flex-col space-y-1">
//                                         <p className="text-sm font-medium leading-none">{session.user.name}</p>
//                                         <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
//                                     </div>
//                                 </DropdownMenuLabel>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem asChild>
//                                     <Link href="/dashboard" className="flex items-center">
//                                         <LayoutDashboard className="mr-2 size-4" />
//                                         Dashboard
//                                     </Link>
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem asChild>
//                                     <Link href="/invoices" className="flex items-center">
//                                         <FileText className="mr-2 size-4" />
//                                         Invoices
//                                     </Link>
//                                 </DropdownMenuItem>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem asChild>
//                                     <form action="/logout" className="w-full">
//                                         <button type="submit" className="w-full text-left flex items-center">
//                                             <LogOut className="mr-4 size-4" />
//                                             Logout
//                                         </button>
//                                     </form>
//                                 </DropdownMenuItem>
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                     </div>
//                 </header>
//                 <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     )
// }

