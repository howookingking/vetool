import HelperTooltip from '@/components/common/helper-tooltip'

export default function RerToolTip() {
  return (
    <HelperTooltip className="mt-[1px]" side="right">
      <div className="space-y-2">
        <div className="text-sm font-semibold">RER Calculation</div>

        <div className="flex gap-10">
          <div>
            <div>
              <span>BW</span>
              <span className="text-[10px]">kg</span>
              <sup>0.75</sup> * 70
            </div>
            <div className="mt-2">Example for a 10 lb neutered dog:</div>
            <span>RER: 4.5</span>
            <sup>0.75</sup> * 70 = 216kcal/day
          </div>
        </div>
        <div>*2024 AAHA Fluid Therapy Guidelines for Dogs and Cats</div>
      </div>
    </HelperTooltip>
  )
}
