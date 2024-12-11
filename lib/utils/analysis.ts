import type { ChartData, IcuAnalysisData } from '@/types/icu/analysis'
import { differenceInDays } from 'date-fns'
import { DateRange } from 'react-day-picker'

// 날짜별 입원 환자 수 계산
export const groupDataByDate = (originalData: IcuAnalysisData[]) => {
  const dataMap = new Map<string, ChartData>()

  originalData.forEach((item) => {
    const date = item.target_date

    if (!dataMap.has(date)) {
      dataMap.set(date, { date, all: 0, canine: 0, feline: 0 })
    }

    const data = dataMap.get(date)!
    data.all += 1

    if (item.patient.species === 'canine') data.canine += 1
    if (item.patient.species === 'feline') data.feline += 1
  })

  return Array.from(dataMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  )
}

// 환자 중복이 제거된 품종별 입원 환자 수 계산
export const calculateTotals = (originalData: IcuAnalysisData[]) => {
  const patientIdSet = new Set<string>()

  return originalData.reduce(
    (acc, item) => {
      const patientId = item.patient.patient_id

      if (patientIdSet.has(patientId)) return acc

      patientIdSet.add(patientId)

      acc.all += 1

      if (item.patient.species === 'canine') acc.canine += 1
      if (item.patient.species === 'feline') acc.feline += 1

      return acc
    },
    { all: 0, canine: 0, feline: 0 },
  )
}

export const filterIoPatients = (
  analysisData: IcuAnalysisData[],
  selectedGroup: string | null,
  selectedVet: string | null,
) => {
  let filteredData = analysisData

  if (selectedGroup && selectedGroup !== 'all') {
    filteredData = filteredData.filter(
      (item) => item.icu_io?.group_list?.includes(selectedGroup) ?? false,
    )
  }

  if (selectedVet && selectedVet !== 'all') {
    filteredData = filteredData.filter(
      (item) => item.main_vet.name === selectedVet,
    )
  }

  return filteredData
}

export const calculateDailyAverage = (
  analysisData: ChartData[],
  dateRange: DateRange | undefined,
) => {
  const numberOfDays =
    dateRange?.from && dateRange?.to
      ? Math.max(1, differenceInDays(dateRange.to, dateRange.from) + 1)
      : 1

  const total = {
    all: analysisData.reduce((acc, curr) => acc + curr.all, 0),
    canine: analysisData.reduce((acc, curr) => acc + curr.canine, 0),
    feline: analysisData.reduce((acc, curr) => acc + curr.feline, 0),
  }

  const dailyAverages = {
    all: Math.round(total.all / numberOfDays),
    views: Math.round(total.all / numberOfDays),
    canine: Math.round(total.canine / numberOfDays),
    feline: Math.round(total.feline / numberOfDays),
  }

  return dailyAverages
}
