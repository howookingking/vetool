'use client'

import type { OrderFontSize } from '@/components/hospital/admin/icu-settings/order-font-size/order-font-size-setting'
import type { Plan } from '@/constants/company/plans'
import type { IcuSidebarPatient } from '@/lib/services/icu/icu-layout'
import type { Vet } from '@/types'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'
import { createContext, useContext } from 'react'

type IcuContextType = {
  basicHosData: BasicHosData
}

export type BasicHosData = {
  vetList: Vet[]
  groupListData: string[]
  orderColorsData: IcuOrderColors
  memoNameListData: string[]
  showOrderer: boolean
  showTxUser: boolean
  icuSidebarPatients: IcuSidebarPatient[]
  vitalRefRange: VitalRefRange[]
  orderFontSizeData: OrderFontSize
  timeGuidelineData: number[]
  plan: Plan
  isInChargeSystem: boolean
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
