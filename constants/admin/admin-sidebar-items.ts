import { Syringe, UserCheck, Users } from 'lucide-react'

export const ADMIN_SIDEBAR_ITEMS = [
  {
    name: '스태프관리',
    path: 'staff',
    icon: Users,
  },
  {
    name: '사용승인',
    path: 'approval',
    icon: UserCheck,
  },
  {
    name: '입원차트 설정',
    path: 'icu-settings',
    icon: Syringe,
  },
  // {
  //   name: '약물설정',
  //   path: 'drug-settings',
  //   icon: Pill,
  //   isReady: false,
  //   isResponsive: false,
  // },
  // {
  //   name: '사료설정',
  //   path: 'diet-settings',
  //   icon: Utensils,
  //   isReady: false,
  //   isResponsive: false,
  // },
  // {
  //   name: '검사설정',
  //   path: 'test-settings',
  //   icon: TestTubeDiagonal,
  //   isReady: false,
  //   isResponsive: false,
  // },
] as const
