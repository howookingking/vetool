import {
  BarChart4,
  Building,
  HeartPulse,
  Home,
  ListChecks,
  PawPrint,
  Slice,
  Syringe,
} from 'lucide-react'

export const SIDEBAR_ITEMS = [
  {
    name: '병원 홈',
    path: '',
    isReady: true,
    icon: <Home />,
  },
  {
    name: '환자목록',
    path: 'patients',
    isReady: true,
    icon: <PawPrint />,
  },
  {
    name: '입원차트',
    path: 'icu',
    isReady: true,
    icon: <Syringe />,
  },
  {
    name: '외과차트',
    path: 'surgery',
    isReady: false,
    icon: <Slice />,
  },
  {
    name: '심초차트',
    path: 'echocardio',
    isReady: false,
    icon: <HeartPulse />,
  },
  {
    name: '건강검진차트',
    path: 'checkup',
    isReady: false,
    icon: <ListChecks />,
  },
  {
    name: '데이터분석',
    path: 'analytics',
    isReady: false,
    icon: <BarChart4 />,
  },
  {
    name: '벳툴',
    path: 'super',
    isReady: true,
    icon: <Building />,
  },
] as const

export const SORT_FILTER_ITEMS = [
  { label: '입원일순', value: 'date' },
  { label: '수의사순', value: 'vet' },
  { label: '환자 가나다순', value: 'name' },
]
