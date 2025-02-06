'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
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
import { Zap } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const LazyRerDerForm = dynamic(
  () => import('@/unused/icu-chart/chart-info/rer-der/rer-der-form'),
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

  // const {
  //   basicHosData: { rerCalcMethod },
  // } = useBasicHosDataContext()

  // const calculatedRer = calculateRer(
  //   weight,
  //   species as 'canine' | 'feline',
  //   'a',
  // )

  // const calculatedDer = (Number(calculatedRer) * Number(factor)).toFixed(0)

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
          <div className="flex items-center gap-2 truncate">
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-muted-foreground md:block">
                RER
              </span>
              <span>{hasNoWeight ? '체중 입력' : ''}</span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-muted-foreground md:block">
                DER
              </span>
              <span>{hasNoWeight ? '체중 입력' : factor ? '' : '미정'}</span>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>RER & DER</span>
            {/* <RerDerToolTip rerCalcMethod={'a'} /> */}
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
          calculatedRer={'unused'}
          calculatedDer={'unused'}
        />
      </DialogContent>
    </Dialog>
  )
}
