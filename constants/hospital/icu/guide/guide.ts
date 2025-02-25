import { GuideStep } from '@/components/ui/highlight-guide'
import { SelectedChart } from '@/types/icu/chart'

export const HIGHLIGHT_CLASS_NAMES = [
  'z-max',
  'bg-white',
  'ring-4',
  'ring-primary',
]

export const SHARE_GUIDE_STEPS: GuideStep[] = [
  {
    target: 'date-picker',
    title: '날짜 선택',
    description: '해당 날짜의 차트로 이동합니다',
  },
  {
    target: 'patient-info',
    title: '환자 정보',
    description: '환자의 기본 정보와 최근 측정된 체중을 확인할 수 있습니다',
  },
  {
    target: 'vital-chart',
    title: '바이탈 그래프',
    description: '바이탈 그래프를 확인할 수 있습니다',
  },
  {
    target: 'chart-info',
    title: '입원 정보',
    description: '환자의 입원 정보를 확인할 수 있습니다',
  },

  {
    target: 'order-info',
    title: '오더 정보',
    description: '시간별 오더 및 처치 결과를 확인할 수 있습니다',
  },
]
