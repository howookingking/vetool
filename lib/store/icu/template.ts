import { SelectedIcuOrder } from '@/types/icu/chart'
import { TemplateChart } from '@/types/icu/template'
import { create } from 'zustand'

type TemplateState = {
  template: Partial<TemplateChart>
  setTemplate: (newTemplate: Partial<TemplateChart>) => void

  templateOrders: Partial<SelectedIcuOrder>[]
  setTemplateOrders: (newOrders: Partial<SelectedIcuOrder>[]) => void

  orderIndex: number
  setOrderIndex: (orderIndex?: number) => void

  addTemplateOrder: (newOrder: Partial<SelectedIcuOrder>) => void

  updateTemplateOrder: (
    updatedOrder: Partial<SelectedIcuOrder>,
    index: number,
  ) => void

  deleteTemplateOrder: (index: number) => void

  isTemplateDialogOpen: boolean
  setIsTemplateDialogOpen: (isTemplateDialogOpen: boolean) => void

  reset: () => void
}

export const useTemplateStore = create<TemplateState>((set) => ({
  template: {},
  setTemplate: (newTemplate) => set({ template: newTemplate }),

  templateOrders: [],
  setTemplateOrders: (newOrders) => set({ templateOrders: newOrders }),

  orderIndex: 0,
  setOrderIndex: (orderIndex) => set({ orderIndex }),

  addTemplateOrder: (newOrder) =>
    set((state) => ({
      templateOrders: [
        ...state.templateOrders,
        {
          ...newOrder,
        },
      ],
    })),
  updateTemplateOrder: (updatedOrder, orderIndex) =>
    set((state) => ({
      templateOrders: state.templateOrders.map((order, index) =>
        index === orderIndex ? { ...order, ...updatedOrder } : order,
      ),
    })),

  deleteTemplateOrder: (index) =>
    set((state) => ({
      templateOrders: state.templateOrders.filter((_, i) => i !== index),
    })),

  isTemplateDialogOpen: false,
  setIsTemplateDialogOpen: (state) => set({ isTemplateDialogOpen: state }),

  reset: () => set({ templateOrders: [], isTemplateDialogOpen: false }),
}))
