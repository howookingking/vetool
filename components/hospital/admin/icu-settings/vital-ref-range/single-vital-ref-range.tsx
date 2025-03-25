import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type VitalRefRange } from '@/types/adimin'
import { Cat, Dog } from 'lucide-react'

type Props = {
  vital: VitalRefRange
  handleChange: (
    orderName: string,
    species: 'canine' | 'feline',
    type: 'min' | 'max',
    value: string,
  ) => void
}

export default function SingleVitalRefRange({ vital, handleChange }: Props) {
  return (
    <div key={vital.order_name}>
      <h4 className="mb-1 text-sm font-bold">{vital.order_name}</h4>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-6 rounded-md bg-slate-50 p-4">
          <Dog />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Label
                htmlFor={`${vital.order_name}-canine-min`}
                className="shrink-0"
              >
                최소값
              </Label>
              <Input
                className="bg-white"
                id={`${vital.order_name}-canine-min`}
                type="number"
                value={vital.canine.min}
                onChange={(e) =>
                  handleChange(
                    vital.order_name,
                    'canine',
                    'min',
                    e.target.value,
                  )
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <Label
                htmlFor={`${vital.order_name}-canine-max`}
                className="shrink-0"
              >
                최대값
              </Label>
              <Input
                className="bg-white"
                id={`${vital.order_name}-canine-max`}
                type="number"
                value={vital.canine.max}
                onChange={(e) =>
                  handleChange(
                    vital.order_name,
                    'canine',
                    'max',
                    e.target.value,
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 rounded-md bg-slate-50 p-4">
          <Cat />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Label
                htmlFor={`${vital.order_name}-feline-min`}
                className="shrink-0"
              >
                최소값
              </Label>
              <Input
                className="bg-white"
                id={`${vital.order_name}-feline-min`}
                type="number"
                value={vital.feline.min}
                onChange={(e) =>
                  handleChange(
                    vital.order_name,
                    'feline',
                    'min',
                    e.target.value,
                  )
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Label
                htmlFor={`${vital.order_name}-feline-max`}
                className="shrink-0"
              >
                최대값
              </Label>
              <Input
                className="bg-white"
                id={`${vital.order_name}-feline-max`}
                type="number"
                value={vital.feline.max}
                onChange={(e) =>
                  handleChange(
                    vital.order_name,
                    'feline',
                    'max',
                    e.target.value,
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
