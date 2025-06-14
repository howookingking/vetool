// TxchartEditUser.tsx
'use client'

import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
} from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { nullable, object, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type {
  ChecklistProtocol,
  ChecklistProtocolItem,
  ChecklistSidebarData,
  TxchartData,
} from '@/types/checklist/checklistchart'
import { Textarea } from '@/components/ui/textarea'
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
import { registerTxChart } from '@/lib/services/checklist/chart/regist-txchart'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import {
  ChecklistStateSet,
  CheckNameArray,
  ProtocolItem,
} from '@/types/checklist/checklistchart'
import { checkListSetArray } from '@/constants/checklist/checklist'

type Props = {
  txData?: ChecklistSidebarData | null
  setaChecklistEditDialogOpen: Dispatch<SetStateAction<boolean>>
}

const TxFormSchema = z.object({
  checklistTitle: z.string().min(1, '차트 제목을 입력해주세요'),
  checklistVet: z
    .object({
      attending: z.string().nullable(),
      primary: z.string().nullable(),
      assistence: z.string().nullable(),
      anesthesia: z.string().nullable(),
    })
    .nullable(),
  preInfo: z
    .object({
      pre: z.string().nullable(),
      induce: z.string().nullable(),
      main: z.string().nullable(),
      post: z.string().nullable(),
    })
    .nullable(),
  comment: z.string().nullable(),
})

type TxFormValues = z.infer<typeof TxFormSchema>

export default function TxchartEditUser({
  txData,
  setaChecklistEditDialogOpen,
}: Props) {
  const [checklistTitles, setCheckListTitles] = useState<string[] | null>()
  const [preChecklistSet, setPreCheckListSet] = useState<ChecklistStateSet>({
    interval: '0',
    preSet: [],
  })
  const [preCheckProtocol, setCheckProtocol] = useState<
    ChecklistProtocol | null | []
  >()
  const [mainProtocol, setMainProtocol] = useState<ProtocolItem>({
    title: null,
    type: 'main',
    addinfo: null,
    dueStart: null,
    mode: null,
  })
  const [subProtocol, setSubProtocol] = useState<ProtocolItem>({
    title: null,
    type: 'sub',
    addinfo: null,
    dueStart: null,
    mode: null,
  })

  useEffect(() => {
    txData && txData.checklist_set && setPreCheckListSet(txData.checklist_set)
    txData && txData.checklist_protocol
      ? setCheckProtocol(txData.checklist_protocol)
      : setCheckProtocol([])
  }, [txData])
  const isEditMode = !!(txData?.checklist_title && txData?.checklist_type)

  const checkingTime = useRef<HTMLInputElement | null>(null)

  const form = useForm<TxFormValues>({
    resolver: zodResolver(TxFormSchema),
    defaultValues: {
      checklistTitle: txData?.checklist_title ?? '',
      checklistVet: {
        attending: txData?.checklist_vet?.attending ?? '',
        primary: txData?.checklist_vet?.primary ?? '',
        assistence: txData?.checklist_vet?.assistence ?? '',
        anesthesia: txData?.checklist_vet?.anesthesia ?? '',
      },
      preInfo: {
        pre: txData?.preinfo?.pre ?? '',
        induce: txData?.preinfo?.induce ?? '',
        main: txData?.preinfo?.main ?? '',
        post: txData?.preinfo?.post ?? '',
      },
      comment: txData?.comment ?? '',
    },
  })
  const onSubmit = async (values: TxFormValues) => {
    const preData = {
      checklist_id: txData?.checklist_id,
      hos_id: txData?.hos_id,
      patient_id: txData?.patient_id,
      checklist_type: '사용자',
      checklist_vet: txData?.checklist_vet,
      checklist_title: txData?.checklist_title,
      checklist_tag: txData?.checklist_tag,
      checklist_protocol: txData?.checklist_protocol,
      checklist_group: txData?.checklist_group,
      checklist_set: txData?.checklist_set,
      checklist_timetable: txData?.checklist_timetable,
      starttime: txData?.starttime,
      endtime: txData?.endtime,
      comment: txData?.comment,
      preinfo: txData?.preinfo,
      due_date: txData?.due_date,
    } as TxchartData

    // 수정 실행

    preData.checklist_set = {
      interval: preChecklistSet?.interval,
      preSet:
        preChecklistSet.preSet && preChecklistSet.preSet.length > 0
          ? [...preChecklistSet.preSet]
          : [],
    }
    preData.checklist_protocol = preCheckProtocol ? [...preCheckProtocol] : null
    preData.checklist_vet = values.checklistVet
    preData.preinfo = values.preInfo
    preData.comment = values.comment
    preData.checklist_title = values.checklistTitle

    const supabase = await createClient()
    const { error } = await supabase
      .from('checklist')
      .update(preData)
      .eq('checklist_id', preData.checklist_id)
    if (error) {
      console.error(error)
      redirect(`/error?message=${error.message}`)
    }
    if (!isEditMode) {
      toast({
        title: '치료차트 등록 완료',
        description: '치료차트 등록을 완료했습니다. 차트를 작성하세요',
      })
    } else {
      toast({
        title: '치료차트 수정 완료',
        description: '치료차트 수정을 완료했습니다.',
      })
    }
    setaChecklistEditDialogOpen(false)
    //   preData.checklist_protocol = preCheckProtocol
    //     ? [...preCheckProtocol]
    //     : null
    //   preData.checklist_vet = values.checklistVet
    //   preData.preinfo = values.preInfo
    //   preData.comment = values.comment

    //   console.log('🛠 수정하기:', preData)
  }

  const addChecklistRow = () => {
    if (checkingTime.current?.value && checklistTitles) {
      const pretime = checkingTime.current ? checkingTime.current.value : '0'
      const prenames = [...checklistTitles]
      const predata = { ...preChecklistSet }
      const presetItem = { settime: String(pretime), setname: [...prenames] }
      const isTime =
        predata &&
        predata.preSet &&
        predata.preSet.find((x) => x.settime === String(pretime))
      if (!isTime) {
        predata.preSet?.push(presetItem)
        setPreCheckListSet(predata)
        checkingTime.current.value = ''
      }
    }
  }

  const changeinterval = (e: React.ChangeEvent<HTMLInputElement>) => {
    const predata = { ...preChecklistSet }
    predata.interval = e.target.value

    setPreCheckListSet(predata)
  }

  const changeProtocolMode = (
    type: string,
    key: keyof ProtocolItem,
    value: string,
  ) => {
    if (type === 'main') {
      const preprotocol = { ...mainProtocol }
      preprotocol[key] = value

      setMainProtocol(preprotocol)
    } else {
      const preprotocol = { ...subProtocol }
      preprotocol[key] = value

      setSubProtocol(preprotocol)
    }
  }
  const addProtocol = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name
    if (name === 'main' && mainProtocol.title) {
      const premainprotocol = { ...mainProtocol }
      if (premainprotocol.mode && premainprotocol.dueStart) {
        const preData = preCheckProtocol ? [...preCheckProtocol] : []
        preData.push(premainprotocol)
        setCheckProtocol(preData)
        setMainProtocol({
          title: null,
          type: 'main',
          addinfo: null,
          dueStart: null,
          mode: mainProtocol.mode,
        })
      } else {
        premainprotocol.mode = null
        premainprotocol.dueStart = null
        const preData = preCheckProtocol ? [...preCheckProtocol] : []
        preData.push(premainprotocol)
        setCheckProtocol(preData)
        setMainProtocol({
          title: null,
          type: 'main',
          addinfo: null,
          dueStart: null,
          mode: mainProtocol.mode,
        })
      }
    } else if (name === 'sub' && subProtocol.title) {
      const presubprotocol = { ...subProtocol }
      if (presubprotocol.mode && presubprotocol.dueStart) {
        const preData = preCheckProtocol ? [...preCheckProtocol] : []
        preData.push(presubprotocol)
        setCheckProtocol(preData)
        setSubProtocol({
          title: null,
          type: 'sub',
          addinfo: null,
          dueStart: null,
          mode: subProtocol.mode,
        })
      } else {
        presubprotocol.mode = null
        presubprotocol.dueStart = null
        const preData = preCheckProtocol ? [...preCheckProtocol] : []
        preData.push(presubprotocol)
        setCheckProtocol(preData)
        setSubProtocol({
          title: null,
          type: 'sub',
          addinfo: null,
          dueStart: null,
          mode: subProtocol.mode,
        })
      }
    }
  }
  const delProtocol = (e: React.MouseEvent<HTMLButtonElement>) => {
    const preData = preCheckProtocol ? [...preCheckProtocol] : []
    preData.splice(Number(e.currentTarget.name), 1)
    setCheckProtocol(preData)
  }
  const delCheckRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    const preData = { ...preChecklistSet }
    preData &&
      preData.preSet &&
      preData.preSet.splice(Number(e.currentTarget.name), 1)
    setPreCheckListSet(preData)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="checklistTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1. 치료명(필수)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="치료명"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue={undefined}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>2. 수의사 설정</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <FormField
                control={form.control}
                name="checklistVet.attending"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>담당의(주치의)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="환자 담당 수의사(주치의)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checklistVet.primary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>술자</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="치료를 진행하는 수의사(생략시 담당의로 지정),ex)수의사1,수의사2..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checklistVet.assistence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>보조자</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="치료를 보조인원(생략가능) ex)수의사1, 간호사1..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>3. 처치정보</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <FormField
                control={form.control}
                name="preInfo.pre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>전처치</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ''} // null 대응
                        placeholder="전처치 내용을 입력해주세요(생략가능)"
                        className="min-h-[100px]" // 필요한 경우 높이 조정
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preInfo.main"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>주요처치</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ''} // null 대응
                        placeholder="처치 관련 내용을 입력해주세요(생략가능)"
                        className="min-h-[100px]" // 필요한 경우 높이 조정
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preInfo.post"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>후처치</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ''} // null 대응
                        placeholder="후처치 관련 내용을 입력해주세요(생략가능)"
                        className="min-h-[100px]" // 필요한 경우 높이 조정
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>4. 체크리스트 설정</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="flex flex-wrap items-center">
                <div className="ml-3 mr-2 text-sm">기본 측정간격</div>

                <Input
                  value={
                    preChecklistSet && preChecklistSet.interval
                      ? preChecklistSet.interval
                      : ''
                  }
                  onChange={changeinterval}
                  placeholder="min"
                  className="w-15"
                />
              </div>
              <div className="flex flex-wrap items-center justify-start gap-2 px-3">
                <div className="mr-2 text-sm">측정항목</div>
                <ToggleGroup
                  onValueChange={(value) => {
                    if (value) {
                      setCheckListTitles(value)
                    }
                  }}
                  type="multiple"
                  variant="outline"
                  size="sm"
                >
                  {checkListSetArray.map((check, i) => (
                    <ToggleGroupItem
                      key={check.name}
                      value={check.name}
                      aria-label="Toggle bold"
                    >
                      <div className="minw-4 h-4">{check.displayName}</div>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <div className="mr-2 text-sm">측정시간</div>
                <Input placeholder="min" ref={checkingTime} className="w-13" />

                <Button type="button" onClick={addChecklistRow}>
                  추가
                </Button>
              </div>
              {preChecklistSet &&
                preChecklistSet.preSet &&
                preChecklistSet.preSet.length > 0 && (
                  <Table className="bg-gray-100">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">
                          시작후 측정시간(분)
                        </TableHead>
                        <TableHead>측정항목</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preChecklistSet.preSet.map((set, i) => (
                        <TableRow key={set.settime}>
                          <TableCell>{set.settime}</TableCell>
                          <TableCell>
                            <div>
                              {' '}
                              {set.setname?.map((name) => name + ' ')}
                              <Button
                                type="button"
                                name={String(i)}
                                onClick={delCheckRow}
                                variant="outline"
                                size="sm"
                              >
                                X
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>5. 치료과정 설정</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {/* minaprotocol */}

              <div className="flex flex-wrap items-center">
                <div className="ml-3 mr-2 text-sm">주요과정 추가</div>
                <Input
                  value={
                    mainProtocol && mainProtocol.title ? mainProtocol.title : ''
                  }
                  placeholder="주요과정 추가"
                  className="w-[300px]"
                  onChange={(e) => {
                    changeProtocolMode('main', 'title', e.target.value)
                  }}
                />
                <div className="ml-2 mr-2 text-sm">:</div>
                <Select
                  defaultValue={
                    mainProtocol && mainProtocol.mode ? mainProtocol.mode : ''
                  }
                  onValueChange={(value) => {
                    changeProtocolMode('main', 'mode', value)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="시간측정 시점 설정" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="afterStart">치료시작후</SelectItem>
                    <SelectItem value="afterMain">메인과정 시작 후</SelectItem>
                    <SelectItem value="afterSub">직전과정 완료 후</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="min"
                  type="number"
                  className="mr-2 w-[100px]"
                  value={
                    mainProtocol && mainProtocol.dueStart
                      ? mainProtocol.dueStart
                      : ''
                  }
                  onChange={(e) => {
                    changeProtocolMode('main', 'dueStart', e.target.value)
                  }}
                />
                <div className="ml-2 mr-2 text-sm">분후시작</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className="mr-2">
                      추가정보
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Textarea
                      value={
                        mainProtocol && mainProtocol.addinfo
                          ? mainProtocol.addinfo
                          : ''
                      }
                      onChange={(e) => {
                        changeProtocolMode('main', 'addinfo', e.target.value)
                      }}
                    ></Textarea>
                  </PopoverContent>
                </Popover>
                <div>
                  <Button type="button" name="main" onClick={addProtocol}>
                    추가
                  </Button>
                </div>
              </div>

              {/* subprotocol */}

              <div className="flex flex-wrap items-center">
                <div className="ml-3 mr-2 text-sm">세부과정 추가</div>
                <Input
                  value={
                    subProtocol && subProtocol.title ? subProtocol.title : ''
                  }
                  placeholder="주요과정 추가"
                  className="w-[300px]"
                  onChange={(e) => {
                    changeProtocolMode('sub', 'title', e.target.value)
                  }}
                />
                <div className="ml-2 mr-2 text-sm">:</div>
                <Select
                  defaultValue={
                    subProtocol && subProtocol.mode ? subProtocol.mode : ''
                  }
                  onValueChange={(value) => {
                    changeProtocolMode('main', 'mode', value)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="시간측정 시점 설정" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="afterStart">치료시작후</SelectItem>
                    <SelectItem value="afterMain">메인과정 시작 후</SelectItem>
                    <SelectItem value="afterSub">직전과정 완료 후</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="min"
                  type="number"
                  className="mr-2 w-[100px]"
                  value={
                    subProtocol && subProtocol.dueStart
                      ? subProtocol.dueStart
                      : ''
                  }
                  onChange={(e) => {
                    changeProtocolMode('main', 'dueStart', e.target.value)
                  }}
                />
                <div className="ml-2 mr-2 text-sm">분후시작</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline">
                      추가정보
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Textarea
                      value={
                        subProtocol && subProtocol.addinfo
                          ? subProtocol.addinfo
                          : ''
                      }
                      onChange={(e) => {
                        changeProtocolMode('sub', 'addinfo', e.target.value)
                      }}
                    ></Textarea>
                  </PopoverContent>
                </Popover>
                <div>
                  <Button type="button" name="sub" onClick={addProtocol}>
                    추가
                  </Button>
                </div>
              </div>
              <div>
                {preCheckProtocol && preCheckProtocol.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>과정</TableHead>
                        <TableHead>실행시점</TableHead>

                        <TableHead>추가정보</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preCheckProtocol.map((protocol, i) => (
                        <TableRow key={protocol.title + '-' + i}>
                          <TableCell>
                            {protocol.type === 'main' ? (
                              <div className="font-bold">
                                {protocol.title}(주요과정)
                              </div>
                            ) : (
                              <div className="ml-10">
                                {protocol.title}(세부과정)
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {protocol.mode === 'afterMain'
                              ? '주요과정 시작 '
                              : protocol.mode === 'afterStart'
                                ? '치료 시작 '
                                : protocol.mode === 'afterSub'
                                  ? '이전과정 실행 '
                                  : ''}
                            {protocol.dueStart
                              ? protocol.dueStart + '분후'
                              : ''}
                          </TableCell>
                          {/* <TableCell>
                            {protocol.dueStart ?? ''}
                            {protocol.dueStart ? '분후' : ''}
                          </TableCell> */}
                          <TableCell>
                            {protocol.addinfo ? (
                              <Popover>
                                <PopoverTrigger>
                                  <div>추가정보</div>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <div className="whitespace-pre-wrap">
                                    {protocol.addinfo}
                                  </div>
                                </PopoverContent>
                              </Popover>
                            ) : (
                              ''
                            )}
                            <div>
                              <Button
                                type="button"
                                name={String(i)}
                                onClick={delProtocol}
                                variant="outline"
                              >
                                X
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>종합소견</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ''} // null 대응
                  placeholder="치료관련 종합 소견 작성"
                  className="min-h-[100px]" // 필요한 경우 높이 조정
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 버튼 */}

        <div>
          <Button type="submit">{isEditMode ? '수정' : '등록'}</Button>
          {form.formState.errors.checklistTitle && (
            <div className="text-red-500">
              {form.formState.errors.checklistTitle.message}
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}
