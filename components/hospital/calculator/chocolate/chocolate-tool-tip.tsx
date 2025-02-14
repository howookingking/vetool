import HelperTooltip from '@/components/common/helper-tooltip'

export default function ChocolateToolTip() {
  return (
    <HelperTooltip className="mt-[1px]" side="right">
      <div className="space-y-3">
        <div className="text-sm font-semibold">
          초콜릿 종류별 테오브로민 함량
        </div>
        <div className="grid grid-cols-2">
          <div>화이트 초콜릿: 0.25mg/g</div>
          <div>밀크 초콜릿: 2.4mg/g</div>
          <div>다크 초콜릿(50-69%): 5.5mg/g</div>
          <div>다크 초콜릿(70% 이상): 14.0mg/g</div>
          <div>베이킹 초콜릿: 26.0mg/g</div>
        </div>

        <div className="mt-4 text-sm font-semibold">테오브로민 독성</div>
        <div className="space-y-1">
          <div>반감기: 17.5시간</div>
          <div>독성 발현: 섭취 후 6-12시간</div>
          <div>치사량(LD50): 100-200mg/kg</div>
        </div>

        <div className="mt-4 text-sm font-semibold">임상 증상</div>
        <div className="space-y-1">
          <div>20mg/kg 미만: 대부분 무증상</div>
          <div>20-40mg/kg: 경미한 위장 증상</div>
          <div>40-60mg/kg: 중등도의 심장 및 신경계 증상</div>
          <div>60mg/kg 이상: 심각한 증상, 응급치료 필요</div>
        </div>
      </div>
    </HelperTooltip>
  )
}
