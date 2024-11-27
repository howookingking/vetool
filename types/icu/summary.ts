export type SummaryData = {
  patient_id: string
  target_date: string
  icu_chart_id: string
  icu_io: {
    in_date: string
    out_date: string | null
    created_at: string
    cage: string | null
  }
  orders: SummaryOrder[]
  patient: {
    name: string
    breed: string
    species: string
  }
}

export type SummaryOrder = {
  order_times: string[]
  treatments: {
    time: number
  }[]
}
