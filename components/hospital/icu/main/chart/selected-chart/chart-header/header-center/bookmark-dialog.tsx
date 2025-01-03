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
import { cn } from '@/lib/utils/utils'
import type { IcuTemplate } from '@/types'
import { Edit, Star } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const LazyBookmarkForm = dynamic(() => import('./bookmark-form'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-[204px]" />,
})

export default function BookmarkDialog({
  icuChartId,
  bookmarkData,
  icon,
}: {
  icuChartId: string
  bookmarkData: Pick<
    IcuTemplate,
    'template_id' | 'template_name' | 'template_comment'
  > | null
  icon: 'star' | 'edit'
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          {icon === 'star' && (
            <Star
              style={{ width: '24px', height: '24px' }}
              className={cn(
                'text-amber-300',
                bookmarkData?.template_id!! && 'fill-amber-300',
              )}
            />
          )}
          {icon === 'edit' && <Edit size={18} />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {`차트 북마크 ${bookmarkData?.template_id!! ? '수정' : '생성'}`}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <LazyBookmarkForm
          setIsDialogOpen={setIsDialogOpen}
          bookmarkData={bookmarkData}
          icuChartId={icuChartId}
          isDialogOpen={isDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
