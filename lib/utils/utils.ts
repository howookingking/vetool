import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import { type VetoolUser } from '@/types'
import {
  type Filter,
  type IcuSidebarIoData,
  type SelectedIcuOrder,
  type Vet,
} from '@/types/icu/chart'
import { type ClassValue, clsx } from 'clsx'
import { differenceInDays, isValid, parseISO } from 'date-fns'
import { redirect } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

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

// YYYY-MM-DD string을 받아 현재와 입력받은 날짜 간의 차이를 반환
export const getDaysDifference = (dateString: string) => {
  // 날짜 문자열을 Date 객체로 변환
  const targetDate = new Date(dateString)
  const today = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  )

  // 두 날짜의 차이를 밀리초 단위로 계산
  const diff = today.getTime() - targetDate.getTime()

  // 밀리초를 일 단위로 변환
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24))

  return diffDays
}

export const getConsecutiveDays = (selectedDate: Date) => {
  const dayBefore = new Date(selectedDate)
  dayBefore.setDate(selectedDate.getDate() - 1)
  const dayAfter = new Date(selectedDate)
  dayAfter.setDate(selectedDate.getDate() + 1)

  return {
    dayBefore: formatDate(dayBefore),
    seletctedDay: formatDate(selectedDate),
    dayAfter: formatDate(dayAfter),
  }
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
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

// created_at 형식의 날짜를 현재와 비교해서 difference 차이가 크다면 true
export const isDaysBehind = (dateString: string, difference: number) => {
  const isoDate = parseISO(dateString)

  // Check if the parsed date is valid
  if (!isValid(isoDate)) {
    throw new Error('Invalid date string provided')
  }

  const currentDate = new Date()
  const differenceDays = differenceInDays(currentDate, isoDate)

  return differenceDays >= difference
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

export const sortOrders = (orders: SelectedIcuOrder[]): SelectedIcuOrder[] => {
  return [...orders]
    .sort((prev, next) => prev.order_name.localeCompare(next.order_name))
    .sort(
      (prev, next) =>
        DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
          (order) => order === prev.order_type,
        ) -
        DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
          (order) => order === next.order_type,
        ),
    )
}

export const hasOrderSortingChanges = (
  prevOrders: SelectedIcuOrder[],
  sortedOrders: SelectedIcuOrder[],
) => {
  return JSON.stringify(prevOrders) !== JSON.stringify(sortedOrders)
}

export const convertPascalCased = (value: string | null) => {
  if (!value) return '품종 선택'

  return value
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
}

export const isValidWeightOrderTx = (
  orderType: string,
  orderName: string,
  weight: string,
) => {
  // 오더명에 체중 혹은 몸무게가 포함된 경우
  const isWeightOrderName = /체중|몸무게/.test(orderName)

  // 0 ~ 999 사이의 숫자 (소숫점 2자리까지 허용)
  const isValidWeight =
    weight &&
    /^\d{1,3}(\.\d{1,2})?$/.test(weight) &&
    Number(weight) > 0 &&
    Number(weight) <= 999

  if (orderType === 'checklist' && isWeightOrderName && isValidWeight) {
    return true
  }

  return false
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
    borderLeft: '2.5px solid #fb7185',
    borderRight: '2.5px solid #fb7185',
  }

  if (!isPrevOrderBordered) {
    style.borderTop = '2.5px solid #fb7185'
  }

  if (!isNextOrderBordered) {
    style.borderBottom = '2.5px solid #fb7185'
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

export const filterData = (
  data: IcuSidebarIoData[],
  filters: Filter,
  vetsListData: Vet[],
) => {
  let filtered = [...data]

  // 그룹 필터
  if (filters.selectedGroup.length > 0) {
    filtered = filtered.filter((item) =>
      filters.selectedGroup.some((group) => item.group_list.includes(group)),
    )
  }

  // 수의사 필터
  if (filters.selectedVet) {
    filtered = filtered.filter(
      (item) =>
        item.vets?.main_vet === filters.selectedVet ||
        item.vets?.sub_vet === filters.selectedVet,
    )
  }

  // 정렬 옵션 적용
  // 1. 수의사별 정렬
  if (filters.selectedSort === 'vet') {
    const rankMap = Object.fromEntries(
      vetsListData.map((vet) => [vet.user_id, vet.rank]),
    )

    filtered.sort((a, b) => {
      const rankA = rankMap[a.vets?.main_vet ?? ''] ?? 99
      const rankB = rankMap[b.vets?.main_vet ?? ''] ?? 99
      return rankA - rankB
    })
  }

  // 2. 환자명 정렬
  if (filters.selectedSort === 'name') {
    filtered.sort((a, b) => a.patient.name.localeCompare(b.patient.name, 'ko'))
  }

  // 3. 응급도순 정렬
  if (filters.selectedSort === 'urgency') {
    filtered.sort((a, b) => {
      if (a.vets === null && b.vets === null) return 0
      if (a.vets === null) return 1
      if (b.vets === null) return -1

      const urgencyA = a.vets.urgency ?? 0
      const urgencyB = b.vets.urgency ?? 0
      return urgencyB - urgencyA
    })
  }

  // 최종으로 퇴원 환자 후미로 정렬
  filtered.sort((a, b) => {
    if (a.out_date === null && b.out_date === null) return 0
    if (a.out_date === null) return -1
    if (b.out_date === null) return 1
    return 0
  })

  const filteredIoPatients = filtered.filter((item) => item.out_date === null)

  return {
    filteredIcuIoData: filtered,
    excludedIcuIoData: data.filter((item) => !filtered.includes(item)),
    filteredIoPatientCount: filteredIoPatients.length,
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
