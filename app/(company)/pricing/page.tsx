import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
    highlighted: true,
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
  },
]

export default function PricingPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-6">
              <h1 className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                가격 안내
              </h1>
              <p className="mx-auto max-w-[600px] text-zinc-500 md:text-xl">
                병원이 필요로 하는 요금제를 맞춰서 선택해주세요. <br />
                요금제는 언제든 변경이 가능합니다.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {PLANS.map((plan) => (
              <Card
                key={plan.name}
                className={`flex flex-col justify-between ${
                  plan.highlighted ? 'border-primary shadow-lg' : ''
                }`}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="min-h-[320px]">
                  <div className="mb-4 text-4xl font-bold">{plan.price}</div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
