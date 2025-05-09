'use client'

import { IcuOrderColors, VitalRefRange } from '@/types/adimin'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import React, { createContext, useContext } from 'react'

interface IcuContextType {
  basicHosData: BasicHosData
}

type BasicHosData = {
  vetsListData: Vet[]
  groupListData: string[]
  orderColorsData: IcuOrderColors
  memoNameListData: string[]
  showOrderer: boolean
  showTxUser: boolean
  // maintenanceRateCalcMethod: string
  // rerCalcMethod: 'a' | 'b'
  sidebarData: IcuSidebarIoData[]
  vitalRefRange: VitalRefRange[]
  orderFontSizeData: number
  timeGuidelineData: number[]
  orderColorDisplay: string
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
