import type { ChartableVital } from '@/constants/hospital/icu/chart/vital-chart'
import type { VitalData } from '@/types/icu/chart'

// 체중(BW) 관련 예시
// "5kg" =>	5
// "5 kg"	=> 5
// "5kg(넥칼라ㅇ)" =>	5
// "5(kg)" =>	5
// "5(넥칼라x)"	=> 5
// "약 5.3kg(넥칼라 있음)" =>	5.3
// "체중 6.7kg"	=> 6.7
// " 7.2 kg "	=> 7.2
// "몸무게 약 8.1kg(리드줄 있음)" => 8.1
// "N/A" or "없음" =>	NaN

// 혈압(BP) 관련 예시
// "120/80"	=> 120
// "80/120"	=> 120
// "120mmHg" => 120
// "120/80mmHg" => 120
// "BP: 120/80 mmHg" => 120
// "120(doppler)" => 120
// "120(도플러, #2, 꼬리)" => 120
// "120D" => 120
// "D120" => 120
// "120Doppler(#3, RA)" => 120
// "120(자동, #3, RA)" => 120
// "측정값 120 (자동)" => 120
// "없음" or "N/A" => NaN

// 호흡수(R) 관련 예시
// "panting" => 200
// "P" => 200
// "팬팅" => 200
// "펜팅" => 200
// "Panting114" => 114
// "114panting"	=> 114
// "114P"	=> 114
// "10SRR" => 10
// "SR10" => 10
// "20회/분" => 20
// "30, 2" => 30
// "정상" => NaN

// 심박수(HR) 관련 예시
// "120" => 120
// "120bpm" => 120
// "120회/분" => 120
// "120회" => 120
// "120청진" => 120
// "정상" => NaN

export const purifyVitalValue = (
  selectedVital: ChartableVital,
  singleVitalTx: VitalData,
): number => {
  const result = singleVitalTx.icu_chart_tx_result

  switch (selectedVital) {
    case '체중': {
      // 관호안에 있는 값들 제거, 트림
      const cleaned = result.replace(/\([^)]*\)/g, '').trim()

      // 정규 표현식으로 숫자추출
      const match = cleaned.match(/([\d.]+)/)

      if (match) {
        return Number(match[1])
      }

      return NaN
    }

    case '혈압': {
      // 관호안에 있는 값들 제거, 트림
      const cleaned = result.replace(/\([^)]*\)/g, '').trim()

      // 모든 2-3자리 숫자 추출
      const matches = cleaned.match(/\d{2,3}/g)

      if (matches) {
        const numbers = matches.map(Number)
        return Math.max(...numbers) // 수축기 혈압만 return
      }

      return NaN
    }

    case '호흡수': {
      const lower = result.toLowerCase().trim()

      // P, panting, 팬팅, 펜팅 만 입력한 경우 200으로 처리
      if (
        lower === 'panting' ||
        lower === 'p' ||
        lower === '팬팅' ||
        lower === '펜팅'
      ) {
        return 200
      }

      // 관호안에 있는 값들 제거, 트림
      const cleaned = result.replace(/\([^)]*\)/g, '').trim()

      // 숫자 추출
      const match = cleaned.match(/\d{1,3}/g)

      if (match && match.length > 0) {
        return Number(match[0]) // 첫 번째 숫자만 return
      }

      return NaN
    }

    case '심박수': {
      const cleaned = result
        .replace(/\([^)]*\)/g, '') // 괄호 제거
        .replace(/[^\d]/g, '') // 숫자가 아닌 문자 제거
        .trim()

      const value = Number(cleaned)

      return isNaN(value) ? NaN : value
    }

    default:
      return Number(result)
  }
}
