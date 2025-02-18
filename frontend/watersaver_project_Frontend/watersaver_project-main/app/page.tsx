import { PublicNavbar } from "@/components/public-navbar";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Facebook,
  Instagram,
  Leaf,
  Linkedin,
  PiggyBank,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: 'url("/home.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-600/50" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Calculate Your Water Savings
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Discover how much water and money you can save by making simple
            changes to your daily habits.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-left p-6 border rounded-xl">
              <Calculator className="size-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Calculation</h3>
              <p className="text-gray-600">
                Input your current water usage and get instant results on
                potential savings.
              </p>
            </div>
            <div className="flex flex-col items-left p-6 border rounded-xl">
              <PiggyBank className="size-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Money Savings</h3>
              <p className="text-gray-600">
                See how much money you could save annually by reducing water
                consumption.
              </p>
            </div>
            <div className="flex flex-col items-left p-6 border rounded-xl">
              <Leaf className="size-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Environmental Impact
              </h3>
              <p className="text-gray-600">
                Understand your contribution to water conservation efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-blue-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src="/hw_1.png"
                  alt="Input Usage"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Usage</h3>
              <p className="text-gray-600">
                Enter your current water consumption data
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src="/hw_2.png"
                  alt="Select Options"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Options</h3>
              <p className="text-gray-600">Choose water-saving alternatives</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src="/hw_3.png"
                  alt="Calculate"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calculate</h3>
              <p className="text-gray-600">Get instant savings calculations</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src="/hw_4.png"
                  alt="Save Results"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Results</h3>
              <p className="text-gray-600">Download your personalized report</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Saving?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users making a difference in water conservation
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 flex items-center justify-between gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">WaterSaver</h3>
            <p className="text-sm opacity-90">
              Making water conservation easy and accessible for everyone.
            </p>
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
    </div>
  );
}
