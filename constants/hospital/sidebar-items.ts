export const SIDEBAR_ITEMS = [
  {
    name: '병원 홈',
    path: '',
    iconName: 'Home',
    isReady: true,
  },
  {
    name: '환자목록',
    path: 'patients',
    iconName: 'PawPrint',
    isReady: true,
  },
  {
    name: '입원차트',
    path: 'icu',
    iconName: 'Syringe',
    isReady: true,
  },
  {
    name: '외과차트',
    path: 'surgery',
    iconName: 'Slice',
    isReady: false,
  },
  {
    name: '심초차트',
    path: 'echocardio',
    iconName: 'HeartPulse',
    isReady: false,
  },
  {
    name: '건강검진차트',
    path: 'checkup',
    iconName: 'ListChecks',
    isReady: false,
  },
  {
    name: '데이터분석',
    path: 'analytics',
    iconName: 'BarChart4',
    isReady: false,
  },
  {
    name: '벳툴',
    path: 'super',
    iconName: 'Building',
    isReady: true,
  },
] as const
