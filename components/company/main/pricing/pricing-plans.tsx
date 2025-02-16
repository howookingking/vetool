import PricingCard from '@/components/company/main/pricing/pricing-card'

const PLANS = [
  {
    name: '기본',
    price: '50,000원/월',
    description: '중소형 동물병원용 요금제',
    features: [
      '수의사 3명',
      '입원환자차트, 수술차트',
      '2GB 저장공간',
      '기본 지원',
    ],
    cta: '기본 요금제 시작',
    color: 'bg-indigo-500',
    isDefault: false,
  },
  {
    name: '프로',
    price: '200,000원/월',
    description: '중대형 동물병원용 요금제',
    features: [
      '수의사 5명',
      '모든 프로그램 제공',
      '약물 자동계산 기능 제공',
      '20GB 저장공간',
      '우선적인 지원',
      '데이터 분석 자료 제공',
    ],
    cta: '프로 요금제 시작',
    color: 'bg-primary',
    isDefault: true,
  },
  {
    name: '기업',
    price: '400,000원/월',
    description: '대형 동물병원용 요금제',
    features: [
      '수의사 수 무제한',
      '모든 프로그램 제공',
      '약물 자동계산 기능 제공',
      '무제한 저장공간',
      '최우선적인 지원',
      '데이터 분석 자료 제공',
      '동물병원 경영컨설팅 지원',
    ],
    cta: '기업 요금제 시작',
    color: 'bg-rose-500',
  },
]

export default function PricingPlans() {
  return (
    <section className="mx-auto flex h-[calc(100vh-48px)] flex-col space-y-12 px-4 py-8 md:space-y-36">
      <div>
        <h2 className="font-bold tracking-tighter sm:text-5xl md:my-8 md:text-7xl">
          가치를 넘어선 진료의 동반자
        </h2>
        <p className="text-muted-foreground md:text-xl">
          수의 진료의 모든 순간을 빛내줄 최첨단 솔루션을 합리적인 요금제로
          만나보세요.
          <br />
          당신의 클리닉에 새로운 차원의 효율과 전문성을 더합니다
        </p>
      </div>

      <div className="flex w-fit flex-col items-center gap-8 lg:flex-row">
        {PLANS.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan.name}
            price={plan.price}
            color={plan.color}
            description={plan.description}
            isDefault={plan.isDefault}
          />
        ))}
      </div>
    </section>
  )
}
