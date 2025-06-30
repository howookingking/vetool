import { Separator } from '@/components/ui/separator'
import { TableCell } from '@/components/ui/table'

export default function UserKeyGuideMessage({ isDT }: { isDT?: boolean }) {
  return (
    <TableCell className="relative border-l">
      <div className="absolute bottom-3 left-2 hidden items-center gap-2 whitespace-nowrap text-muted-foreground md:flex">
        <div>
          CTRL + 우클릭하여{' '}
          <span className="mx-1 bg-rose-400/10 p-1">형광팬</span>
          칠을 하고 지울 수 있습니다
        </div>

        {!isDT && (
          <>
            <Separator orientation="vertical" className="h-4" />

            <div>
              CTRL + 오더 또는 처치칸을 클릭하면 다중으로 선택할 수 있습니다
            </div>
          </>
        )}
      </div>
    </TableCell>
  )
}
