import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'

export default function HomepageFooter() {
  return (
    <footer className="border-t bg-gray-50 py-16">
      <div className="mx-16 lg:mx-48 xl:mx-80 2xl:mx-96">
        <div className="flex gap-4">
          <Link href="#" className="text-xs md:text-base">
            이용약관
          </Link>
          <Link href="#" className="text-xs md:text-base">
            개인정보처리방침
          </Link>
          <Link href="#" className="text-xs md:text-base">
            공지사항
          </Link>
        </div>

        <div className="my-8 flex flex-col justify-between gap-8 md:flex-row md:gap-0">
          <div>
            <p className="text-sm font-semibold leading-relaxed tracking-tighter md:text-lg">
              (주) 벳툴
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
              대표: 이정우 | 사업자등록번호: 658-86-02970
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
              주소: 송파구 송파대로 260 5-20
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
              데이터 기반의 스마트한 의사결정, 벳툴과 함께 수의학 진료의 미래를
              만들어 가세요
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold md:text-sm">이용문의</p>
            <Link
              href="mailto:vetool.co@gmail.com"
              className="text-xs text-muted-foreground underline md:text-sm"
            >
              vetool.co@gmail.com
            </Link>
          </div>
        </div>

        <br />

        <Separator className="mb-4" />
        <p className="text-sm tracking-tighter text-muted-foreground">
          &copy; Vetool Co, Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
