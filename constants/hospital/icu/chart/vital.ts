import { ChartConfig } from '@/components/ui/chart'

export const VITALS = [
  {
    id: 0,
    title: '체중',
    isActive: true,
    initialLength: 5,
  },
  {
    id: 1,
    title: '혈압',
    isActive: true,
    initialLength: 10,
  },
  {
    id: 2,
    title: '호흡수',
    isActive: true,
    initialLength: 10,
  },
  {
    id: 3,
    title: '심박수',
    isActive: true,
    initialLength: 10,
  },
  {
    id: 4,
    title: '체온',
    isActive: true,
    initialLength: 10,
  },
  {
    id: 5,
    title: '혈당',
    isActive: true,
    initialLength: 10,
  },
  {
    id: 6,
    title: 'SPO2',
    isActive: true,
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
