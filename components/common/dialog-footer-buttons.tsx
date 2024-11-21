import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

export default function DialogFooterButtons({
  isLoading,
  setIsDialogOpen,
  buttonName,
}: {
  isLoading?: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  buttonName: string
}) {
  return (
    <div className="col-span-2 ml-auto font-semibold">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsDialogOpen(false)}
      >
        취소
      </Button>

      <Button type="submit" className="ml-2" disabled={isLoading}>
        {buttonName}
        <LoaderCircle
          className={cn(isLoading ? 'ml-2 animate-spin' : 'hidden')}
        />
      </Button>
    </div>
  )
}
