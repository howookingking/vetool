import MaxWidthContainer from '@/components/common/max-width-container'
import { Separator } from '@/components/ui/separator'
import { OPEN_KAKAO_URL } from '@/constants/company/main'
import Link from 'next/link'

export default function HomepageFooter() {
  return (
    <footer className="border-t bg-zinc-900 py-6 text-white">
      <MaxWidthContainer>
        <div className="flex gap-4">
          <Link href="/terms-of-service" className="text-xs md:text-base">
            이용약관
          </Link>
          <Link href="/privacy-policy" className="text-xs md:text-base">
            개인정보처리방침
          </Link>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:gap-0">
          <div>
            <p className="text-sm font-semibold leading-relaxed md:text-lg">
              (주) 벳툴
            </p>
            <p className="text-xs leading-relaxed text-muted md:text-sm">
              대표 : 이정우
            </p>
            <p className="text-xs leading-relaxed text-muted md:text-sm">
              사업자등록번호 : 658-86-02970
            </p>
            <p className="text-xs leading-relaxed text-muted md:text-sm">
              주소 : 서울 용산구 한강로3가 98, 공공시설동 4층 2호
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold md:text-sm">이용문의</p>

            <div className="flex flex-col">
              <span className="text-xs text-muted md:text-sm">
                EMAIL : vetool.co@gmail.com
              </span>

              <Link
                href={OPEN_KAKAO_URL}
                target="_blank"
                className="text-xs text-muted underline md:text-sm"
              >
                카카오 문의
              </Link>
            </div>
          </div>
        </div>

        <br />

        <Separator className="mb-4" />
        <p className="text-sm text-muted">
          &copy; Vetool Co, Ltd. All rights reserved.
        </p>
      </MaxWidthContainer>
    </footer>
  )
}
