import HelperTooltip from '@/components/common/helper-tooltip'

export default function bsaToolTip() {
  return (
    <HelperTooltip side="right">
      <div>
        BSA(m<sup>2</sup>) = 0.1 x BW(kg)<sup>2/3</sup>
      </div>

      <div className="mt-2">*종 차이는 무시할 수 있는 수준임</div>
    </HelperTooltip>
  )
}
