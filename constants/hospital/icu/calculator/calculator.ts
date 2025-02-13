export const CALCULATORS = [
  {
    value: 'counter',
    label: '심박수, 호흡수 측정',
  },
  {
    value: 'fluid-rate',
    label: '수액속도',
  },
  {
    value: 'rer-mer',
    label: 'RER, MER / 사료량',
  },
  {
    value: 'cri',
    label: 'CRI',
  },
  {
    value: 'bsa',
    label: 'BSA',
  },
  // {
  //   value: 'chocolate',
  //   label: '테오브로민(초콜릿) 계산',
  // },
] as const

export const CRI_DRUGS = [
  {
    label: 'Furosemide (20mg/2ml = 10mg/1ml)',
    volumne: '(0.2 ~ 1 mg/kg/hr)',
    value: 'Furosemide',
  },
  {
    label: 'Dobutamine (250mg/5mL = 50mg/1mL)',
    volumne: '(개: 5 ~ 20ug/kg/min, 고양이: 1 ~ 5ug/kg/min)',
    value: 'Dobutamine',
  },
  // {
  //   label: 'Metoclopramide (5mg/ml)',
  //   volumne: '(0.01 ~ 0.09 mg/kg/hr)',
  //   value: 'Metroclopramide',
  // },
  // {
  //   label: 'Bicarbonate (1mEq/ml)',
  //   volumne: '',
  //   value: 'Bicarbonate',
  // },
  // {
  //   label: 'Midazolam (1mg/ml)',
  //   volumne: '(0.05 ~ 0.5(2) mg/kg/hr)',
  //   value: 'Midazolam',
  // },
] as const

export const THEOBROMINE_LEVELS = {
  white: 0.25,
  milk: 2.4,
  darkMild: 5.5,
  darkBitter: 14.0,
  bakingChoc: 26.0,
} as const

export const TOXICITY_LEVELS = {
  mild: 20,
  moderate: 40,
  severe: 60,
} as const
