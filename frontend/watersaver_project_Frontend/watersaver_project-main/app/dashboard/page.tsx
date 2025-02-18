import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, LightbulbIcon, LineChart} from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
    return (
        <div>
          {/* Hero Section */}
          <section
            className="relative h-[500px] flex items-center"
            style={{
              backgroundImage: 'url("./bg_img.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="container mx-auto px-4 relative z-10 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Calculate & Save Water Resources
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl">
                Track your water usage, get personalized recommendations, and
                contribute to environmental sustainability.
              </p>
            </div>
          </section>
    
          {/* Calculators Section */}
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                Water Usage Calculator
              </h2>
              <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HomeIcon className="h-5 w-5" />
                      Household Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Calculate daily household water consumption
                    </p>
                    <Link href="/dashboard/calculator">
                      <Button
                        size="lg"
                        className="bg-[rgb(79,159,196)] hover:bg-[rgb(79,159,196)]/80 text-white w-full"
                      >
                        Calculate
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
    
          {/* Features Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <LineChart className="h-12 w-12 " />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Usage Tracking</h3>
                  <p className="text-gray-600">Monitor your progress over time</p>
                </div>
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <LightbulbIcon className="h-12 w-12 " />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Tips</h3>
                  <p className="text-gray-600">Get personalized recommendations</p>
                </div>

              </div>
            </div>
          </section>
    

        </div>
      );
}

export default Dashboard