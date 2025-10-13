import DesktopIcuSidebar from '@/components/hospital/icu/sidebar/desktop-icu-sidebar'
import { MobileIcuSidebarSheet } from '@/components/hospital/icu/sidebar/mobile/mobile-icu-sidebar-sheet'
import type { IcuSidebarPatient } from '@/lib/services/icu/icu-layout'
import type { Vet } from '@/types'

type Props = {
  hosId: string
  targetDate: string
  icuSidebarPatients: IcuSidebarPatient[]
  vetList: Vet[]
  hosGroupList: string[]
}

export default function IcuSidebar({
  hosId,
  targetDate,
  icuSidebarPatients,
  vetList,
  hosGroupList,
}: Props) {
  return (
    <>
      <DesktopIcuSidebar
        hosId={hosId}
        targetDate={targetDate}
        hosGroupList={hosGroupList}
        vetList={vetList}
        icuSidebarPatients={icuSidebarPatients}
      />

      <MobileIcuSidebarSheet
        targetDate={targetDate}
        icuSidebarPatients={icuSidebarPatients}
        // icuSidebarPatients에는 main_vet, sub_vet의 id만 있음,
        // 그래서 사이드바에서 주치의의 이름을 보여주기 위한 방법으로
        // 1. main_vet, sub_vet 의 이름도 서버에서 조인해서 가져오기 => RPC 함수 수정
        // 2. 전역에 vetList가 있으니깐 여기에서 lookup하는 방법
        // 하루 입원환자가 50마리 이상, 수의사 수 20명 초과 할 경우 서버에서 1번이 효율적임 이하의 경우 2번이 효율적
        vetList={vetList}
        hosId={hosId}
      />
    </>
  )
}
