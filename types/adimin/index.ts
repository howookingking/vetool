import type { Diet, DrugProductsRows, Hospital, RawDrug } from '@/types'

export type IcuOrderColors = {
  [key in
    | 'po'
    | 'feed'
    | 'test'
    | 'fluid'
    | 'manual'
    | 'checklist'
    | 'injection']: string
}

export type IcuDefaultChartJoined = {
  chart_id: string
  chart_order_name: string
  chart_order_comment: string
  chart_order_type: string
  chart_order_priority: number
}

export type IcuChartsInCharge = {
  today: {
    all: string
    am: string
    pm: string
  }
  tomorrow: {
    all: string
    am: string
    pm: string
  }
}

export type VitalRefRange = {
  order_name: string
  canine: {
    min: number
    max: number
  }
  feline: {
    min: number
    max: number
  }
}

export type DrugProductDetail = Pick<
  DrugProductsRows,
  | 'drug_products_id'
  | 'name'
  | 'total_vol'
  | 'unit'
  | 'type'
  | 'description'
  | 'company'
  | 'mass_vol'
  | 'hos_id'
>
// &
//   Pick<
//     DrugDescription,
//     'indication' | 'side_effect' | 'drugs_description_id' | 'drug_name'
//   >

export type AdminDietData = Pick<
  Diet,
  | 'diet_id'
  | 'name'
  | 'description'
  | 'company'
  | 'unit'
  | 'mass_vol'
  | 'species'
  | 'created_at'
> & {
  hos_id: Pick<Hospital, 'hos_id' | 'name'>
}

export type RawDrugs = Pick<RawDrug, 'raw_drug_id' | 'raw_drug_name'>
