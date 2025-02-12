import { ChartConfig } from '@/components/ui/chart'

export const VITALS = [
  {
    title: '체중',
    initialLength: 5,
  },
  {
    title: '혈압',
    initialLength: 10,
  },
  {
    title: '호흡수',
    initialLength: 10,
  },
  {
    title: '심박수',
    initialLength: 10,
  },
  {
    title: '체온',
    initialLength: 10,
  },
  {
    title: '혈당',
    initialLength: 10,
  },
] as const

export const CHART_CONFIG = {
  weight: {
    label: '체중',
    color: 'hsl(var(--chart-1))',
  },
  blood_pressure: {
    label: '혈압',
    color: 'hsl(var(--chart-2))',
  },
  heart_rate: {
    label: '심박수',
    color: 'hsl(var(--chart-3))',
  },
  respiratory_rate: {
    label: '호흡수',
    color: 'hsl(var(--chart-4))',
  },
  vitality: {
    label: '체온',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig
