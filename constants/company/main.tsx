import kokkiri from '@/public/company/logos/kokkiri.jpg'
import kwangjin from '@/public/company/logos/kwangjin.png'
import royalGangdong from '@/public/company/logos/royal-gangdong.png'
import snc from '@/public/company/logos/snc.png'

export const TESTIMONIALS = [
  {
    image: snc,
    description: (
      <>
        벳툴의 입원환자차트를 사용하고 업무효율이 크게 증가하였습니다. <br />
        집에서도 입원환자의 상태를 확인 할 수 있어서 정말 좋습니다.
      </>
    ),
    name: 'ㅇㅇㅇ',
    title: 'SNC동물메디컬센터 원장',
  },
  {
    image: kwangjin,
    description: (
      <>
        벳툴은 수의사가 무엇을 불편해하는지를 정확히 알고 있습니다.
        <br /> 피드백이 빨라서 좋고 이어서 출시되는 제품들이 기대가 됩니다.
      </>
    ),
    name: 'ㅇㅇㅇ',
    title: '광진동물의료센터 원장',
  },
  {
    image: royalGangdong,
    description: (
      <>
        수의사들 뿐만 아니라 간호사들도 벳툴 입원환자 차트를 좋아합니다.
        <br />
        입원환자 업무 부담이 크게 줄었습니다.
      </>
    ),
    name: 'ㅇㅇㅇ',
    title: '강동로얄동물메디컬센터 원장',
  },
  {
    image: kokkiri,
    description: (
      <>
        수의사들 뿐만 아니라 간호사들도 벳툴 입원환자 차트를 좋아합니다.
        <br />
        입원환자 업무 부담이 크게 줄었습니다.
      </>
    ),
    name: 'ㅇㅇㅇ',
    title: '24시코끼리동물의료센터 원장',
  },
] as const

export const FEATURES = [
  {
    id: 1,
    title: '입원 환자 차트 관리',
    description:
      '입원 환자 차트를 디지털로 관리하는 것이 핵심입니다. 종이 차트를 대체하여 불필요한 시간 소모를 막고, 데이터의 정확성, 접근성 문제를 해결하는 것이 목표입니다.',
    imgSrc: '/company/chart.png',
  },
  {
    id: 2,
    title: '수의학 계산 프로그램',
    description:
      '사료, 칼로리, 약물 등 수의사에게 필요한 다양한 계산 프로그램을 제공하고 지속적으로 업데이트 할 예정입니다.',
    imgSrc: '/company/calculator.png',
  },
  {
    id: 3,
    title: '검색 및 필터링',
    description:
      '강력한 검색 기능을 통해 진단, 증상, 담당 수의사 등을 기준으로 환자 차트를 필터링 하고, 다양한 키워드를 이용하여 과거 입원 이력이 있는 환자를 검색할 수 있습니다.',
    imgSrc: '/company/search.png',
  },
  {
    id: 4,
    title: '오더 템플릿',
    description:
      '매번 같은 오더를 반복해서 작성할 필요가 없습니다. 사용자가 자주 사용하는 오더는 묶어서 손쉽게 재사용할 수 있도록 템플릿을 만들 수 있습니다.',
    imgSrc: '/company/template.png',
  },
  {
    id: 5,
    title: '데이터 분석',
    description:
      '다양한 변수(입원 목적, 진단, 증상, 종, 품종, 처방 약물 등등)에 대한 데이터 추적을 쉽게하고 데이터 분석을 위한 도구를 제공합니다.',
    imgSrc: '/company/statistics.png',
  },
] as const

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

export const TESTIMONIALS_LENGTH = TESTIMONIALS.length
