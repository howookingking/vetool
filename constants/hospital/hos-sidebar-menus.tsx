import {
  BarChart4Icon,
  BuildingIcon,
  CheckSquareIcon,
  HeartPulseIcon,
  HomeIcon,
  ListChecksIcon,
  PawPrintIcon,
  SliceIcon,
  SyringeIcon,
} from 'lucide-react'

export const HOS_SIDEBAR_MENUS = [
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
    name: '체크리스트',
    path: 'checklist',
    isReady: true,
    icon: <CheckSquareIcon />,
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
