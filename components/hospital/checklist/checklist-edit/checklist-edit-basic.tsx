import { Separator } from '@/components/ui/separator'
import {
  ChecklistData,
  ChecklistVet,
  PreInfo,
} from '@/types/checklist/checklist-type'
import { set } from 'date-fns'
import { useEffect, useState } from 'react'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import GroupFilter from '../../icu/sidebar/filters/group-filter'
import { Menubar } from '@/components/ui/menubar'
import ChecklistEditDateselector from '@/components/hospital/checklist/checklist-edit/checklist-edit-dateselector'
import { format } from 'date-fns'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ChecklistEditChecklistSet from './checklist-edit-checklistset'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { ORDER_COLORS } from '@/constants/hospital/icu/chart/colors'
import {
  deleteChecklist,
  updateEachChecklist,
} from '@/lib/services/checklist/get-checklist-data-client'
import { toast } from '@/components/ui/use-toast'
type Props = {
  checklistData: ChecklistData
  setChecklistEditDialogOpen: (isopen: boolean) => void
}

type keystring = keyof ChecklistData

export default function ChecklistEditBasic({
  checklistData,
  setChecklistEditDialogOpen,
}: Props) {
  const [checklistdata, setChecklistData] =
    useState<ChecklistData>(checklistData)
  const [groups, setGroups] = useState<string[]>([])
  const [targetDate, setTargetDate] = useState<string>()
  const basicHosData = useBasicHosDataContext().basicHosData
  useEffect(() => {
    if (checklistData) {
      if (!checklistData.checklist_set) {
        checklistData.checklist_set = {
          interval: '1',
          preSet: [
            {
              setname: [
                '체온(°C)',
                '심박수',
                '호흡수',
                '혈압(mmHg)',
                'SPO2(%)',
                '비고',
              ],
              settime: '0',
            },
          ],
        }
        setChecklistData(checklistData)
        checklistData?.checklist_group &&
          setGroups(checklistData.checklist_group)
        checklistData?.due_date && setTargetDate(checklistData.due_date)
      } else {
        checklistData?.checklist_group &&
          setGroups(checklistData.checklist_group)
        checklistData?.due_date && setTargetDate(checklistData.due_date)
      }
    }
  }, [checklistData])
  const isEditMode = !!(
    checklistData?.checklist_title && checklistData?.checklist_type
  )
  const addgroup = (value: string) => {
    const preChecklistData = { ...checklistdata }

    if (groups.includes(value)) {
      setGroups(groups.filter((g) => g !== value))
      preChecklistData.checklist_group = groups.filter((g) => g !== value)
      setChecklistData(preChecklistData)
    } else {
      setGroups([...groups, value])
      preChecklistData.checklist_group = [...groups, value]
      setChecklistData(preChecklistData)
    }
  }
  const changeChecklistValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const preChecklistData: ChecklistData = { ...checklistdata }
    const keyname = e.target.name as keystring
    if (keyname === 'checklist_title') {
      preChecklistData[keyname] = e.target.value
      setChecklistData(preChecklistData)
    }
  }
  const changevetlist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const preChecklistData: ChecklistData = { ...checklistdata }
    const keyname = e.target.name as keyof ChecklistVet
    if (!preChecklistData.checklist_vet) {
      preChecklistData.checklist_vet = {
        attending: '',
        primary: '',
        assistence: '',
        anesthesia: '',
      }
      preChecklistData.checklist_vet[keyname] = e.target.value
      setChecklistData(preChecklistData)
    } else {
      preChecklistData.checklist_vet[keyname] = e.target.value
      setChecklistData(preChecklistData)
    }
  }
  const changePreInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const preChecklistData: ChecklistData = { ...checklistdata }
    const keyname = e.target.name as keyof PreInfo
    if (!preChecklistData.preinfo) {
      preChecklistData.preinfo = {
        pre: '',
        induce: '',
        post: '',
        main: '',
        other: '',
      }
      preChecklistData.preinfo[keyname] = e.target.value
      setChecklistData(preChecklistData)
    } else {
      preChecklistData.preinfo[keyname] = e.target.value
      setChecklistData(preChecklistData)
    }
  }

  const changeChecklistSet = (checklistset: ChecklistData['checklist_set']) => {
    const preChecklistData: ChecklistData = { ...checklistdata }
    preChecklistData.checklist_set = checklistset
    setChecklistData(preChecklistData)
  }

  const saveChecklist = () => {
    if (
      !checklistdata.checklist_title ||
      !checklistdata.checklist_vet?.attending
    ) {
      alert('제목과 담당수의사는 필수항목입니다. 반드시 입력해주세요.')
      return
    }
    if (!checklistdata.checklist_id) {
      setChecklistEditDialogOpen(false)
    }
    const preChecklistData: ChecklistData = { ...checklistdata }
    preChecklistData.checklist_type = '일반'
    updateEachChecklist(preChecklistData).then(() => {
      setChecklistEditDialogOpen(false)
      toast({
        title: isEditMode ? '체크리스트 수정 완료' : '체크리스트 저장 완료',
        description: isEditMode
          ? '체크리스트를 수정했습니다.'
          : '체크리스트를 저장했습니다.',
      })
    })
  }
  const delchecklistchart = () => {
    if (!checklistdata.checklist_id) return
    if (
      confirm(
        '정말로 체크리스트를 삭제하시겠습니까? 삭제된 체크리스트는 복구할 수 없습니다.',
      )
    ) {
      deleteChecklist(checklistdata.checklist_id).then(() => {
        setChecklistEditDialogOpen(false)
        toast({
          title: '체크리스트 삭제 완료',
          description: '체크리스트를 삭제했습니다.',
        })
      })
    }
  }
  return (
    checklistdata && (
      <div className="flex-col">
        <Separator />
        <div className="m-3 flex flex-wrap items-center justify-start gap-2 px-3">
          <div className="flex items-center px-3">
            <div className="mr-2 text-sm">그룹선택</div>

            <Menubar>
              <GroupFilter
                hosGroupList={basicHosData.groupListData}
                selectedGroup={groups}
                onGroupChange={addgroup}
              />
            </Menubar>
          </div>
          <div className="flex items-center px-3">
            <div className="mr-2 text-sm">예정일 변경</div>
            <ChecklistEditDateselector
              targetDate={targetDate ?? format(new Date(), 'yyyy-mm-dd')}
              changeDate={setTargetDate}
            ></ChecklistEditDateselector>
          </div>
          <div className="flex items-center px-3">
            <div className="mr-2 text-sm">체중(kg)</div>
            <Input
              className="w-20"
              type="number"
              value={checklistdata.weight ?? 0}
              onChange={(e) => {
                const preChecklistData: ChecklistData = { ...checklistdata }
                preChecklistData.weight = Number(e.target.value)
                setChecklistData(preChecklistData)
              }}
            ></Input>
          </div>
        </div>
        <div className="flex items-center px-3">
          <span className="mr-2 text-lg">제목 : </span>
          <Input
            className="w-[50%]"
            name="checklist_title"
            type="text"
            value={checklistdata.checklist_title ?? ''}
            onChange={changeChecklistValue}
            placeholder="필수항목입니다. 처치,투약,검사 등 체크리스트 제목을 입력하세요"
            autoFocus
          ></Input>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue={'checklistVet'}
        >
          <AccordionItem value="checklistVet">
            <AccordionTrigger className="text-lg">
              1. 수의사 정보
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="flex-col">
                <div className="flex items-center px-3">
                  <span className="text-l mr-xl">담당수의사 : </span>
                  <Input
                    className="w-[50%]"
                    name="attending"
                    type="text"
                    value={checklistdata.checklist_vet?.attending ?? ''}
                    onChange={changevetlist}
                    placeholder="필수항목입니다. 담당수의사 이름을 입력하세요"
                  ></Input>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="preInfo">
            <AccordionTrigger className="text-lg">
              2. 처치 정보
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="flex-col">
                <div className="flex-col items-center px-3">
                  <span className="text-l m-2">전처치 </span>
                  <Textarea
                    className="m-2"
                    name="pre"
                    rows={3}
                    value={checklistdata.preinfo?.pre ?? ''}
                    onChange={changePreInfo}
                    placeholder="전처치 정보를 입력하세요"
                  ></Textarea>
                </div>
                <div className="flex-col items-center px-3">
                  <span className="text-l m-2">주요처치 </span>
                  <Textarea
                    className="m-2"
                    name="main"
                    rows={3}
                    value={checklistdata.preinfo?.main ?? ''}
                    onChange={changePreInfo}
                    placeholder="주요처치 정보를 입력하세요"
                  ></Textarea>
                </div>
                <div className="flex-col items-center px-3">
                  <span className="text-l m-2">후처치 </span>
                  <Textarea
                    className="m-2"
                    name="post"
                    rows={3}
                    value={checklistdata.preinfo?.post ?? ''}
                    onChange={changePreInfo}
                    placeholder="후처치 정보를 입력하세요"
                  ></Textarea>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="checklistSet">
            <AccordionTrigger className="text-lg">
              3. 체크리스트 설정
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ChecklistEditChecklistSet
                checklistSet={checklistdata.checklist_set}
                setSetInfo={changeChecklistSet}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center">
          <Button onClick={saveChecklist}>
            {isEditMode ? '수정' : '등록'}
          </Button>
          {checklistdata && checklistdata.checklist_id && (
            <Button
              className="ml-3"
              style={{ backgroundColor: ORDER_COLORS.red400 }}
              onClick={delchecklistchart}
            >
              <Trash2></Trash2> 삭제
            </Button>
          )}
          {checklistdata &&
            (!checklistdata.checklist_title ||
              !checklistdata.checklist_vet?.attending) && (
              <div className="ml-3 text-red-500">
                {'제목과 담당수의사는 필수항목입니다. 반드시 입력해주세요.'}
              </div>
            )}
        </div>
      </div>
    )
  )
}
