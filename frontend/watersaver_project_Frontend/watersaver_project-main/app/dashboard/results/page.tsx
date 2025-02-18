"use client"

import { Card } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Droplet, DollarSign, TrendingDown } from "lucide-react"

const monthlyData = [
  { month: "Jan", usage: 250 },
  { month: "Feb", usage: 350 },
  { month: "Mar", usage: 275 },
  { month: "Apr", usage: 400 },
  { month: "May", usage: 200 },
  { month: "Jun", usage: 450 },
  { month: "Jul", usage: 300 },
  { month: "Aug", usage: 500 },
  { month: "Sep", usage: 600 },
  { month: "Oct", usage: 400 },
  { month: "Nov", usage: 650 },
  { month: "Dec", usage: 425 },
]

export default function WaterAnalytics() {
  return (
    <div className="min-h-screen bg-[#E6F4FF] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Water Usage Analytics</h1>
          <p className="text-gray-600">Track your water consumption and savings throughout 2025</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 flex items-center space-x-4">
            <Droplet className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold">2,450</div>
              <div className="text-sm text-gray-600">Gallons Saved</div>
            </div>
          </Card>

          <Card className="p-6 flex items-center space-x-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold">₦325</div>
              <div className="text-sm text-gray-600">Amount Saved</div>
            </div>
          </Card>

          <Card className="p-6 flex items-center space-x-4">
            <TrendingDown className="w-8 h-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold">15%</div>
              <div className="text-sm text-gray-600">Usage Reduction</div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold">Monthly Water Usage</h3>
            <div className="flex gap-4">
            </div>
          </div>

          <ChartContainer
            className="h-[400px] w-full"
            config={{
              usage: {
                label: "Water Usage",
                color: "hsl(var(--primary))",
              },
            }}
          >
            <LineChart data={monthlyData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(value) => `${value}`}
                tickLine={false}
                axisLine={false}
                ticks={[0, 250, 500, 750, 1000]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="var(--color-usage)"
                strokeWidth={2}
                dot={{ fill: "var(--color-usage)" }}
              />
            </LineChart>
          </ChartContainer>
        </Card>

        {/* Indoor Water Usage Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Indoor Water Usage Summary</h2>
          <div className="grid gap-6">
            <div className="bg-[#E6F4FF] rounded-lg p-6">
              <h3 className="font-semibold mb-4">Estimated Daily Indoor Usage</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-gray-600 mb-2">Bathroom</div>
                  <div className="text-blue-600 text-2xl font-bold">45 gal</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Kitchen</div>
                  <div className="text-blue-600 text-2xl font-bold">30 gal</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Laundry</div>
                  <div className="text-blue-600 text-2xl font-bold">25 gal</div>
                </div>
              </div>
            </div>

            <div className="bg-[#E6F4FF] rounded-lg p-6">
              <h3 className="font-semibold mb-4">Monthly Bills and Savings Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-gray-600 mb-2">Previous Month</div>
                  <div className="text-blue-600 text-2xl font-bold">₦160,000</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Current Month</div>
                  <div className="text-blue-600 text-2xl font-bold">₦90,000</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Amount Saved</div>
                  <div className="text-blue-600 text-2xl font-bold">₦70,000</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Outdoor Water Usage Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Outdoor Water Usage Summary</h2>
          <div className="grid gap-6">
            <div className="bg-[#E6F4FF] rounded-lg p-6">
              <h3 className="font-semibold mb-4">Estimated Daily Outdoor Usage</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-gray-600 mb-2">Swimming Pool</div>
                  <div className="text-blue-600 text-2xl font-bold">20 gal</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Car Wash</div>
                  <div className="text-blue-600 text-2xl font-bold">10 gal</div>
                </div>
              </div>
            </div>

            <div className="bg-[#E6F4FF] rounded-lg p-6">
              <h3 className="font-semibold mb-4">Monthly Bills and Savings Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-gray-600 mb-2">Previous Month</div>
                  <div className="text-blue-600 text-2xl font-bold">₦160,000</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Current Month</div>
                  <div className="text-blue-600 text-2xl font-bold">₦90,000</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Amount Saved</div>
                  <div className="text-blue-600 text-2xl font-bold">₦70,000</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Usage Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Indoor Usage</span>
                <span className="font-semibold">65%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Outdoor Usage</span>
                <span className="font-semibold">35%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Savings Tips</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Fix leaking faucets
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Install water-efficient fixtures
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Collect rainwater for gardens
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}