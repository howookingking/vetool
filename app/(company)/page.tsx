import Faqs from '@/components/company/main/faqs/faqs'
import Feature from '@/components/company/main/feature/feature'
import Hero from '@/components/company/main/hero/hero'
import PricingPlans from '@/components/company/main/pricing/pricing-plans'
import Stats from '@/components/company/main/stats/stats'
import Testimonial from '@/components/company/main/testimonial/testimonial'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
export default async function CompanyHomePage() {
  const supabase = await createClient()

  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser()

  if (supabaseUser) {
    // 벳툴 users 테이블에서 해당 사용자 조회
    const { data: vetoolUser, error: vetoolUserError } = await supabase
      .from('users')
      .select('user_id, hos_id')
      .match({ user_id: supabaseUser.id })
      .maybeSingle() // 있을 수도 없을 수(첫로그인의경우)도 있으므로

    // 조회 과정에서 에러 발생시 login 페이지 이동
    if (vetoolUserError) {
      console.error(vetoolUserError)
      redirect('/login')
    }

    if (vetoolUser) {
      if (vetoolUser.hos_id) {
        // 벳툴 users 테이블에서 있고 병원에 등록되어있는 경우 : 99% 케이스
        redirect(`/hospital/${vetoolUser.hos_id}`)
      } else {
        // 벳툴 users 테이블에서 있으나 병원에 등록되지 않은 경우
        // 첫 로그인 후 병원 등록을 하지 않은 경우 or 아직 승인이 되지 않은 경우
        // 따라서 user_approvals 테이블을 조회해야함
        const { data: userApprovalData, error: userApprovalDataError } =
          await supabase
            .from('user_approvals')
            .select()
            .match({ user_id: vetoolUser.user_id })
            .maybeSingle()

        if (userApprovalDataError) {
          console.error(userApprovalDataError)
          redirect('/login')
        }

        if (userApprovalData) {
          // 승인요청 데이터가 있는 경우 : 승인 대기 페이지로 이동
          redirect('/on-boarding/approval-waiting')
        } else {
          // 승인요청 데이터가 없는 경우 : on-boarding 페이지로 이동
          redirect('/on-boarding')
        }
      }
    } else {
      // 벳툴 users 테이블에서 없는 경우 : 첫 구글 로그인
      // users 테이블에 user_id, name, email, avatar_url 추가 후
      // on-boarding 페이지 이동
      const { error: insertUserError } = await supabase.from('users').insert({
        user_id: supabaseUser.id,
        name: supabaseUser.user_metadata.full_name,
        email: supabaseUser.email,
        avatar_url: supabaseUser.user_metadata.avatar_url,
      })
      if (insertUserError) {
        console.error(insertUserError)
        redirect('/login')
      }
      redirect('/on-boarding')
    }
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <Hero />
      {/* <Testimonial /> */}
      <Stats />
      <Feature />
      <Faqs />
      {/* <PricingPlans /> */}
    </div>
  )
}
