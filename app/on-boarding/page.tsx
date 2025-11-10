import OnboardingTitle from '@/components/on-boarding/onboarding-title'
import SignupForm from '@/components/on-boarding/signup-form'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/services/auth/authentication'
import { ChevronLeft } from 'lucide-react'

export default function SelectHospitalPage() {
  return (
    <>
      <form action={logout} className="absolute left-4 top-4">
        <Button variant="outline" type="submit" className="absolute pl-2">
          <ChevronLeft size={20} />
          뒤로가기
        </Button>
      </form>

      <OnboardingTitle title="회원가입" />

      <SignupForm />
    </>
  )
}
