"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch"; // Add this import
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type IndoorUsageFormProps = {
  formData: any;
  onUpdateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export function IndoorUsageForm({
  formData,
  onUpdateFormData,
  onNext,
  onBack,
}: IndoorUsageFormProps) {
  const { toast } = useToast();
  const [isKitchenEnabled, setIsKitchenEnabled] = useState<boolean>(false);
  const [isLaundryEnabled, setIsLaundryEnabled] = useState<boolean>(false);

  // Add validation function
  const isBathroomFieldsValid = () => {
    return (
      formData.showerDuration &&
      formData.showerType &&
      formData.showersPerDay &&
      formData.toiletFlushType
    );
  };

  // Validation functions
  const isKitchenFormValid = () => {
    if (formData.kitchenUsage === "manual") {
      return (
        formData.tapDuration &&
        formData.flowRateOrType &&
        formData.numberOfKitchenUsageUsers
      );
    } else if (formData.kitchenUsage === "dishwasher") {
      return (
        formData.tapDuration &&
        formData.flowRateOrType &&
        formData.numberOfKitchenUsageUsers
      );
    }
    return false;
  };

  const isLaundryFormValid = () => {
    if (formData.laundryUsage === "manual") {
      return (
        formData.laundryTapDuration &&
        formData.laundryFlowRateOrType &&
        formData.numberOfLaundryUsageUsers
      );
    } else if (formData.laundryUsage === "washingMachine") {
      return (
        formData.laundryTapDuration &&
        formData.laundryFlowRateOrType &&
        formData.numberOfLaundryUsageUsers
      );
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const resetKitchenForm = () => {
    onUpdateFormData({
      tapDuration: "",
      flowRateOrType: "",
      numberOfKitchenUsageUsers: "",
      kitchenUsage: "",
    });
  };

  const resetLaundryForm = () => {
    onUpdateFormData({
      laundryTapDuration: "",
      laundryFlowRateOrType: "",
      numberOfLaundryUsageUsers: "",
      laundryUsage: "",
    });
  };

  const handleKitchenSubmit = () => {
    try {
      if (isKitchenFormValid()) {
        console.log("Kitchen form data:", formData);
        toast({
          title: "Success",
          description: "Kitchen usage data saved successfully",
        });
        setIsKitchenEnabled(false);
      }
    } catch (error) {
      console.error("Error submitting kitchen form:", error);
      toast({
        title: "Error",
        description: "Failed to save kitchen usage data",
        variant: "destructive",
      });
    } finally {
      if (isKitchenFormValid()) {
        resetKitchenForm();
      }
    }
  };

  const handleLaundrySubmit = () => {
    try {
      if (isLaundryFormValid()) {
        console.log("Laundry form data:", formData);
        toast({
          title: "Success",
          description: "Laundry usage data saved successfully",
        });
        setIsLaundryEnabled(false);
      }
    } catch (error) {
      console.error("Error submitting laundry form:", error);
      toast({
        title: "Error",
        description: "Failed to save laundry usage data",
        variant: "destructive",
      });
    } finally {
      if (isLaundryFormValid()) {
        resetLaundryForm();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Indoor Water Usage</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Bathroom Usage</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="showerDuration">
                  Average Shower Duration (Minutes)
                </Label>
                <Input
                  id="showerDuration"
                  type="number"
                  value={formData.showerDuration}
                  onChange={(e) =>
                    onUpdateFormData({ showerDuration: e.target.value })
                  }
                  placeholder="Minutes per shower"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="showerDuration">Select Shower Type </Label>
                <Select
                  onValueChange={(value) =>
                    onUpdateFormData({ showerType: value })
                  }
                  defaultValue={formData.showerType}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Low Flow/Standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lowflow">Low Flow</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="showersPerDay">
                  Average Toilet Flushes Per Day
                </Label>
                <Input
                  id="showersPerDay"
                  type="number"
                  value={formData.showersPerDay}
                  onChange={(e) =>
                    onUpdateFormData({ showersPerDay: e.target.value })
                  }
                  placeholder="Number of showers"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="showerDuration">
                  Select Toilet Flush Volume Type{" "}
                </Label>
                <Select
                  onValueChange={(value) =>
                    onUpdateFormData({ toiletFlushType: value })
                  }
                  defaultValue={formData.toiletFlushType}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Low Flow/Standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lowflow">Low Flow</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Usage Selection</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <Switch
                  id="kitchen-usage"
                  checked={isKitchenEnabled}
                  onCheckedChange={setIsKitchenEnabled} // Fixed: directly use the setter
                />
                <Label htmlFor="kitchen-usage">Kitchen Usage</Label>
              </div>
              <div className="flex items-center space-x-4">
                <Switch
                  id="laundry-usage"
                  checked={isLaundryEnabled}
                  onCheckedChange={setIsLaundryEnabled} // Fixed: directly use the setter
                />
                <Label htmlFor="laundry-usage">Laundry Usage</Label>
              </div>
            </div>
          </div>

          {isKitchenEnabled && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">Kitchen Usage</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dishwasherLoads">
                      Select Dish Washing Method
                    </Label>

                    <Select
                      onValueChange={(value) =>
                        onUpdateFormData({ kitchenUsage: value })
                      }
                      defaultValue={formData.kitchenUsage}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a washing method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="dishwasher">Dish Washer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.kitchenUsage === "manual" && (
                  <div className="space-y-2 mt-10 bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">
                      Manual Dish washing Method
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="tapDuration">
                          Average Tap Duration (Minutes)
                        </Label>
                        <Input
                          id="tapDuration"
                          type="number"
                          value={formData.tapDuration}
                          onChange={(e) =>
                            onUpdateFormData({ tapDuration: e.target.value })
                          }
                          className="border-blue-500"
                          placeholder="Tap Usage Time Per Person (Minutes)"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tapFlowRate">
                          Select Tap Flow Rate
                        </Label>

                        <Select
                          onValueChange={(value) =>
                            onUpdateFormData({ flowRateOrType: value })
                          }
                          defaultValue={formData.flowRateOrType}
                        >
                          <SelectTrigger className="border-blue-500">
                            <SelectValue placeholder="Select a washing method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lowflow">Low Flow</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tapDuration">Number of Users</Label>
                        <Input
                          id="tapDuration"
                          type="number"
                          value={formData.numberOfKitchenUsageUsers}
                          onChange={(e) =>
                            onUpdateFormData({
                              numberOfKitchenUsageUsers: e.target.value,
                            })
                          }
                          className="border-blue-500"
                          placeholder="Number Of People Who Washed Dishes "
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.kitchenUsage === "dishwasher" && (
                  <div className="space-y-2 mt-5 bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">
                      Dishwasher Dish washing Method
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="tapDuration">
                          Dishwasher Usage Frequency
                        </Label>
                        <Input
                          id="tapDuration"
                          type="number"
                          value={formData.tapDuration}
                          onChange={(e) =>
                            onUpdateFormData({
                              tapDuration: e.target.value,
                            })
                          }
                          className="border-blue-500"
                          placeholder="Dishwasher Usage Frequency Per Person "
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tapFlowRate">
                          Select Type Of Dishwasher
                        </Label>

                        <Select
                          onValueChange={(value) =>
                            onUpdateFormData({ flowRateOrType: value })
                          }
                          defaultValue={formData.flowRateOrType}
                        >
                          <SelectTrigger className="border-blue-500">
                            <SelectValue placeholder="Select Type Of Dishwasher" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="watersaver">
                              Water Saving
                            </SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tapDuration">Number of Users</Label>
                        <Input
                          id="tapDuration"
                          type="number"
                          value={formData.numberOfKitchenUsageUsers}
                          onChange={(e) =>
                            onUpdateFormData({
                              numberOfKitchenUsageUsers: e.target.value,
                            })
                          }
                          className="border-blue-500"
                          placeholder="Number Of People Who Washed Dishes "
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    onClick={handleKitchenSubmit}
                    disabled={!isKitchenFormValid()}
                  >
                    Save Kitchen Usage
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isLaundryEnabled && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">Laundry Usage</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dishwasherLoads">
                      Select Laundry Usage Method
                    </Label>

                    <Select
                      onValueChange={(value) =>
                        onUpdateFormData({ laundryUsage: value })
                      }
                      defaultValue={formData.laundryUsage}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a washing method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="washingMachine">
                          Washing Machine
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.laundryUsage === "manual" && (
                  <div className="space-y-2 mt-10 bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">
                      Manual Laundry
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="tapDuration">
                          Average Tap Duration (Minutes)
                        </Label>
                        <Input
                          id="tapDuration"
                          type="number"
                          value={formData.laundryTapDuration}
                          onChange={(e) =>
                            onUpdateFormData({
                              laundryTapDuration: e.target.value,
                            })
                          }
                          className="border-blue-500"
                          placeholder="Tap Usage Time Per Person (Minutes)"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tapFlowRate">
                          Select Tap Flow Rate
                        </Label>

                        <Select
                          onValueChange={(value) =>
                            onUpdateFormData({
                              laundryFlowRateOrType: value,
                            })
                          }
                          defaultValue={formData.laundryFlowRateOrType}
                        >
                          <SelectTrigger className="border-blue-500">
                            <SelectValue placeholder="Select a washing method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lowflow">Low Flow</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tapDuration">Number of Users</Label>
                        <Input
                          id="tapDuration"
                          type="number"
                          value={formData.numberOfLaundryUsageUsers}
                          onChange={(e) =>
                            onUpdateFormData({
                              numberOfLaundryUsageUsers: e.target.value,
                            })
                          }
                          className="border-blue-500"
                          placeholder="Number Of People Who Washed Did Laundry "
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.laundryUsage === "washingMachine" && (
                  <div className="space-y-2 mt-5 bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">
                      Washing Machine
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="tapDuration">
                          Average Machine Usage
                        </Label>
                        <Input
                          id="tapDuration"
                          type="number"
                          value={formData.laundryTapDuration}
                          onChange={(e) =>
                            onUpdateFormData({
                              laundryTapDuration: e.target.value,
                            })
                          }
                          className="border-blue-500"
                          placeholder="Frequency Of Washing Machine Usage  "
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tapFlowRate">
                          Select Type Of Washing Machine
                        </Label>

                        <Select
                          onValueChange={(value) =>
                            onUpdateFormData({
                              laundryFlowRateOrType: value,
                            })
                          }
                          defaultValue={formData.laundryFlowRateOrType}
                        >
                          <SelectTrigger className="border-blue-500">
                            <SelectValue placeholder="Select Type Of Washing Machine" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="watersaver">
                              Water Saving
                            </SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tapDuration">Number of Users</Label>
                        <Input
                          id="tapDuration"
                          type="number"
                          value={formData.numberOfLaundryUsageUsers}
                          onChange={(e) =>
                            onUpdateFormData({
                              numberOfLaundryUsageUsers: e.target.value,
                            })
                          }
                          className="border-blue-500"
                          placeholder="Number Of People Who Did Laundry "
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    onClick={handleLaundrySubmit}
                    disabled={!isLaundryFormValid()}
                  >
                    Save Laundry Usage
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>

        <Button
          type="submit"
          disabled={
            !isBathroomFieldsValid() ||
            isKitchenEnabled ||
            isLaundryEnabled
          }
        >
          Next: Outdoor Usage
        </Button>
      </div>
    </form>
  );
}
