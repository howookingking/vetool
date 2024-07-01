'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen items-center justify-center bg-teal-50">
      <div className="flex max-w-md flex-col items-center rounded-lg bg-white px-16 py-8 text-center shadow-lg">
        <AlertCircle className="text-primary" size={80} />
        <h1 className="my-4 text-2xl font-semibold text-primary">
          에러가 발생하였습니다
        </h1>
        <p>에러가 발생하였습니다</p>
        <p>관리자에게 문의하세요</p>
        <p className="text-destructive">{error.message}</p>
        <div className="mt-6 flex gap-2">
          <Button onClick={() => reset()} variant="default">
            재시도
          </Button>

          <Button variant="outline" asChild>
            <Link href="/">홈으로</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
