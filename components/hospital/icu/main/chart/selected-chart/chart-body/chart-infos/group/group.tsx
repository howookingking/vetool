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
import { Component } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import GroupBadge from './group-badge'

const LazyGroupForm = dynamic(() => import('./group-form'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-[120px]" />,
})

export default function Group({
  currentGroups,
  icuIoId,
}: {
  currentGroups: string[]
  icuIoId: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full justify-start overflow-hidden px-2"
        >
          <Component size={16} className="text-muted-foreground" />

          <GroupBadge currentGroups={currentGroups} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>그룹 수정</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <LazyGroupForm
          currentGroups={currentGroups}
          isDialogOpen={isDialogOpen}
          icuIoId={icuIoId}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
