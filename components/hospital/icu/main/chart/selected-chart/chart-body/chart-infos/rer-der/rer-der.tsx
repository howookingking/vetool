import LargeLoaderCircle from '@/components/common/large-loader-circle'
import RerDerToolTip from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/rer-der/rer-der-tool-tip'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { calculateRer } from '@/lib/calculators/rer'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Zap } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const LazyRerDerForm = dynamic(
  () =>
    import(
      '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/rer-der/rer-der-form'
    ),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[80px]" />,
  },
)

export default function RerDer({
  weight,
  icuChartId,
  species,
  derCalcFactor,
}: {
  weight: string
  icuChartId: string
  species: string
  derCalcFactor: number | null
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [factor, setFactor] = useState(
    derCalcFactor ? derCalcFactor.toString() : '',
  )
  const hasNoWeight = weight === ''

  useEffect(() => {
    setFactor(derCalcFactor ? derCalcFactor.toString() : '')
  }, [derCalcFactor])

  const {
    basicHosData: { rerCalcMethod },
  } = useBasicHosDataContext()

  const calculatedRer = calculateRer(
    weight,
    species as 'canine' | 'feline',
    rerCalcMethod as 'a' | 'b',
  )

  const calculatedDer = (Number(calculatedRer) * Number(factor)).toFixed(0)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full items-center justify-start gap-2 p-2"
        >
          <Label className="text-xs text-muted-foreground" htmlFor="ownerName">
            <Zap size={16} className="text-muted-foreground" />
          </Label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-muted-foreground md:block">
                RER
              </span>
              <span>{hasNoWeight ? '체중 입력' : calculatedRer}</span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-muted-foreground md:block">
                DER
              </span>
              <span>
                {hasNoWeight ? '체중 입력' : factor ? calculatedDer : '미정'}
              </span>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>RER & DER</span>
            <RerDerToolTip rerCalcMethod={rerCalcMethod as 'a' | 'b'} />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <LazyRerDerForm
          factor={factor}
          setFactor={setFactor}
          hasNoWeight={hasNoWeight}
          icuChartId={icuChartId}
          derCalcFactor={derCalcFactor}
          setIsDialogOpen={setIsDialogOpen}
          calculatedRer={calculatedRer}
          calculatedDer={calculatedDer}
        />
      </DialogContent>
    </Dialog>
  )
}
