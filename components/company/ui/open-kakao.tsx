import { Button } from '@/components/ui/button'
import { OPEN_KAKAO_URL } from '@/constants/company/main'
import { KAKAO_YELLOW } from '@/constants/hospital/icu/chart/colors'
import kakoIcon from '@/public/kakao-talk-icon.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function OpenKakao() {
  return (
    <Link
      href={OPEN_KAKAO_URL}
      target="_blank"
      className="fixed bottom-2 right-2 z-30 flex flex-col items-end sm:bottom-8 sm:right-8"
    >
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
        variant="default"
        style={{
          backgroundColor: KAKAO_YELLOW,
        }}
      >
        <Image unoptimized alt="kako icon" src={kakoIcon} />
      </Button>
    </Link>
  )
}
