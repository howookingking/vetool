import HelperTooltip from '@/components/common/helper-tooltip'

export default function ResuscitationToolTip() {
  return (
    <HelperTooltip side="right">
      <div className="space-y-2">
        <div className="flex gap-10">
          <div>
            <div className="text-sm font-bold">개</div>
            <div>15-20mL/kg</div>
          </div>
          <div>
            <div className="text-sm font-bold">고양이</div>
            <div>5-10mL/kg</div>
          </div>
        </div>
        <div>Rate of Administration: 15 ~ 30 min</div>
      </div>

      <div className="mt-2">
        *2024 AAHA Fluid Therapy Guidelines for Dogs and Cats
      </div>
    </HelperTooltip>
  )
}
