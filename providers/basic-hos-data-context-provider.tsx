'use client'

import { ORDER_FONT_SIZES } from '@/constants/admin/admin-setting-items'
import {
  type IcuOrderColors,
  type VitalRefRange,
  type Plans,
} from '@/types/adimin'
import { type IcuSidebarIoData, type Vet } from '@/types/icu/chart'
import React, { createContext, useContext } from 'react'

type IcuContextType = {
  basicHosData: BasicHosData
}

export type OrderColorDisplay = 'dot' | 'full'

type BasicHosData = {
  vetsListData: Vet[]
  groupListData: string[]
  orderColorsData: IcuOrderColors
  memoNameListData: string[]
  showOrderer: boolean
  showTxUser: boolean
  sidebarData: IcuSidebarIoData[]
  vitalRefRange: VitalRefRange[]
  orderFontSizeData: keyof typeof ORDER_FONT_SIZES
  timeGuidelineData: number[]
  orderColorDisplay: OrderColorDisplay
  plan: Plans
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
