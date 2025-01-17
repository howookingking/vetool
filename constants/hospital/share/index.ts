export const SHARE_GUIDE_STEPS = [
  {
    target: 'date-picker',
    title: '날짜 선택',
    description:
      '차트를 조회할 날짜를 선택할 수 있습니다 \n 날짜를 변경하면 해당 날짜의 차트 데이터가 표시됩니다',
  },
  {
    target: 'patient-info',
    title: '환자 정보',
    description: `환자의 기본 정보와 최근 측정된 체중을 확인할 수 있습니다 \n 체중 측정일자도 함께 표시됩니다`,
  },
  {
    target: 'chart-info',
    title: '입원 정보',
    description:
      '환자의 입원 정보(진단명, 주요 증상, 입원 일정 등)을(를) 확인할 수 있습니다',
  },

  {
    target: 'order-list',
    title: '오더 목록',
    description: '환자의 오더와 처치 결과를 확인할 수 있습니다',
  },
] as const
