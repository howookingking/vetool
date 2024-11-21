import HelperTooltip from '@/components/common/helper-tooltip'

export default function FluidToolTip() {
  return (
    <HelperTooltip>
      <div className="space-y-2">
        <div className="text-sm font-semibold">유지속도</div>

        <div className="flex gap-10">
          <div>
            <div className="font-semibold">개</div>
            <div>a. 60ml/kg/day</div>
            <div>
              b. 132 * (몸무게) <sup>0.75</sup> ml/day
            </div>
            <div>c. 30 * (몸무게) + 70 ml/day</div>
          </div>
          <div>
            <div className="font-semibold">고양이</div>
            <div>a. 40ml/kg/day</div>
            <div>
              b. 80 * (몸무게) <sup>0.75</sup> ml/day
            </div>
            <div>c. 30 * (몸무게) + 70 ml/day</div>
          </div>
        </div>
        <div>*2024 AAHA Fluid Therapy Guidelines for Dogs and Cats</div>
      </div>
    </HelperTooltip>
  )
}
