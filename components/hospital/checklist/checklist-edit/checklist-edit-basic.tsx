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
import ChecklistEditTxInfo from './checklist-edit-txinfo'
import { usePathname, useRouter } from 'next/navigation'
import ChecklistEditVetInfo from './checklist-edit-vetinfo'
type Props = {
  checklistData: ChecklistData
  setChecklistEditDialogOpen: (isopen: boolean) => void
  checklistType: string
}

type keystring = keyof ChecklistData

export default function ChecklistEditBasic({
  checklistData,
  setChecklistEditDialogOpen,
  checklistType,
}: Props) {
  const [checklistdata, setChecklistData] =
    useState<ChecklistData>(checklistData)
  const [groups, setGroups] = useState<string[]>([])
  const [targetDate, setTargetDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd'),
  )
  const basicHosData = useBasicHosDataContext().basicHosData
  useEffect(() => {
    const preChecklistData = JSON.parse(JSON.stringify(checklistData))
    if (preChecklistData) {
      if (!preChecklistData.checklist_set) {
        preChecklistData.checklist_set = {
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
        preChecklistData.checklist_group &&
          setGroups(preChecklistData.checklist_group)
        preChecklistData.due_date && setTargetDate(preChecklistData.due_date)
      } else {
        setChecklistData(checklistData)
        preChecklistData.checklist_group &&
          setGroups(preChecklistData.checklist_group)
        preChecklistData.due_date && setTargetDate(preChecklistData.due_date)
      }
    }
  }, [checklistData, checklistType])
  const { push } = useRouter()
  const pathname = usePathname()
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
        assistance: '',
        anesthesia: '',
      }
      preChecklistData.checklist_vet[keyname] = e.target.value
      setChecklistData(preChecklistData)
    } else {
      preChecklistData.checklist_vet[keyname] = e.target.value
      setChecklistData(preChecklistData)
    }
  }
  const changePreInfo = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
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
    preChecklistData.due_date = targetDate
    preChecklistData.checklist_type = checklistType
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
        push(`/hospital/${checklistdata.hos_id}/checklist/${targetDate}/chart`)
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
              targetDate={targetDate}
              changeDate={setTargetDate}
            ></ChecklistEditDateselector>
          </div>
          <div className="flex items-center px-3">
            <div className="mr-2 text-sm">체중(kg)</div>
            <Input
              className="w-20"
              type="number"
              value={checklistdata.weight ?? null}
              onChange={(e) => {
                const preChecklistData: ChecklistData = { ...checklistdata }
                preChecklistData.weight = Number(e.target.value)
                setChecklistData(preChecklistData)
              }}
            ></Input>
          </div>
          {(checklistType === '응급' || checklistType === '마취') && (
            <div className="flex items-center px-3">
              <div className="mr-2 text-sm">기관튜브</div>
              <Input
                className="w-20"
                type="text"
                name="other"
                value={checklistdata.preinfo?.other ?? ''}
                onChange={changePreInfo}
              ></Input>
            </div>
          )}
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
              <ChecklistEditVetInfo
                checklistVet={checklistdata.checklist_vet ?? null}
                changevetlist={changevetlist}
                checklistType={checklistType ?? '일반'}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="preInfo">
            <AccordionTrigger className="text-lg">
              2. 처치 정보
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ChecklistEditTxInfo
                Preinfo={checklistdata.preinfo}
                changePreInfo={changePreInfo}
              />
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
        <div className="m-3 flex items-center">
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
