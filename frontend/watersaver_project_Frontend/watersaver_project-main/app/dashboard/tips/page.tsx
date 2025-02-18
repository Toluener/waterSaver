import { Button } from "@/components/ui/button";
import {
  Car,
  Droplet,
  ShowerHeadIcon as Shower,
  Sprout,
  Timer,
  WashingMachine,
} from "lucide-react";
import Link from "next/link";

const tips = [
  {
    icon: Shower,
    title: "Shorter Showers",
    description: "Reducing shower time by 2 minutes can save up to 10 gallons per shower.",
    savings: "Saves: 3,650 gallons/year",
  },

  {
    icon: Droplet,
    title: "Fix Leaky Faucets",
    description: "A dripping faucet can waste thousands of gallons annually.",
    savings: "Saves: 2,700 gallons/year",
  },

  {
    icon: Timer,
    title: "Turn Off While Brushing",
    description: "Turn off tap while brushing teeth or washing hands.",
    savings: "Saves: 1,825 gallons/year",
  },

  {
    icon: WashingMachine,
    title: "Full Loads Only",
    description: "Only run washing machines with full loads of laundry.",
    savings: "Saves: 2,190 gallons/year",
  },
  
  {
    icon: Sprout,
    title: "Smart Irrigation",
    description: "Water plants early morning or late evening to reduce evaporation.",
    savings: "Saves: 5,475 gallons/year",
  },
  {
    icon: Car,
    title: "Car Washing",
    description: "Use a bucket instead of running hose when washing your car.",
    savings: "Saves: 1,200 gallons/year",
  }
];

export default function TipsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        {/* Hero Section */}
        <section className="bg-sky-200 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Water Saving Tips</h1>
            <p className="text-gray-600 max-w-2xl">
              Discover practical ways to reduce your water consumption and make
              a positive impact on the environment while saving money.
            </p>
          </div>
        </section>

        {/* Tips Grid */}
        <section className="bg-gray-100 px-6 py-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <tip.icon className="h-8 w-8 text-sky-700 mb-4" />
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-gray-600 mb-4">{tip.description}</p>
                <p className="text-sm text-sky-700">{tip.savings}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-sky-200 px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Calculate Your Water Savings
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Use our calculator to see how much water and money you could save by
            implementing these tips.
          </p>
          <Link
            href="/dashboard/calculator"
            className="block text-sm hover:opacity-80 transition-opacity"
          >
            <Button size="lg">Try Calculator Now</Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
