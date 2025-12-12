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

type RefRangedVitalOrder =
  | '체온'
  | '심박수'
  | '호흡수'
  | '혈압'
  | 'SPO2'
  | '혈당'

export type VitalRefRange = {
  order_name: RefRangedVitalOrder
  canine: {
    min: number
    max: number
  }
  feline: {
    min: number
    max: number
  }
}
