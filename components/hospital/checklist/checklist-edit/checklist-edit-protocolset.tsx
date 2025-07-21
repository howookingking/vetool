import {
  ChecklistProtocol,
  ProtocolItem,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ReactSortable } from 'react-sortablejs'
import ChecklistEditProtocolDragAndDropTableRow from './checklist-edit-protocol-drag-and-drop-tablerow'

type Props = {
  protocolSet: ChecklistProtocol | null
  setProtocol: (protocol: ChecklistProtocol) => void
}

export default function ChecklistEditProtocolset({
  protocolSet,
  setProtocol,
}: Props) {
  //   const [mainProtocol, setMainProtocol] = useState<ProtocolItem>({
  //     title: null,
  //     type: 'main',
  //     addinfo: null,
  //     dueStart: null,
  //     mode: null,
  //   })
  const [protocolitem, setProtocolItem] = useState<ProtocolItem>({
    title: null,
    type: 'protocol',
    addinfo: null,
    dueStart: null,
    mode: null,
  })
  const [checkitem, setCheckItem] = useState<ProtocolItem>({
    title: null,
    type: 'check',
    addinfo: null,
    dueStart: null,
    mode: null,
  })
  const changeProtocolMode = (
    type: string,
    key: keyof ProtocolItem,
    value: string,
  ) => {
    if (type === 'protocol') {
      const preprotocolitem = { ...protocolitem }
      preprotocolitem[key] = value

      setProtocolItem(preprotocolitem)
    } else {
      const precheckitem = { ...checkitem }
      precheckitem[key] = value

      setCheckItem(precheckitem)
    }
  }
  const addProtocol = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name

    if (name === 'protocol') {
      const preprotocolitem = { ...protocolitem }
      if (preprotocolitem.mode && preprotocolitem.dueStart) {
        const preData = protocolSet ? [...protocolSet] : []
        preData.push(preprotocolitem)
        setProtocol(preData)
        setProtocolItem({
          title: null,
          type: 'protocol',
          addinfo: null,
          dueStart: null,
          mode: protocolitem.mode,
        })
      } else {
        preprotocolitem.mode = null
        preprotocolitem.dueStart = null
        const preData = protocolSet ? [...protocolSet] : []
        preData.push(preprotocolitem)
        setProtocol(preData)
        setProtocolItem({
          title: null,
          type: 'protocol',
          addinfo: null,
          dueStart: null,
          mode: protocolitem.mode,
        })
      }
    } else {
      const preprotocolitem = { ...checkitem }
      const preData = protocolSet ? [...protocolSet] : []
      preData.push(preprotocolitem)
      setProtocol(preData)
      setCheckItem({
        title: null,
        type: 'check',
        addinfo: null,
        dueStart: null,
        mode: protocolitem.mode,
      })
    }
  }
  const delProtocol = (e: React.MouseEvent<HTMLButtonElement>) => {
    const preData = protocolSet ? [...protocolSet] : []
    preData.splice(Number(e.currentTarget.name), 1)
    setProtocol(preData)
  }
  return (
    <div className="flex flex-col border border-gray-300">
      {/* protocol */}
      <div className="m-2 flex flex-col border border-gray-300">
        <div className="m-3 flex flex-wrap items-center">
          <div className="ml-3 mr-2 w-[100px] text-sm">주요과정</div>
          <Input
            value={protocolitem && protocolitem.title ? protocolitem.title : ''}
            placeholder="과정을 기록 하세요"
            className="w-[300px]"
            onChange={(e) => {
              changeProtocolMode('protocol', 'title', e.target.value)
            }}
          />
          <div className="ml-2 mr-2 text-sm">:</div>
          <Select
            defaultValue={
              protocolitem && protocolitem.mode ? protocolitem.mode : ''
            }
            onValueChange={(value) => {
              changeProtocolMode('protocol', 'mode', value)
            }}
          >
            <SelectTrigger className="mr-2 w-[100px]">
              <SelectValue placeholder="시작시점" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="afterStart">치료시작후</SelectItem>
              {/* <SelectItem value="afterMain">메인과정 시작 후</SelectItem> */}
              <SelectItem value="afterSub">직전과정 완료 후</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="min"
            type="number"
            className="mr-2 w-[70px]"
            value={
              protocolitem && protocolitem.dueStart ? protocolitem.dueStart : ''
            }
            onChange={(e) => {
              changeProtocolMode('protocol', 'dueStart', e.target.value)
            }}
          />
          <div className="ml-2 mr-2 text-sm">분 후시작</div>
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" className="mr-2">
                추가정보
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Textarea
                value={
                  protocolitem && protocolitem.addinfo
                    ? protocolitem.addinfo
                    : ''
                }
                onChange={(e) => {
                  changeProtocolMode('protocol', 'addinfo', e.target.value)
                }}
              ></Textarea>
            </PopoverContent>
          </Popover>
          <div>
            <Button
              type="button"
              name="protocol"
              size="sm"
              onClick={addProtocol}
            >
              +
            </Button>
          </div>
        </div>
        <div>
          <div className="m-3 flex flex-wrap items-center">
            <div className="ml-3 mr-2 w-[100px] text-sm">주의/확인</div>
            <Input
              value={checkitem && checkitem.title ? checkitem.title : ''}
              placeholder="주의/확인 사항을 기록 하세요"
              className="w-[300px]"
              onChange={(e) => {
                changeProtocolMode('check', 'title', e.target.value)
              }}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="outline" className="ml-2 mr-2">
                  추가정보
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Textarea
                  value={
                    checkitem && checkitem.addinfo ? checkitem.addinfo : ''
                  }
                  onChange={(e) => {
                    changeProtocolMode('check', 'addinfo', e.target.value)
                  }}
                ></Textarea>
              </PopoverContent>
            </Popover>
            <div>
              <Button
                type="button"
                size="sm"
                name="check"
                onClick={addProtocol}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
      {protocolSet && protocolSet.length > 0 && (
        <ChecklistEditProtocolDragAndDropTableRow
          protocolist={protocolSet}
          setProtocol={setProtocol}
        />
      )}
    </div>
  )
}
