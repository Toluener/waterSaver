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
import { useRouter } from "next/navigation";

type OutdoorUsageFormProps = {
  formData: any;
  onUpdateFormData: (data: any) => void;
  onBack: () => void;
};

export function OutdoorUsageForm({
  formData,
  onUpdateFormData,
  onBack,
}: OutdoorUsageFormProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);

    router.push("/dashboard/results");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Outdoor Water Usage</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Outdoor Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="poolSize">Swimming Pool Size</Label>
                <Input
                  id="poolSize"
                  value={formData.poolSize}
                  onChange={(e) =>
                    onUpdateFormData({ poolSize: e.target.value })
                  }
                  placeholder="Enter pool size in liters"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="poolWaterChange">
                  Pool Water Change Frequency
                </Label>
                <Select
                  onValueChange={(value) =>
                    onUpdateFormData({ poolWaterChange: value })
                  }
                  defaultValue={formData.poolWaterChange}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="weekly/monthly" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carWashingChange">Car Washing Frequency</Label>
                <Select
                  onValueChange={(value) =>
                    onUpdateFormData({ carWashingChange: value })
                  }
                  defaultValue={formData.carWashingChange}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="weekly/monthly" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="poolSize">
                  Water Used for Car Wash (Liters)
                </Label>
                <Input
                  id="poolSize"
                  value={formData.waterUsage}
                  onChange={(e) =>
                    onUpdateFormData({ waterUsage: e.target.value })
                  }
                  placeholder="Water usage (Liters)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="poolSize">Average Monthly Bill (₦)</Label>
                <Input
                  id="poolSize"
                  value={formData.averageMonthlyBill}
                  onChange={(e) =>
                    onUpdateFormData({ averageMonthlyBill: e.target.value })
                  }
                  placeholder="Enter Monthly Amount"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="poolSize">Water Provider</Label>
                <Input
                  id="poolSize"
                  value={formData.waterProvider}
                  onChange={(e) =>
                    onUpdateFormData({ waterProvider: e.target.value })
                  }
                  placeholder="Enter provider name"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Submit
        </Button>
      </div>
    </form>
  );
}
