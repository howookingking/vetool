import DesktopSidebar from '@/components/hospital/sidebar/desktop/desktop-sidebar'
import MobileSidebar from '@/components/hospital/sidebar/mobile/mobile-sidebar'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
import {
  BarChart4Icon,
  BuildingIcon,
  HeartPulseIcon,
  HomeIcon,
  ListChecksIcon,
  PawPrintIcon,
  SliceIcon,
  SyringeIcon,
} from 'lucide-react'
// import { getPlan } from '@/lib/services/auth/plan'

export default async function HospitalSidebar({ hosId }: { hosId: string }) {
  const vetoolUser = await getVetoolUserData()

  // 요금제 기능 비화성화
  // const plan = await getPlan(hosId)
  const plan = 'severe'

  return (
    <>
      <DesktopSidebar hosId={hosId} vetoolUser={vetoolUser} plan={plan} />

      <MobileSidebar hosId={hosId} vetoolUser={vetoolUser} plan={plan} />
    </>
  )
}

export const SIDEBAR_MENUS = [
  {
    name: '병원 홈',
    path: '',
    isReady: true,
    icon: <HomeIcon />,
  },
  {
    name: '환자목록',
    path: 'patients',
    isReady: true,
    icon: <PawPrintIcon />,
  },
  {
    name: '입원차트',
    path: 'icu',
    isReady: true,
    icon: <SyringeIcon />,
  },
  {
    name: '외과차트',
    path: 'surgery',
    isReady: false,
    icon: <SliceIcon />,
  },
  {
    name: '심초차트',
    path: 'echocardio',
    isReady: false,
    icon: <HeartPulseIcon />,
  },
  {
    name: '건강검진차트',
    path: 'checkup',
    isReady: false,
    icon: <ListChecksIcon />,
  },
  {
    name: '데이터분석',
    path: 'analytics',
    isReady: false,
    icon: <BarChart4Icon />,
  },
  {
    name: '벳툴',
    path: 'super',
    isReady: true,
    icon: <BuildingIcon />,
  },
] as const
