import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-sky-200">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600">
            Find answers to common questions about our water consumption calculator and water saving recommendations.
          </p>
        </div>

        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-6 hover:no-underline">
                How accurate is the water calculator?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Our calculator uses data from EPA and local water authorities to provide accurate estimates based on
                your input. Results may vary by 5% depending on your specific appliances and usage patterns.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-6 hover:no-underline">
                Can I save my calculation results?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Yes. Create a free account to save your calculations, track your progress over time, and receive
                personalized water-saving recommendations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-6 hover:no-underline">
                What factors are included in the calculation?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                We consider household size, appliance efficiency, daily usage patterns, outdoor water use, and seasonal
                variations to provide comprehensive results.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-6 hover:no-underline">
                How often should I recalculate my water usage?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                We recommend recalculating every 3-6 months or whenever you make significant changes to your water usage
                habits or install new water-efficient appliances.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-2">Still have questions?</h2>
          <p className="text-gray-600 mb-6">Our water conservation experts are here to help</p>
          <button className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}