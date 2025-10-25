import MobileTitle from '@/components/common/mobile-title'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import { ClipboardListIcon } from 'lucide-react'

export default async function ChartDefaultPage() {
  return (
    <>
      <MobileTitle icon={ClipboardListIcon} title="입원차트" />

      <NoResultSquirrel
        text={'환자를 선택해주세요'}
        className="h-mobile flex-col 2xl:h-desktop"
        size="lg"
      />
    </>
  )
}
