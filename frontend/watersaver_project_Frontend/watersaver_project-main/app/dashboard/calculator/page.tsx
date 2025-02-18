"use client";

import { BasicInfoForm } from "@/components/basic-info-form";
import { IndoorUsageForm } from "@/components/indoor-usage-form";
import { OutdoorUsageForm } from "@/components/outdoor-usage-form";
import { ProgressSteps } from "@/components/progress-steps";
import { useState } from "react";

type FormStep = "basic" | "indoor" | "outdoor";

export default function Calculator() {
  const [step, setStep] = useState<FormStep>("basic");
  const [formData, setFormData] = useState({
    // Basic Info
    occupants: "",
    // Indoor Usage
    showerFlowRate: "",
    averageShowerTime: "",
    toiletFlushVolume: "",
    averageFlushesPerDay: "",
    // kitchen usage
    kitchenUsage: "",
    averageTapUsageTime: "",
    tapFlowRate: "",
    numberOfKitchenUsers: "",
    dishWasherType: "",
    dishWasherUsageFrequency: "",
    // laundry usage
    laundryUsage: "",
    laundryTapDuration: "",
    laundryFlowRateOrType: "",
    numberOfLaundryUsageUsers: "",

    // Outdoor Usage
    lawnSize: "",
    gardenSize: "",
    wateringFrequency: "",
    irrigationType: "",
    poolType: "",
    poolSize: "",
    carWashingFrequency: "",
  });

  const handleNext = () => {
    if (step === "basic") setStep("indoor");
    else if (step === "indoor") setStep("outdoor");
  };

  const handleBack = () => {
    if (step === "indoor") setStep("basic");
    else if (step === "outdoor") setStep("indoor");
  };

  const handleUpdateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ProgressSteps currentStep={step} />
        <div className="mt-8 max-w-4xl mx-auto">
          {step === "basic" && (
            <BasicInfoForm
              formData={formData}
              onUpdateFormData={handleUpdateFormData}
              onNext={handleNext}
            />
          )}
          {step === "indoor" && (
            <IndoorUsageForm
              formData={formData}
              onUpdateFormData={handleUpdateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === "outdoor" && (
            <OutdoorUsageForm
              formData={formData}
              onUpdateFormData={handleUpdateFormData}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}
