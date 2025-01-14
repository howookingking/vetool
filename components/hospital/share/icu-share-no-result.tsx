'use client'

import { Button } from '@/components/ui/button'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'

export default function IcuShareNoResult({ text }: { text: string }) {
  const router = useRouter()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <NoResultSquirrel text={text} size="lg" className="flex items-center" />

      <div className="flex gap-4">
        <Button onClick={() => router.back()}>
          <ArrowLeft />
          뒤로가기
        </Button>
        <Button variant="outline" onClick={() => router.push('/')}>
          <Home />
          홈으로
        </Button>
      </div>
    </div>
  )
}
