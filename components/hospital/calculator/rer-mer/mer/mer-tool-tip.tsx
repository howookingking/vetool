import HelperTooltip from '@/components/common/helper-tooltip'

export default function MerToolTip() {
  return (
    <HelperTooltip side="right">
      <div>
        RER(70 x kg <sup>0.75</sup> kcal/day) x Life Stage Factor
      </div>

      <div className="mt-2">
        *2021 AAHA Nutrition and Weight Management Guidelines for Dogs and Cats
      </div>
    </HelperTooltip>
  )
}
