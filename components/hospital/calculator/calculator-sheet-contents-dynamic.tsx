import dynamic from 'next/dynamic'

const CalculatorSheetContentsDynamic = dynamic(
  () => import('@/components/hospital/calculator/calculator-sheet-contents'),
  {
    ssr: false,
  },
)

export default CalculatorSheetContentsDynamic
