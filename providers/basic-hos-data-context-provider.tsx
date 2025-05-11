'use client'

import type { OrderFontSize } from '@/constants/admin/order-font-size'
import type { Plan } from '@/constants/plans'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import { createContext, useContext } from 'react'

export type OrderColorDisplay = 'dot' | 'full'

type IcuContextType = {
  basicHosData: BasicHosData
}

type BasicHosData = {
  vetsListData: Vet[]
  groupListData: string[]
  orderColorsData: IcuOrderColors
  memoNameListData: string[]
  showOrderer: boolean
  showTxUser: boolean
  sidebarData: IcuSidebarIoData[]
  vitalRefRange: VitalRefRange[]
  orderFontSizeData: OrderFontSize
  timeGuidelineData: number[]
  orderColorDisplay: OrderColorDisplay
  plan: Plan
  isInChargeSystem: boolean
  baselineTime: number
}

const BasicHosDataContext = createContext<IcuContextType | undefined>(undefined)

export const useBasicHosDataContext = () => {
  const context = useContext(BasicHosDataContext)
  if (context === undefined) {
    throw new Error('useIcuContext must be used within an IcuProvider')
  }
  return context
}

export const BasicHosDataProvider: React.FC<{
  basicHosData: BasicHosData
  children: React.ReactNode
}> = ({ basicHosData, children }) => {
  return (
    <BasicHosDataContext.Provider value={{ basicHosData }}>
      {children}
    </BasicHosDataContext.Provider>
  )
}
