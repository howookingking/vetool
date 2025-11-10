'use client'

import { Button } from '@/components/ui/button'
import { googleLogin } from '@/lib/services/auth/authentication'
import googleLogo from '@/public/google-logo.svg'
import Image from 'next/image'
import { useFormStatus } from 'react-dom'
import { Spinner } from '../ui/spinner'

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
        size="default"
        type="submit"
        variant="outline"
        disabled={pending}
        formAction={googleLogin}
      >
        <Image unoptimized src={googleLogo} alt="google logo" className="w-4" />
        <div className="flex items-center gap-2">
          <span>구글계정으로 로그인하기</span>
          {pending && <Spinner />}
        </div>
      </Button>
    </>
  )
}
