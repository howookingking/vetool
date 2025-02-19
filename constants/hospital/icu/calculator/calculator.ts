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
