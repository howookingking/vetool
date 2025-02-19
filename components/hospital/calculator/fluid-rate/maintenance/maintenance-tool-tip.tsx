import HelperTooltip from '@/components/common/helper-tooltip'

export default function MaintenanceToolTip() {
  return (
    <HelperTooltip side="right">
      <div className="flex gap-10">
        <div>
          <div className="text-sm font-bold">개</div>
          <div>
            a. 132 x BW(kg) <sup>0.75</sup> mL/day
          </div>
          <div>b. 60mL/kg/day</div>
          <div>c. 30 x BW(kg) + 70 mL/day</div>
        </div>

        <div>
          <div className="text-sm font-bold">고양이</div>
          <div>
            a. 80 x BW(kg) <sup>0.75</sup> mL/day
          </div>
          <div>b. 40mL/kg/day</div>
          <div>c. 30 x BW(kg) + 70 mL/day</div>
        </div>
      </div>

      <div className="mt-2">
        *2024 AAHA Fluid Therapy Guidelines for Dogs and Cats
      </div>
    </HelperTooltip>
  )
}
