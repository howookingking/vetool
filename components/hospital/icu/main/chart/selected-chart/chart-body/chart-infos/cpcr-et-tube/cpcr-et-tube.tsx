//  TODO: CPCR 선택후 ET Tube 선택하기 불가능하는 문제

'use client'

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
import { ActivityIcon } from 'lucide-react'
import { useState } from 'react'
import CpcrEtTubeUpdateForm from './cpcr-et-tube-update-form'

type Props = {
  cpcrEtTube: string
  icuIoId: string
}

export default function CpcrEtTube({ cpcrEtTube, icuIoId }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [cpcr, etTube] = cpcrEtTube.split(',')

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="default"
          variant="outline"
          className="flex w-full items-center justify-start gap-2 truncate px-2"
        >
          <ActivityIcon className="text-muted-foreground" size={16} />

          <div className="flex items-center gap-1.5 truncate text-xs 2xl:gap-2 2xl:text-sm">
            <span className={cn(cpcr === '미지정' && 'text-muted-foreground')}>
              {cpcr === '미지정' ? 'CPCR 여부 | ET Tube' : cpcr}
            </span>

            <Separator
              orientation="vertical"
              className={cn(cpcr !== 'CPCR' && 'hidden', 'h-4')}
            />

            <span>{etTube}</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>CPCR 여부 | ET Tube</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <CpcrEtTubeUpdateForm
          icuIoId={icuIoId}
          cpcr={cpcr}
          etTube={etTube}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
