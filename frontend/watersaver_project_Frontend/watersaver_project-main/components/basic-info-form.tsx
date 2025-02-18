import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type BasicInfoFormProps = {
  formData: any
  onUpdateFormData: (data: any) => void
  onNext: () => void
}

export function BasicInfoForm({ formData, onUpdateFormData, onNext }: BasicInfoFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
        <h2 className="text-2xl font-bold mb-6">Water Calculator Input</h2>
      <div>
        <h3 className="text-xl font-semibold mb-4">Daily Water Usage Input </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="occupants">Occupants</Label>
            <Input
              id="occupants"
              type="number"
              value={formData.occupants}
              onChange={(e) => onUpdateFormData({ occupants: e.target.value })}
              placeholder="Number of people"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Next: Indoor Usage</Button>
      </div>

      <div className="bg-blue-100 p-6 rounded-lg">
        <h4 className="font-semibold mb-2">Pro Tip</h4>
        <p className="text-sm text-gray-700">
          More detailed information helps us provide more accurate savings recommendations. Make sure to have your
          recent water bills handy for the best results.
        </p>
      </div>

      
    </form>
  )
}

