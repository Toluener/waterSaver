import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">WaterSaver</h3>
          <p className="text-sm opacity-90">Making water conservation easy and accessible for everyone.</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2">
            <Link href="/" className="block text-sm hover:opacity-80 transition-opacity">
              Home
            </Link>
            <Link href="/dashboard/calculator" className="block text-sm hover:opacity-80 transition-opacity">
              Calculators
            </Link>
            <Link href="/dashboard/tips" className="block text-sm hover:opacity-80 transition-opacity">
              Tips
            </Link>
            <Link href="/dashboard/about" className="block text-sm hover:opacity-80 transition-opacity">
              About
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <div className="space-y-2">
            <Link href="/faq" className="block text-sm hover:opacity-80 transition-opacity">
              FAQ
            </Link>
            
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="hover:opacity-80">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:opacity-80">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:opacity-80">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:opacity-80">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

