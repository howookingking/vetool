import MobileTitle from '@/components/common/mobile-title'
import IcuSearchChartEntry from '@/components/hospital/icu/main/search/icu-search-chart-entry'
import { SearchIcon } from 'lucide-react'

export default function SearchPage() {
  return (
    <>
      <MobileTitle icon={SearchIcon} title="검색" />

      <IcuSearchChartEntry />
    </>
  )
}
