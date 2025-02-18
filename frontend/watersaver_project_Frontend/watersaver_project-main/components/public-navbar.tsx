import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Waves } from "lucide-react"

export function PublicNavbar() {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Waves className="h-6 w-6 text-blue-600" />
          <Link href="/" className="text-xl font-semibold">
            Watersaver
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700">Register</Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

