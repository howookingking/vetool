'use client'

import type { Plan } from '@/constants/plans'
import type { Vet } from '@/types'
import { createContext, useContext } from 'react'

export type OrderColorDisplay = 'dot' | 'full'

type ClContextDataType = {
  clContextData: ClContextData
}

type ClContextData = {
  vetsListData: Vet[]
  groupListData: string[]
  plan: Plan
  // sidebarData: IcuSidebarIoData[]
}

const BasicHosDataContext = createContext<ClContextDataType | undefined>(
  undefined,
)

export const useClContextData = () => {
  const context = useContext(BasicHosDataContext)

  if (context === undefined) {
    throw new Error('useIcuContext must be used within an IcuProvider')
  }
  return context
}

export const ChecklistContextProvider: React.FC<{
  clContextData: ClContextData
  children: React.ReactNode
}> = ({ clContextData, children }) => {
  return (
    <BasicHosDataContext.Provider value={{ clContextData }}>
      {children}
    </BasicHosDataContext.Provider>
  )
}
