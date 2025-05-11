import { ChartConfig } from '@/components/ui/chart'

// 순서 바꾸면 안됨
export const CHARTABLE_VITALS = [
  '체중',
  '혈압',
  '호흡수',
  '심박수',
  '체온',
  '혈당',
  'SPO2',
] as const

export type ChartableVital = (typeof CHARTABLE_VITALS)[number]

export const CHART_CONFIG = {
  weight: {
    label: CHARTABLE_VITALS[0],
    color: 'hsl(var(--chart-1))',
  },
  blood_pressure: {
    label: CHARTABLE_VITALS[1],
    color: 'hsl(var(--chart-2))',
  },
  heart_rate: {
    label: CHARTABLE_VITALS[2],
    color: 'hsl(var(--chart-3))',
  },
  respiratory_rate: {
    label: CHARTABLE_VITALS[3],
    color: 'hsl(var(--chart-4))',
  },
  temperature: {
    label: CHARTABLE_VITALS[4],
    color: 'hsl(var(--chart-5))',
  },
  saturated_oxygen: {
    label: CHARTABLE_VITALS[5],
    color: 'hsl(var(--chart-6))',
  },
  blood_glucose: {
    label: CHARTABLE_VITALS[6],
    color: 'hsl(var(--chart-7))',
  },
} satisfies ChartConfig
