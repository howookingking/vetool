import {
  ChecklistProtocol,
  ChecklistProtocolItem,
} from '@/types/checklist/checklist-type'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ReactSortable } from 'react-sortablejs'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/utils'

type Props = {
  protocolist: ChecklistProtocol
  setProtocol: (protocol: ChecklistProtocol) => void
}
type postProtocolItem = {
  id: number
  txStart?: null | number
  txEnd?: null | number
  title?: null | string
  type?: null | string
  addinfo?: null | string
  dueStart?: null | string
  mode?: null | string
  isImg?: null | boolean
  imgUrl?: null | string[]
}
export default function ChecklistEditProtocolDragAndDropTableRow({
  protocolist,
  setProtocol,
}: Props) {
  const [protocolSet, setProtocolSet] = useState<postProtocolItem[]>([])

  useEffect(() => {
    const newlist = [] as any
    protocolist &&
      protocolist.length > 0 &&
      protocolist.forEach((list, i) => {
        const newlistItem = { ...list, id: i }
        newlist.push(newlistItem)
      })

    setProtocolSet([...newlist])
  }, [protocolist])
  const delProtocol = (e: React.MouseEvent<HTMLButtonElement>) => {
    const preData = protocolSet ? [...protocolSet] : []
    preData.splice(Number(e.currentTarget.name), 1)
    setProtocol(preData)
  }
  let protocolNo = 0
  const changeProtocolRow = (list: any) => {
    const newlist = [] as any
    list &&
      list.length > 0 &&
      list.map((listItem: any) => {
        const newlistItem = { ...listItem } as any
        delete newlistItem.id
        newlist.push(newlistItem)
      })
    setProtocol(newlist)
  }
  return (
    <div>
      {protocolSet.length > 0 && (
        <ReactSortable list={protocolSet} setList={changeProtocolRow}>
          {protocolSet.map((protocol, i) => {
            protocol.type === 'protocol' && (protocolNo = protocolNo + 1)
            return (
              <div
                key={i}
                className={cn(
                  'm-2 flex w-[95%] items-center justify-between rounded border bg-white p-1 shadow',
                  protocol.type === 'protocol' ? 'bg-green-50' : 'bg-red-50',
                )}
              >
                <div className="mr-2 w-[100px] text-center font-bold">
                  {protocol.type === 'protocol'
                    ? '주요과정' + protocolNo
                    : '주의/확인사항'}{' '}
                </div>
                <div>{protocol.title || '(제목 없음)'} </div>
                <div className="whitespace-pre text-left">
                  {protocol.addinfo || ''}
                </div>
                <div className="w-[150px]">
                  {' '}
                  {protocol.mode === 'afterMain'
                    ? '<주요과정 시작 '
                    : protocol.mode === 'afterStart'
                      ? ' <치료 시작 '
                      : protocol.mode === 'afterSub'
                        ? '<이전과정 실행 '
                        : ''}
                  {protocol.dueStart ? protocol.dueStart + '분후>' : '-'}
                </div>
                <Button
                  type="button"
                  name={String(i)}
                  onClick={delProtocol}
                  variant="outline"
                  size="sm"
                  className="ml-3 w-6"
                >
                  X
                </Button>
              </div>
            )
          })}
        </ReactSortable>
      )}
    </div>
  )
}
