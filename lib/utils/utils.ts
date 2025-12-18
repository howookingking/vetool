import type {
  FilterState,
  SortFilterValue,
} from '@/components/hospital/icu/sidebar/filters/filters'
import type { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import type { Vet } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { formatDate } from 'date-fns'
import { redirect } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import type { VetoolUser } from '../services/auth/authorization'
import type { IcuSidebarPatient } from '../services/icu/icu-layout'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// '2020-02-02' 와 같은 Date 형식 string 문자열을 받아, age-in-days를 반환하는 유틸 함수
export function getDaysSince(dateString: string | null) {
  if (!dateString) return 0

  const givenDate = new Date(dateString)
  const currentDate = new Date()

  // 두 날짜의 차이를 밀리초 단위로 계산
  const timeDifference = currentDate.getTime() - givenDate.getTime()
  // 차이를 일수로 변환
  const dayDifference = timeDifference / (1000 * 3600 * 24)

  return Math.floor(dayDifference)
}
export function getAgeFromAgeInDays(ageInDays: number) {
  const years = Math.floor(ageInDays / 365)
  const remainingDays = ageInDays % 365
  const months = Math.floor(remainingDays / 30)
  const days = remainingDays % 30

  if (years === 0) {
    if (months === 0) {
      return `${days}일`
    } else {
      return `${months}개월 ${days}일`
    }
  } else if (years > 0 && months === 0) {
    return `${years}살`
  } else {
    return `${years}살 ${months}개월`
  }
}

export function formatTimestamp(utcTimestamp: string) {
  const date = new Date(utcTimestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export function calculateAge(dateString: string) {
  // Parse the input date string
  const birthDate = new Date(dateString)

  // Get the current date
  const today = new Date()

  // Calculate the difference in years
  let ageYears = today.getFullYear() - birthDate.getFullYear()

  // Calculate the difference in months
  let ageMonths = today.getMonth() - birthDate.getMonth()

  // Adjust if the birth month hasn't occurred yet this year
  if (ageMonths < 0) {
    ageYears--
    ageMonths += 12
  }

  // Check if the birth day hasn't occurred yet this month
  if (today.getDate() < birthDate.getDate()) {
    ageMonths--
    if (ageMonths < 0) {
      ageYears--
      ageMonths += 12
    }
  }
  if (ageYears === 0 && ageMonths === 0) {
    return '1개월'
  } else if (ageYears === 0) {
    return `${ageMonths}개월`
  } else if (ageMonths === 0) {
    return `${ageYears}년`
  } else {
    return `${ageYears}년 ${ageMonths}개월`
  }
}

export const getConsecutiveDays = (selectedDate: Date) => {
  // Create a new date in the local timezone to avoid UTC conversion issues
  const normalizedSelectedDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
  )

  const dayBefore = new Date(
    normalizedSelectedDate.getFullYear(),
    normalizedSelectedDate.getMonth(),
    normalizedSelectedDate.getDate() - 1,
  )
  const dayAfter = new Date(
    normalizedSelectedDate.getFullYear(),
    normalizedSelectedDate.getMonth(),
    normalizedSelectedDate.getDate() + 1,
  )

  return {
    dayBefore: formatDate(dayBefore, 'yyyy-MM-dd'),
    seletctedDay: formatDate(normalizedSelectedDate, 'yyyy-MM-dd'),
    dayAfter: formatDate(dayAfter, 'yyyy-MM-dd'),
  }
}

export const formatDateToISOString = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  // Create a new Date object representing the start of the day in UTC
  return new Date(Date.UTC(year, month, day)).toISOString()
}

// stringifiedHashtagKeywords('사과(apple), banana') => '#apple#banana'
export const hashtagKeyword = (stringKeywords: string) => {
  return stringKeywords
    .split(',')
    .map((keyword) => {
      const trimmed = keyword.trim()
      const match = trimmed.match(/\((.*?)\)/)

      if (match) return `#${match[1]}`
      return `#${trimmed}`
    })
    .join('')
}

export const formatTimeDifference = (inputTime: string) => {
  const now = new Date()
  const input = new Date(inputTime)
  const diff = now.getTime() - input.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years}년 전`
  } else if (months > 0) {
    return `${months}개월 전`
  } else if (weeks > 0) {
    return `${weeks}주 전`
  } else if (days > 0) {
    return `${days}일 전`
  } else if (hours > 0) {
    return `${hours}시간 전`
  } else if (minutes > 0) {
    return `${minutes}분 전`
  } else {
    return '방금 전'
  }
}

export const getDateMonthsAgo = (months: string) => {
  const now = new Date()

  return formatTimestamp(
    new Date(
      now.getFullYear(),
      now.getMonth() - Number(months),
      now.getDate(),
    ).toString(),
  )
}

export const changeTargetDateInUrl = (
  path: string,
  newDateString: string,
  params?: URLSearchParams,
) => {
  const DATE_REGEX = /\/(\d{4}-\d{2}-\d{2})\//

  if (params?.has('order-id') || params?.has('time')) {
    params.delete('order-id')
    params.delete('time')
  }

  const newPath = params
    ? `${path.replace(DATE_REGEX, `/${newDateString}/`)}?${params?.toString()}`
    : `${path.replace(DATE_REGEX, `/${newDateString}/`)}`
  return newPath
}

// 우클릭 오더 시간 변경시 큐에 저장된 오더 id와 시간 데이터를 formatting
// ex) [{ orderId: '1', orderTime: 1 }, { orderId: '1', orderTime: 2 }, { orderId: '2', orderTime: 1 }, { orderId: '2', orderTime: 2 }, { orderId: '3', orderTime: 1 }]
// => [{ orderId: '1', orderTimes: [1, 2] }, { orderId: '2', orderTimes: [1, 2] }, { orderId: '3', orderTimes: [1] }]
type FormattedOrder = {
  orderId: string
  orderTimes: number[]
}

export function formatOrders(
  originalArray: OrderTimePendingQueue[],
): FormattedOrder[] {
  const uniqueOrders = new Map<string, Set<number>>()

  for (const order of originalArray) {
    const key = order.orderId

    if (!uniqueOrders.has(key)) {
      uniqueOrders.set(key, new Set())
    }

    // 중복된 orderId & orderTime
    uniqueOrders.get(key)!.add(order.orderTime)
  }

  return Array.from(uniqueOrders).map(([orderId, orderTimes]) => ({
    orderId,
    orderTimes: Array.from(orderTimes),
  }))
}

// export const sortOrders = (orders: SelectedIcuOrder[]): SelectedIcuOrder[] => {
//   return [...orders]
//     .sort((prev, next) => prev.order_name.localeCompare(next.order_name))
//     .sort(
//       (prev, next) =>
//         DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
//           (order) => order === prev.order_type,
//         ) -
//         DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
//           (order) => order === next.order_type,
//         ),
//     )
// }

export const convertPascalCased = (value: string | null) => {
  if (!value) return '품종 선택'

  return value
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
}

export const borderedOrderClassName = (
  sortedOrders: { is_bordered: boolean }[],
  currentOrder: { is_bordered: boolean },
  index: number,
) => {
  const isCurrentOrderBordered = currentOrder.is_bordered
  const isNextOrderBordered = sortedOrders[index + 1]?.is_bordered
  const isPrevOrderBordered = sortedOrders[index - 1]?.is_bordered

  // 현재 오더가 테두리 없음이면 얼리 리턴 (빈 값)
  if (!isCurrentOrderBordered) return {}

  // 초기 스타일 설정
  const style: React.CSSProperties = {
    borderLeft: '2px solid #fb7185',
    borderRight: '2px solid #fb7185',
  }

  if (!isPrevOrderBordered) {
    style.borderTop = '2px solid #fb7185'
  }

  if (!isNextOrderBordered) {
    style.borderBottom = '2px solid #fb7185'
  }

  return style
}

/**
 * 자신이 등록된 병원이 아닌 다른 병원 url을 접근하려고 할 때 자기병원으로 이동하게 하는 함수. 슈퍼게정은 무시
 * @param vetoolUser 벳툴 사용자 객체
 * @param currentUrlHosId 현 url의 병원 아이디
 * @param isSuper 슈퍼계정 사용자 여부
 */
export const redirectToOwnHospital = (
  vetoolUser: VetoolUser,
  currentUrlHosId: string,
  isSuper: boolean,
) => {
  if (isSuper) return
  if (vetoolUser.hos_id !== currentUrlHosId) {
    redirect(`/hospital/${vetoolUser.hos_id}`)
  }
}

export type FilteredData = {
  filteredIcuIoData: IcuSidebarPatient[]
  excludedIcuIoData: IcuSidebarPatient[]
  outIcuIoData: IcuSidebarPatient[]
}

export const filterPatients = (
  data: IcuSidebarPatient[],
  filters: FilterState,
  vetsListData: Vet[],
): FilteredData => {
  const { selectedGroup, selectedVet, selectedSort } = filters

  // === 퇴원 / 미퇴원 먼저 분리 ===
  const inPatients = data.filter((p) => !p.out_date)
  const outPatients = data.filter((p) => p.out_date)

  // === 필터링: 미퇴원 환자만 대상으로 ===
  let filtered = inPatients.filter((item) => {
    const inGroup = !selectedGroup || item.group_list.includes(selectedGroup)

    const byVet =
      !selectedVet ||
      item.vets?.main_vet === selectedVet ||
      item.vets?.sub_vet === selectedVet

    return inGroup && byVet
  })

  // === 정렬 준비 ===
  const rankMap = Object.fromEntries(
    vetsListData.map((vet) => [vet.user_id, vet.rank]),
  )

  const sorters: Record<
    SortFilterValue,
    (a: IcuSidebarPatient, b: IcuSidebarPatient) => number
  > = {
    vet: (a, b) =>
      (rankMap[a.vets?.main_vet ?? ''] ?? 99) -
      (rankMap[b.vets?.main_vet ?? ''] ?? 99),
    name: (a, b) => a.patient.name.localeCompare(b.patient.name, 'ko'),
    urgency: (a, b) => (b.urgency ?? 0) - (a.urgency ?? 0),
    date: () => 0, // 기본값 (정렬 없음)
  }

  // === 정렬 적용 ===
  if (selectedSort in sorters) {
    filtered.sort(sorters[selectedSort])
  }

  // === 제외된 환자 (미퇴원 중에서만) ===
  const filteredSet = new Set(filtered.map((p) => p.icu_io_id))
  const excludedIcuIoData = inPatients.filter(
    (p) => !filteredSet.has(p.icu_io_id),
  )

  // === 퇴원환자 (정렬도 동일하게 적용) ===
  let outIcuIoData = [...outPatients]
  if (selectedSort in sorters) {
    outIcuIoData.sort(sorters[selectedSort])
  }

  return {
    filteredIcuIoData: filtered, // 조건 + 정렬 + 미퇴원
    excludedIcuIoData, // 조건 불일치 + 미퇴원
    outIcuIoData, // 조건과 무관하게 모든 퇴원환자
  }
}

// Function to detect URLs in text and split into parts
export const parseTextWithUrls = (text: string) => {
  // Updated regex to catch URLs with or without protocol
  const urlRegex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|\b[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,}\b)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = urlRegex.exec(text)) !== null) {
    // Add text before URL
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      })
    }
    // Add URL with appropriate protocol
    const url = match[0]
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`
    parts.push({
      type: 'url',
      content: url,
      href: urlWithProtocol,
    })
    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex),
    })
  }

  return parts
}

// 미디어 파일 확장자 검사
export const isVideoFile = (contentType: string) => {
  if (!contentType) false
  return contentType.includes('video')
}

export const handleSafeEnterBlur = (e: React.KeyboardEvent<HTMLInputElement>) =>
  e.key === 'Enter' && !e.nativeEvent.isComposing && e.currentTarget.blur()

type CellClassParams = {
  isGuidelineTime: boolean
  hasOrder: boolean
  isDone: boolean
  isInPendingQueue: boolean
  isInOrderTimePendingQueue: boolean
}

// cell에서 조건에 따른 CSS 표현
// constants/colors와 동기화해야함
export const MULTISELECT =
  'bg-primary/10 ring-1 ring-primary focus-visible:ring-1 focus-visible:ring-primary'
export const GUIDELINE = 'bg-amber-300/10'
export const HAS_ORDER = 'bg-rose-400/10'
export const DONE = 'bg-emerald-400/10'
export const TIME_PENDING = 'bg-rose-400/10 ring-1 ring-rose-400'
export const CANCEL_TIME_PENDING = 'bg-transparent'

export const getCellClassName = (params: CellClassParams) => {
  const { isInPendingQueue } = params

  const baseBg = getBaseBgClass(params)
  const orderTimePendingBg = getOrderTimePendingBg(params)

  return cn(
    'h-11 rounded-none border-none px-1 text-center ring-inset focus-visible:ring-1',

    // 기본 상태
    baseBg,

    // 시간 pending 특수 처리
    orderTimePendingBg,

    // ✅ 무조건 최우선
    isInPendingQueue && MULTISELECT,
  )
}

const getOrderTimePendingBg = ({
  isInOrderTimePendingQueue,
  hasOrder,
  isGuidelineTime,
}: Pick<
  CellClassParams,
  'isInOrderTimePendingQueue' | 'hasOrder' | 'isGuidelineTime'
>) => {
  if (!isInOrderTimePendingQueue) return null

  // 기존에 오더가 있었던 경우
  if (hasOrder) {
    // 가이드라인이면 가이드라인 색 유지
    if (isGuidelineTime) return GUIDELINE
    // 아니면 투명
    return CANCEL_TIME_PENDING
  }

  // 기존에 오더가 없었던 경우
  return TIME_PENDING
}

const getBaseBgClass = ({
  isGuidelineTime,
  hasOrder,
  isDone,
}: Pick<CellClassParams, 'isGuidelineTime' | 'hasOrder' | 'isDone'>) => {
  // 완료가 최우선
  if (isDone) return DONE

  // 오더가 있으면 붉은색
  if (hasOrder) return HAS_ORDER

  // 오더 없고 가이드라인이면 amber
  if (isGuidelineTime) return GUIDELINE

  return ''
}
