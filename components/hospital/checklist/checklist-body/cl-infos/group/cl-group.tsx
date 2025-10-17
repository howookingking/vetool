'use client'

import GroupBadge from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/group/group-badge'
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
import ClGroupForm from './cl-group-form'

type Props = {
  currentGroups: string[]
  checklistId: string
}

export default function ClGroup({ currentGroups, checklistId }: Props) {
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

        <ClGroupForm
          checklistId={checklistId}
          setIsDialogOpen={setIsDialogOpen}
          form={form}
        />
      </DialogContent>
    </Dialog>
  )
}
