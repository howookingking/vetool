import HelperTooltip from '@/components/common/helper-tooltip'

export default function ResuscitationToolTip() {
  return (
    <HelperTooltip className="mt-[1px]" side="right">
      <div className="space-y-2">
        <div className="text-sm font-semibold">Resuscitation Fluid Rate</div>

        <div className="flex gap-10">
          <div>
            <div className="font-semibold">개</div>
            <div>15-20ml/kg</div>
          </div>
          <div>
            <div className="font-semibold">고양이</div>
            <div>5-10ml/kg</div>
          </div>
        </div>
        <div>Rate of Administration: 15min</div>
        <div>*2024 AAHA Fluid Therapy Guidelines for Dogs and Cats</div>
      </div>
    </HelperTooltip>
  )
}
