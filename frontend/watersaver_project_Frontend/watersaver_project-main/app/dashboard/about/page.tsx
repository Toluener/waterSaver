import { BarChart2, Calculator, Lightbulb } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        {/* Hero Section */}
        <div className="relative h-[400px]">
          <Image
            src="/about.jpeg"
            alt="Water droplets background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-white mb-4">About WaterSaver Calculator</h1>
            <p className="text-white text-lg max-w-2xl">
              Our mission is to help individuals and businesses reduce water consumption through smart calculations and
              actionable insights.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/water_img.png"
                alt="Plumber checking radiator"
                width={500}
                height={500}
                className=""
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-8">
                Started in 2025, WaterSaver Calculator was born from the need to make water conservation more accessible
                and measurable for everyone.
              </p>
              <p className="text-gray-600 mb-12">
                We combine accurate data with user-friendly interface to help you understand and reduce your water
                footprint.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-1">1M+</h3>
                  <p className="text-gray-600">Users</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">500M</h3>
                  <p className="text-gray-600">Gallons Saved</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">150+</h3>
                  <p className="text-gray-600">Countries</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-sky-200 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  name: "Ibekwe Gozie",
                  role: "Project Manager",
                  image: "/pm.png",
                },
                {
                  name: "Ehinmosan Tolu",
                  role: "Backend Engineer",
                  image: "/be.png",
                },
                {
                  name: "Adegbite Nathan",
                  role: "Frontend Engineer",
                  image: "/fe.png",
                },
                {
                  name: "Sontan Olajide",
                  role: "UI/UX",
                  image: "/ui.png",
                },
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <Calculator className="h-12 w-12 mx-auto mb-4 text-sky-700" />
                <h3 className="font-semibold mb-2">Accurate Calculations</h3>
                <p className="text-gray-600">Advanced algorithms provide precise water usage estimates</p>
              </div>
              <div className="text-center">
                <BarChart2 className="h-12 w-12 mx-auto mb-4 text-sky-700" />
                <h3 className="font-semibold mb-2">Detailed Analytics</h3>
                <p className="text-gray-600">Track your progress with comprehensive usage reports</p>
              </div>
              <div className="text-center">
                <Lightbulb className="h-12 w-12 mx-auto mb-4 text-sky-700" />
                <h3 className="font-semibold mb-2">Smart Tips</h3>
                <p className="text-gray-600">Personalized recommendations for water conservation</p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}