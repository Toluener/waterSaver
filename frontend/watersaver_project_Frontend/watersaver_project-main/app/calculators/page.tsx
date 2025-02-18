import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Calculators() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Water Usage Calculators</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Household Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Calculate your household's daily water consumption based on various factors like appliances, fixtures, and
              usage patterns.
            </p>
            <Button>Start Calculator</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Personal Usage Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Track and analyze your individual water consumption habits to identify areas for conservation.
            </p>
            <Button>Start Calculator</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

