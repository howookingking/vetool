// 보류

import type { Shortcuts } from '@/types/icu/instruction'

export const INSTRUCTIONS = [
  {
    id: 1,
    title: '환자 입원 / 퇴원',
    slides: [
      {
        id: 1,
        video: '/instruction/register/register1.mp4',
        description: '1. 좌측 상단의 환자입원 버튼 클릭',
      },
      {
        id: 2,
        video: '/instruction/register/register2.mp4',
        description: '2. 환자 검색 후 선택하여 입원 등록을 진행',
      },
      {
        id: 3,
        video: '/instruction/register/register3.mp4',
        description: '3. 환자가 없을 경우 신규 환자 등록을 진행',
      },
      {
        id: 4,
        video: '/instruction/register/register4.mp4',
        description: '4. 퇴원 · 퇴원 취소',
      },
    ],
  },
  {
    id: 2,
    title: '차트 생성',
    slides: [
      {
        id: 1,
        video: '/instruction/chart/chart1.mp4',
        description: '1. 기본차트 생성',
      },
      {
        id: 2,
        video: '/instruction/chart/chart2.mp4',
        description: '2. 차트 붙여넣기',
      },
      {
        id: 3,
        video: '/instruction/chart/chart3.mp4',
        description: '3. 템플릿 붙여넣기',
      },
      {
        id: 4,
        video: '/instruction/chart/chart4.mp4',
        description: '4. 전일차트 붙여넣기 (전날의 차트가 있는 경우)',
      },
    ],
  },
  {
    id: 3,
    title: '오더 등록',
    slides: [
      {
        id: 1,
        video: '/instruction/order/order1.mp4',
        description: '1. 단일 오더 추가 (단축키 "CTRL + O")',
      },
      {
        id: 2,
        video: '/instruction/order/order2.mp4',
        description: '2. 빠른 오더 추가',
      },
      {
        id: 3,
        video: '/instruction/order/order3.mp4',
        description: '3. 오더 시간 추가, 변경 ("CTRL 누른상태 + 우클릭")',
      },
      {
        id: 4,
        video: '/instruction/order/order4.mp4',
        description: '4. 오더 순서 변경 (단축키 "CTRL + S")',
      },
      {
        id: 5,
        video: '/instruction/order/order5.mp4',
        description:
          '5. 오더 삭제 - 개별 삭제, 다수 오더 선택("CTRL + 오더클릭") → delete 키',
      },
      {
        id: 6,
        video: '/instruction/order/order6.mp4',
        description: '6. 템플릿 오더 추가',
      },
      {
        id: 7,
        video: '/instruction/order/order7.mp4',
        description:
          '7. 오더 복사: 다수 오더 선택("CTRL + 오더 클릭") → "CTRL + C → CTRL + V" (동일 또는 다른 차트에 붙여넣기 가능)',
      },
    ],
  },
  {
    id: 4,
    title: '처치 입력',
    slides: [
      {
        id: 1,
        video: '/instruction/treatment/treatment1.mp4',
        description: '1. 처치표 확인 → 간단 처치 입력',
      },
      {
        id: 2,
        video: '/instruction/treatment/treatment2.mp4',
        description: '2. 상세 처치 입력(마우스 0.8초간 좌클릭)',
      },
      {
        id: 3,
        video: '/instruction/treatment/treatment3.mp4',
        description:
          '2-1. 간편 상세 처치 입력("처치결과" + "$" + "처치코멘트")',
      },
      {
        id: 4,
        video: '/instruction/treatment/treatment4.mp4',
        description:
          '3. 다중 처치 입력 - 다수 처치 선택("CTRL 누른 상태 + 좌클릭")',
      },
      {
        id: 5,
        video: '/instruction/treatment/treatment5.mp4',
        description:
          '4. 처치 삭제 - 마우스 0.8초간 좌클릭 → 삭제버튼 or 다수 처치 선택("CTRL 누른 상태 + 좌클릭") → 삭제 버튼',
      },
    ],
  },
  {
    id: 5,
    title: '템플릿',
    slides: [
      {
        id: 1,
        video: '/instruction/template/template1.mp4',
        description: '1. 커스텀 템플릿 생성',
      },
      {
        id: 2,
        video: '/instruction/template/template2.mp4',
        description: '2. 빠른 템플릿 생성 - 오더 선택 후 "CTRL + A"',
      },
      {
        id: 3,
        video: '/instruction/template/template3.mp4',
        description: '3. 템플릿 검색 및 수정·삭제',
      },
    ],
  },
  {
    id: 6,
    title: '북마크',
    slides: [
      {
        id: 1,
        video: '/instruction/bookmark/bookmark1.mp4',
        description: '1. 차트 북마크 생성',
      },
      {
        id: 2,
        video: '/instruction/bookmark/bookmark2.mp4',
        description: '2. 북마크 검색 및 미리보기·이동',
      },
      {
        id: 2,
        video: '/instruction/bookmark/bookmark3.mp4',
        description: '3. 북마크 수정·삭제',
      },
    ],
  },
  {
    id: 7,
    title: '단축키 안내',
    slides: [
      {
        id: 1,
        video: '/instruction/template/template1.mp4',
        description: '1. 커스텀 템플릿 생성',
      },
      {
        id: 2,
        video: '/instruction/template/template1.mp4',
        description: '2. 템플릿 검색 및 수정·삭제',
      },
    ],
  },
] as const

export const INSTRUCITON_SHORTCUTS: Shortcuts[] = [
  {
    title: '오더 시간 등록 / 해제',
    description: 'CTRL 누른 채 + 해당 칸 오른쪽 클릭',
    icons: ['keyboard', 'mouse'],
  },
  {
    title: '다수의 처치에 동일한 결과값 입력',
    description:
      "해당하는 처치 칸들을 'CTRL 누른 채 + 좌클릭', 모두 선택하여 CTRL 해제, 입력창에 결과 값 입력",
    icons: ['keyboard', 'mouse'],
  },
] as const
