import HelperTooltip from '@/components/common/helper-tooltip'

export default function bsaToolTip() {
  return (
    <HelperTooltip className="mt-[1px]" side="right">
      <div className="space-y-2">
        <div className="text-sm font-semibold">BSA Formula</div>

        <div className="flex gap-10">
          <div>
            <div className="font-semibold">개</div>
            <div>
              BSA(m2) = 0.101 * 체중(kg)<sup>0.667</sup>
            </div>
          </div>
          <div>
            <div className="font-semibold">고양이</div>
            <div>
              BSA(m2) = 0.1 * 체중(kg)<sup>0.667</sup>
            </div>
          </div>
        </div>
      </div>
    </HelperTooltip>
  )
}
