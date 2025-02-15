import BrandHighlight from '@/components/company/main/hero/ui/brand-highlight'
import UnderlineHighlight from '@/components/company/main/hero/ui/underline-highlight'

export default function HeroContent() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 sm:space-y-12">
      <div className="space-y-4 sm:space-y-6">
        <p className="text-center text-base font-semibold tracking-tighter text-primary sm:text-left sm:text-xl">
          수의사의 전문성을 위한 도구 <BrandHighlight value="VETOOL" />{' '}
        </p>

        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-left sm:text-5xl md:text-7xl">
          <div className="mb-2 sm:mb-6">
            시간은 <UnderlineHighlight>절약</UnderlineHighlight>하고
          </div>
          <div>
            환자 케어는{' '}
            <UnderlineHighlight delay={1.5}>향상</UnderlineHighlight>
            시키세요
          </div>
        </h2>

        <p className="text-center text-sm text-muted-foreground sm:text-left sm:text-xl">
          반복 업무를 줄이고 진료의 정확도를 높여,{' '}
          <br className="block lg:hidden" />
          반려동물 케어에 집중할 수 있도록 설계된 수의사 전용 솔루션
        </p>
      </div>
    </div>
  )
}
