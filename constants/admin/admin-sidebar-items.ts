import {
  Pill,
  Syringe,
  TestTubeDiagonal,
  UserCheck,
  Users,
  Utensils,
} from 'lucide-react'

export const ADMIN_SIDEBAR_ITEMS = [
  {
    name: '스태프관리',
    path: 'staff',
    icon: Users,
    isReady: true,
    isResponsive: true,
  },
  {
    name: '사용승인',
    path: 'approval',
    icon: UserCheck,
    isReady: true,
    isResponsive: true,
  },
  {
    name: '입원차트 설정',
    path: 'icu-settings',
    icon: Syringe,
    isReady: true,
    isResponsive: false,
  },
  {
    name: '약물설정',
    path: 'drug-settings',
    icon: Pill,
    isReady: false,
    isResponsive: false,
  },
  {
    name: '사료설정',
    path: 'diet-settings',
    icon: Utensils,
    isReady: false,
    isResponsive: false,
  },
  {
    name: '검사설정',
    path: 'test-settings',
    icon: TestTubeDiagonal,
    isReady: false,
    isResponsive: false,
  },
] as const
