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
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils/utils'
import { Activity } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const LazyCpcrEtTubeUpdateForm = dynamic(
  () => import('./cpcr-et-tube-update-form'),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[116px]" />,
  },
)

export default function CpcrEtTube({
  cpcrEtTube,
  icuIoId,
}: {
  cpcrEtTube: string
  icuIoId: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [cpcr, etTube] = cpcrEtTube.split(',')

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full items-center justify-start gap-2 truncate px-2"
        >
          <Activity className="text-muted-foreground" size={16} />

          <div className="flex items-center gap-1.5 truncate text-xs 2xl:gap-2 2xl:text-sm">
            <span>{cpcr}</span>

            <Separator
              orientation="vertical"
              className={cn(cpcr !== 'CPCR' && 'hidden', 'h-4')}
            />

            <span>{etTube ?? ''}</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>CPCR 여부 / ET Tube 변경</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <LazyCpcrEtTubeUpdateForm
          icuIoId={icuIoId}
          cpcr={cpcr}
          etTube={etTube}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
