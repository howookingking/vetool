'use client'

import { Button } from '@/components/ui/button'
import { googleLogin } from '@/lib/services/auth/authentication'
import { cn } from '@/lib/utils/utils'
import googleLogo from '@/public/google-logo.svg'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useFormStatus } from 'react-dom'

export default function GoogleLoginButton() {
  let currentUrl
  if (typeof window !== 'undefined') {
    currentUrl = location.origin
  }

  const { pending } = useFormStatus()

  return (
    <>
      <input
        type="text"
        name="path"
        defaultValue={currentUrl ?? ''}
        className="hidden"
      />

      <Button
        className="flex w-full items-center gap-2"
        type="submit"
        variant="outline"
        disabled={pending}
        formAction={googleLogin}
      >
        <Image unoptimized src={googleLogo} alt="google logo" />
        <div className="flex items-center">
          <span>구글계정으로 로그인하기</span>
          <LoaderCircle
            className={cn(pending ? 'ml-2 animate-spin' : 'hidden')}
          />
        </div>
      </Button>
    </>
  )
}
