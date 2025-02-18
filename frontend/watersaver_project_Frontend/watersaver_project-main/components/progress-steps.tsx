type ProgressStepsProps = {
  currentStep: "basic" | "indoor" | "outdoor"
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { id: "basic", label: "Basic Info" },
    { id: "indoor", label: "Indoor Usage" },
    { id: "outdoor", label: "Outdoor Usage" },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-3 gap-4">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`h-2 w-full rounded ${
                currentStep === step.id ||
                (currentStep === "indoor" && step.id === "basic") ||
                (currentStep === "outdoor" && (step.id === "basic" || step.id === "indoor"))
                  ? "bg-blue-600"
                  : "bg-gray-200"
              }`}
            />
            <span className="mt-2 text-sm font-medium">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

