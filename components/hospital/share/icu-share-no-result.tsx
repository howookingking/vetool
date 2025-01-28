'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function IcuShareNoResult({ text }: { text: string }) {
  const router = useRouter()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <NoResultSquirrel text={text} size="lg" className="flex-col" />

      <Button onClick={() => router.back()}>
        <ArrowLeft />
        뒤로가기
      </Button>
    </div>
  )
}
