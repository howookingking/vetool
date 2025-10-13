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
import { groupCheckFormSchema } from '@/lib/schemas/icu/chart/chart-info-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ComponentIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import GroupBadge from './group-badge'
import GroupForm from './group-form'

type Props = {
  currentGroups: string[]
  icuIoId: string
}

export default function Group({ currentGroups, icuIoId }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof groupCheckFormSchema>>({
    resolver: zodResolver(groupCheckFormSchema),
    defaultValues: {
      groupList: currentGroups,
    },
  })

  const handleOpenChange = (open: boolean) => {
    if (open) {
      form.reset({
        groupList: currentGroups,
      })
    }
    setIsDialogOpen(open)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex w-full justify-start px-2">
          <ComponentIcon size={16} className="text-muted-foreground" />
          {currentGroups.length === 0 && (
            <span className="text-muted-foreground">그룹</span>
          )}
          <GroupBadge currentGroups={currentGroups} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>그룹 수정</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <GroupForm
          icuIoId={icuIoId}
          setIsDialogOpen={setIsDialogOpen}
          form={form}
        />
      </DialogContent>
    </Dialog>
  )
}
