import { type Features } from '@/types/company/company'

export const OPEN_KAKAO_URL = 'https://open.kakao.com/o/si1PkVhh'

export const SURGERY_FEATURES = [
  {
    id: 1,
    title: '수술차트 개요',
    description:
      'Speech To Text (STT, 음성인식)기술로 수술 중 발생하는 특이사항들을 기록하며 마취상태 및 바이탈을 기록할 수 있습니다.',
    imgSrc: '/company/features/surgery/surgery-1.jpg',
  },
] as Features[]

export const ECHOCARDIO_FEATURES = [
  {
    id: 1,
    title: '심장초음파차트 개요',
    description: '심장초음파 측정값들을 입력하면 결과값을 출력해줍니다.',
    imgSrc: '/company/features/echocardio/echocardio-1.png',
  },
] as Features[]

export const CHECKUP_FEATURES = [
  {
    id: 1,
    title: '건강검진차트 개요',
    description:
      '건강검진 결과값을 입력하면 자동으로 보호자 친화적인 문장으로 건겅검진 결과지를 출력해줍니다.',
    imgSrc: '/company/features/checkup/checkup-1.png',
  },
] as Features[]

export const ICU_FEATURES = [
  {
    id: 1,
    title: '입원차트 개요',
    description:
      '종이 입원차트를 디지털로 전환한 차트입니다. 더이상 입원환자 차트를 손으로 작성하느라 시간을 허비하지 마세요.',
    imgSrc: '/company/chart.png',
  },
  {
    id: 2,
    title: '차트 복사 / 붙여넣기',
    description:
      '매번 같은 오더를 반복해서 작성할 필요가 없습니다. 전날의 차트를 붙여넣거나 자주 사용하는 오더를 템플릿으로 저장하여 재사용할 수 있습니다.',
    imgSrc: '/company/features/icu/template.png',
  },
  {
    id: 3,
    title: '수의학 계산기',
    description:
      '사료량, 칼로리, CRI 약물 등 다양한 수의학 계산기를 제공하고 있으며 지속적으로 업데이트하고 있습니다.',
    imgSrc: '/company/features/icu/calculator.png',
  },
  {
    id: 4,
    title: '키워드 검색',
    description:
      '강력한 키워드 검색 기능을 통해 DX, CC, 사용약물, 상위키워드, 동의어, 유의어 검색이 가능합니다.',
    imgSrc: '/company/features/icu/search.png',
  },

  {
    id: 5,
    title: '데이터 분석',
    description:
      '입원 목적, DX, CC, 종, 품종, 처방 약물 등의 데이터 분석이 가능하며 데이터 분석을 위한 도구를 제공합니다.',
    imgSrc: '/company/features/icu/statistics.png',
  },
] as Features[]

export const PLANS = [
  {
    name: 'Mild',
    price: '50,000원/월',
    description: '중소형 동물병원용 요금제',
    features: [
      '수의사 3명',
      '입원환자차트',
      '2GB/월 사진 및 동영상 저장공간',
      '기본 지원',
    ],
    cta: 'Mild 요금제 시작',
    highlighted: false,
  },
  {
    name: 'Moderate',
    price: '100,000원/월',
    description: '대형 동물병원용 요금제',
    features: [
      '수의사 10명',
      '모든 기능',
      '10GB/월 사진 및 동영상 저장공간',
      '우선적인 지원',
      '데이터 분석 자료 제공',
    ],
    cta: 'Moderate 요금제 시작',
    highlighted: true,
  },
  {
    name: 'Severe',
    price: '150,000원/월',
    description: '대형 동물병원용 요금제',
    features: [
      '수의사 수 무제한',
      '모든 기능',
      '20GB/월 사진 및 동영상 저장공간',
      '최우선적인 지원',
      '동물병원 경영컨설팅 지원',
    ],
    cta: 'Severe 요금제 시작',
    highlighted: false,
  },
] as const

export const STATS = [
  { value: 3000, suffix: '', decimals: 0, label: '생성된 디지털 차트' },
  { value: 60.7, suffix: 'K', decimals: 1, label: '수의사의 오더 수' },
  {
    value: 400,
    suffix: '시간',
    decimals: 0,
    label: '벳툴 사용으로 절약한 시간',
  },
] as const

export const SOLUTIONS = [
  {
    id: 1,
    icon: '🔒',
    title: '병원의 차트 데이터는 안전하게 보관되나요?',
    description:
      ' 벳툴은 최고 수준의 보안 시스템을 통해 병원의 모든 데이터를 안전하게 보관합니다. 세밀한 접근 제어, 자동 백업 시스템, AES-256 암호화 표준을 적용하여 데이터를 보호합니다. 또한 HIPAA 규정을 준수하여 의료 정보의 기밀성을 보장합니다.',
    imgSrc: '/company/security-hero.webp',
  },
  {
    id: 2,
    icon: '👁️‍🗨️',
    title: '병원 내 민감한 정보를 모두가 볼 수 있나요?',
    description:
      ' 관리자 페이지 진입, 신규 유저 사용 승인, 차트 설정 등 민감한 정보는 경영진만 접근할 수 있도록 권한을 직접 설정할 수 있습니다.',
    imgSrc: '/company/security-hero.webp',
  },
  {
    id: 3,
    icon: '💾',
    title: '메인차트의 환자 데이터를 옮길 수 있나요?',
    description:
      '네, 인투벳(IntoVet) 또는 이프렌즈(e-friends)에 등록된 전체 환자 정보를 CSV파일로 내보낸 후 벳툴에 업로드 할 수 있습니다',
    imgSrc: '/company/csv.png',
  },
  {
    id: 4,
    icon: '📑',
    title: '작성한 차트를 따로 저장할 수 있나요?',
    description:
      'PDF 형식 또는 이미지 파일 형식으로 입원 단위별 차트를 파일로 저장할 수 있습니다.',
    imgSrc: '/company/pdf.png',
  },
] as const
