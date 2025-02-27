import VetoolLogo from '@/components/common/vetool-logo'
import GoogleLoginButton from '@/components/login/google-login-button'
import { Button } from '@/components/ui/button'
import logoWhite from '@/public/logo-white.svg'
import { Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function LoginPage() {
  return (
    <div className="flex h-screen">
      <Button className="absolute left-4 top-4" variant="outline" asChild>
        <Link href="/">
          <Home />
          홈으로
        </Link>
      </Button>

      <div className="flex h-screen w-full flex-col items-center justify-center gap-10 p-10 md:w-2/5">
        <VetoolLogo className="md:hidden" />

        <h2 className="text-2xl font-bold tracking-wider">
          로그인 또는 회원가입
        </h2>

        <form>
          <GoogleLoginButton />
        </form>

        <div className="text-center">
          구글로 회원가입을 진행할 경우
          <br /> (주)벳툴의{' '}
          <span className="text-primary">
            <Link href="/terms-of-service">이용약관</Link>
          </span>{' '}
          및{' '}
          <span className="text-primary">
            <Link href="/privacy-policy">개인정보정책</Link>
          </span>
          에 동의하게됩니다
        </div>

        <div>
          구글 계정이 없으신가요?{' '}
          <Link
            href="https://www.google.com/"
            target="_blank"
            className="text-primary"
          >
            구글 계정 생성
          </Link>
        </div>
      </div>

      <div className="hidden h-screen w-3/5 items-center justify-center bg-primary md:flex">
        <Image alt="vetool logo" src={logoWhite} unoptimized width={320} />
      </div>
    </div>
  )
}
