import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Separator } from '@/components/ui/separator'
import { TableCell } from '@/components/ui/table'

export default function UserKeyGuideMessage({ isDT }: { isDT?: boolean }) {
  return (
    <TableCell className="relative border-l">
      <div className="absolute bottom-2 left-1 hidden items-center gap-2 whitespace-nowrap text-muted-foreground md:flex">
        <div className="flex items-center gap-1">
          <span className="mx-1 bg-rose-400/10 p-1">형광팬</span> :{' '}
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span> + </span>
            <div className="h-4 w-4 border border-border" />
            <Kbd>우클릭</Kbd>
          </KbdGroup>
        </div>

        {!isDT && (
          <>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              다중선택 : <Kbd>Ctrl</Kbd>
              <span> + </span>
              <div className="h-4 w-4 border border-border" />
              <Kbd>클릭</Kbd>
            </div>

            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              처치 상세 입력 : <div className="h-4 w-4 border border-border" />{' '}
              길게 <Kbd>클릭</Kbd>
            </div>
          </>
        )}
      </div>
    </TableCell>
  )
}
