import BrandHighlight from '@/components/company/hero/ui/brand-highlight'
import UnderlineHighlight from '@/components/company/hero/ui/underline-highlight'
import { Button } from '@/components/ui/button'

export default function HeroContent() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 sm:space-y-12">
      <div className="space-y-4 sm:space-y-6">
        <p className="text-center text-base font-semibold tracking-tighter text-primary sm:text-left sm:text-xl">
          수의사의 전문성을 위한 도구 <BrandHighlight />{' '}
        </p>

        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-left sm:text-7xl">
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
          반복 업무를 줄이고 진료의 정확도를 높여,
          <br className="block sm:hidden" />
          반려동물 케어에 집중할 수 있도록 설계된 수의사 전용 솔루션
        </p>
      </div>

      <Button
        size="lg"
        className="mx-auto flex items-center gap-2 rounded-full px-12 py-6 text-white shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)] transition-all hover:text-violet-100 hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]"
      >
        <span className="text-xl font-bold">지금 시작하기</span>
      </Button>
    </div>
  )
}
