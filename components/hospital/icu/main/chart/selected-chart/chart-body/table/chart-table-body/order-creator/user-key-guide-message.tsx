import { Separator } from '@/components/ui/separator'
import { TableCell } from '@/components/ui/table'

export default function UserKeyGuideMessage({ isDT }: { isDT?: boolean }) {
  return (
    <TableCell className="relative border-l">
      <div className="absolute bottom-3 left-2 hidden items-center gap-2 whitespace-nowrap text-muted-foreground md:flex">
        <div>
          <span className="mx-1 bg-rose-400/10 p-1">형광팬</span> : CTRL +
          처치칸 우클릭
        </div>

        {!isDT && (
          <>
            <Separator orientation="vertical" className="h-4" />
            <div>다중선택 : CTRL + 오더 또는 처치칸 좌클릭</div>

            <Separator orientation="vertical" className="h-4" />
            <div>처치칸에 &quot;처치결과$코멘트&quot; 입력가능</div>
          </>
        )}
      </div>
    </TableCell>
  )
}
