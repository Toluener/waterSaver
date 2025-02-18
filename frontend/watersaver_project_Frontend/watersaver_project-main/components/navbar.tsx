import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Waves } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Waves className="h-6 w-6 text-blue-600" />
          <Link href="/" className="text-xl font-semibold">
            Watersaver
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col space-y-4 mt-8">
              <Link
                href="/"
                className="text-lg hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/dashboard/calculator"
                className="text-lg hover:text-blue-600 transition-colors"
              >
                Calculator
              </Link>
              <Link
                href="/about"
                className="text-lg hover:text-blue-600 transition-colors"
              >
                About
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/dashboard"
            className="text-sm hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/dashboard/calculator"
            className="text-sm hover:text-blue-600 transition-colors"
          >
            Calculator
          </Link>

          <Link
            href="/dashboard/tips"
            className="text-sm hover:text-blue-600 transition-colors"
          >
            Tips
          </Link>
          <Link
            href="/dashboard/about"
            className="text-sm hover:text-blue-600 transition-colors"
          >
            About
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/register">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Logout
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
