import type { ChartableVital } from '@/constants/hospital/icu/chart/vital-chart'

// 체중 관련 예시
// 5kg =>	5
// 5 kg	=> 5
// 5kg(넥칼라ㅇ) =>	5
// 5(kg) =>	5
// 5(넥칼라x)	=> 5
// 약 5.3kg(넥칼라 있음) =>	5.3
// 체중 6.7kg	=> 6.7
// 7.2 kg => 7.2
// 몸무게 약 8.1kg(리드줄 있음) => 8.1
// N/A or 없음 =>	NaN

// 혈압 관련 예시
// 120/80	=> 120
// 80/120	=> 120
// 120mmHg => 120
// 120/80mmHg => 120
// BP: 120/80 mmHg => 120
// 120(doppler) => 120
// 120(도플러, #2, 꼬리) => 120
// 120D => 120
// D120 => 120
// 120Doppler(#3, RA) => 120
// 120(자동, #3, RA) => 120
// 측정값 120 (자동) => 120
// 없음 or N/A => NaN

// 호흡수 관련 예시
// panting => 200
// P => 200
// 팬팅 => 200
// 펜팅 => 200
// Panting114 => 114
// 114panting	=> 114
// 114P	=> 114
// 10SRR => 10
// SR10 => 10
// 20회/분 => 20
// 30, 2 => 30
// 정상 => NaN

// 심박수 관련 예시
// 120 => 120
// 120bpm => 120
// 120회/분 => 120
// 120회 => 120
// 120청진 => 120
// 촉진120 => 120
// 정상 => NaN

// 체온 관련 예시
// 38 => 38
// 38°C => 38
// 38도 => 38
// 38(직장) => 38
// 술후 36 도 => 36
// 측정불가 => NaN

// 혈당 관련 예시
// 120 => 120
// 120mg/dL => 120
// 120mg/dL(정맥) => 120
// 120(정맥) => 120
// 120(RA 발바닥) => 120
// 120(오른 귀) => 120
// 왼발 150 => 150

// SPO2 관련 예시
// 95 => 95
// 95% => 95
// 95(혓바닥) => 95
// 귀 95 => 95
// 수술 중 95 => 95

const removeParentheses = (input: string): string => {
  return input.replace(/\([^)]*\)/g, '').trim()
}

const extractFirstNumber = (input: string): number | null => {
  const match = input.match(/[\d.]+/)
  return match ? Number(match[0]) : null
}

export const purifyVitalValue = (
  selectedVital: ChartableVital,
  input: string,
): number => {
  const parenthesesRemoved = removeParentheses(input)

  switch (selectedVital) {
    case '체중':
    case '체온':
    case '혈당':
    case 'SPO2': {
      const num = extractFirstNumber(parenthesesRemoved)
      return num !== null ? num : NaN
    }

    case '혈압': {
      const matches = parenthesesRemoved.match(/\d{2,3}/g)
      if (matches) {
        const numbers = matches.map(Number)
        return Math.max(...numbers) // 수축기 혈압
      }
      return NaN
    }

    case '호흡수': {
      const lower = parenthesesRemoved.toLowerCase()

      if (['panting', 'p', '팬팅', '펜팅'].includes(lower)) {
        return 200
      }

      const matches = parenthesesRemoved.match(/\d{1,3}/g)
      if (matches?.length) {
        return Number(matches[0])
      }

      return NaN
    }

    case '심박수': {
      const digitsOnly = parenthesesRemoved.replace(/[^\d]/g, '')
      const value = Number(digitsOnly)
      return isNaN(value) ? NaN : value
    }

    default:
      return NaN
  }
}
