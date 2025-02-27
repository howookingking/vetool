'use client'

import SlideButton from '@/components/company/main/feature/ui/slide-button'
import { Button } from '@/components/ui/button'
import { OPEN_KAKAO_URL, PLANS } from '@/constants/company/main'
import { Crown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Props = {
  title?: string
  onExit?: () => void
}

/**
 * @param onExit 나중에 하기 버튼 클릭 시 실행될 함수 (* 서버 컴포넌트에서 사용 시 핸들러 함수를 props로 전달할 수 없으므로 optional 처리)
 * @returns
 */
export default function UpgragePlanPromptModal({
  title = '제한된 기능입니다',
  onExit,
}: Props) {
  const router = useRouter()

  const handleRouterBack = () => {
    router.back()
  }

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-[1px]">
      <div className="mx-4 flex w-full max-w-lg flex-col items-center gap-6 rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Crown className="h-6 w-6 text-primary" />
          </div>
          <span className="mb-2 text-center text-xl font-semibold">
            {title}
          </span>
          <span className="mb-4 text-center text-gray-500 dark:text-gray-400">
            이 기능을 사용하시려면 구독 플랜 업그레이드가 필요합니다
          </span>
        </div>

        <div className="grid w-full gap-4 py-4">
          <div className="space-y-3">
            {PLANS[2].features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  ✓
                </div>
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <Link href={OPEN_KAKAO_URL} target="_blank" className="w-full">
          <SlideButton className="w-full" variant="outline">
            구독 플랜 업그레이드
          </SlideButton>
        </Link>

        <Button
          variant="ghost"
          className="w-full"
          onClick={onExit || handleRouterBack}
        >
          나중에 하기
        </Button>
      </div>
    </div>
  )
}
