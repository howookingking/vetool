import { type OrderType } from '@/constants/hospital/icu/chart/order'
import CopyButton from './copy-button'
import InsertOrderButton from './insert-order-button'

type Props = {
  displayResult: React.ReactNode
  copyResult: string
  comment?: string
  hasInsertOrderButton?: boolean
  setIsSheetOpen?: React.Dispatch<React.SetStateAction<boolean>>
  orderType?: OrderType
}

export default function CalculatorResult({
  displayResult,
  copyResult,
  comment,
  hasInsertOrderButton = false,
  setIsSheetOpen,
  orderType,
}: Props) {
  return (
    <div className="flex w-full animate-slideDown flex-col items-center justify-center rounded-md bg-slate-100 py-4 text-lg">
      <div className="flex items-center gap-1">
        {hasInsertOrderButton && (
          <InsertOrderButton
            orderName={copyResult}
            setIsSheetOpen={setIsSheetOpen}
            orderType={orderType}
          />
        )}
        <div className="text-xs sm:text-base">{displayResult}</div>

        <CopyButton copyResult={copyResult} />
      </div>

      {comment && <span className="text-sm font-normal">{comment}</span>}
    </div>
  )
}
