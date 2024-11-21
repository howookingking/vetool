import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateDerCalcFactor } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { cn } from '@/lib/utils/utils'
import { Equal, LoaderCircle, X } from 'lucide-react'
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import RerDerDisplay from './rer-der-display'

export default function RerDerForm({
  factor,
  setFactor,
  hasNoWeight,
  setIsDialogOpen,
  icuChartId,
  derCalcFactor,
  calculatedRer,
  calculatedDer,
}: {
  factor: string
  setFactor: React.Dispatch<React.SetStateAction<string>>
  hasNoWeight: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  derCalcFactor: number | null
  icuChartId: string
  calculatedRer: string
  calculatedDer: string
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFactorNan, setIsFactorNan] = useState(false)
  const factorRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (Number.isNaN(Number(factor))) {
      setIsFactorNan(true)
    } else {
      setIsFactorNan(false)
    }
  }, [factor])

  useEffect(() => {
    factorRef.current?.focus()
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isFactorNan) {
      factorRef.current?.focus()
      return
    }
    if (hasNoWeight) {
      return
    }

    if (derCalcFactor === Number(factor)) {
      setIsDialogOpen(false)
      return
    }

    setIsSubmitting(true)
    await updateDerCalcFactor(icuChartId, Number(factor))

    toast({
      title: 'DER이 수정되었습니다',
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  return (
    <form
      className="mt-2 grid grid-cols-9 items-center justify-center gap-2"
      onSubmit={handleSubmit}
    >
      <RerDerDisplay
        calcuatedVal={hasNoWeight ? '체중 입력' : calculatedRer}
        prefix="RER"
      />

      <X className="col-span-1 w-full" />

      <Input
        ref={factorRef}
        className={cn(
          isFactorNan &&
            'focus:ring-error focus-visible:ring-2 focus-visible:ring-rose-300',
          'col-span-1',
        )}
        placeholder="배수"
        value={factor}
        onChange={(e) => setFactor(e.target.value)}
      />

      <Equal className="col-span-1 w-full" />

      <RerDerDisplay
        calcuatedVal={
          hasNoWeight ? '체중 입력' : isFactorNan ? '숫자입력' : calculatedDer
        }
        prefix="DER"
      />

      <div className="col-span-9 ml-auto flex w-full justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsDialogOpen(false)}
        >
          취소
        </Button>

        <Button type="submit" className="ml-2" disabled={isSubmitting}>
          확인
          <LoaderCircle
            className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </div>
    </form>
  )
}
