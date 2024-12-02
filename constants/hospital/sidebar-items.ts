export const SIDEBAR_ITEMS = [
  {
    name: '병원 홈',
    path: '',
    iconName: 'Home',
    isReady: true,
    isSuperOnly: false,
  },
  {
    name: '환자목록',
    path: 'patients',
    iconName: 'PawPrint',
    isReady: true,
    isSuperOnly: false,
  },
  {
    name: '입원차트',
    path: 'icu',
    iconName: 'Syringe',
    isReady: true,
    isSuperOnly: false,
  },
  {
    name: '외과차트',
    path: 'surgery',
    iconName: 'Slice',
    isReady: false,
    isSuperOnly: false,
  },
  {
    name: '심초차트',
    path: 'echocardio',
    iconName: 'HeartPulse',
    isReady: false,
    isSuperOnly: false,
  },
  {
    name: '건강검진차트',
    path: 'checkup',
    iconName: 'ListChecks',
    isReady: false,
    isSuperOnly: false,
  },
  {
    name: '데이터분석',
    path: 'analytics',
    iconName: 'BarChart4',
    isReady: false,
    isSuperOnly: false,
  },
  {
    name: '벳툴',
    path: 'super',
    iconName: 'Building',
    isReady: true,
    isSuperOnly: true,
  },
] as const
