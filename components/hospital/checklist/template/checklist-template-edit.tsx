'use client'
import { Separator } from '@/components/ui/separator'
import {
  ChecklistData,
  ChecklistProtocol,
  Checklistset,
  PreInfo,
  TemplateChecklist,
} from '@/types/checklist/checklist-type'
import { useEffect, useState } from 'react'
import ChecklistEditChecklistSet from '@/components/hospital/checklist/checklist-edit/checklist-edit-checklistset'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ORDER_COLORS } from '@/constants/hospital/icu/chart/colors'
import { Trash2 } from 'lucide-react'

import ChecklistEditProtocolset from '@/components/hospital/checklist/checklist-edit/checklist-edit-protocolset'
import ChecklistEditTxInfo from '@/components/hospital/checklist/checklist-edit/checklist-edit-txinfo'
import ChecklistTagging from '@/components/hospital/checklist/common/checklist-tagging'
import { toast } from '@/components/ui/use-toast'
import {
  deleteChecklistTemplate,
  saveTemplate,
  updateTemplate,
} from '@/lib/services/checklist/checklist-template'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  templateChecklist: TemplateChecklist | null
  setChecklistEditDialogOpen: (isopen: boolean) => void
}
type TemplateChecklistPre = Omit<TemplateChecklist, 'checklist_template_id'>
type keystring = keyof ChecklistData

export default function ChecklistTemplateEdit({
  templateChecklist,
  setChecklistEditDialogOpen,
}: Props) {
  const pathname = usePathname()
  const { push } = useRouter()

  const [checklistdata, setChecklistData] = useState<{
    checklist_template_id: string
    hos_id: string
    checklist_type: string //'checklist' | 'surgery'
    checklist_title: string //tamplate이름
    checklist_tag: null | string //검색어
    checklist_protocol: null | ChecklistProtocol
    checklist_set: null | Checklistset
    preinfo: null | PreInfo //처치 정보
  }>({
    checklist_template_id: '',
    hos_id: '',
    checklist_type: 'checklist',
    checklist_title: '',
    checklist_tag: '',
    checklist_protocol: null,
    checklist_set: null,
    preinfo: null,
  })

  useEffect(() => {
    const preTemplateData = JSON.parse(JSON.stringify(templateChecklist))

    if (
      preTemplateData &&
      (preTemplateData.checklist_template_id ||
        preTemplateData.checklist_template_id !== '')
    ) {
      setChecklistData(preTemplateData)
    }
  }, [templateChecklist])

  const isEditMode = templateChecklist?.checklist_template_id ? true : false

  const changeChecklistValue = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const preChecklistData: TemplateChecklist = { ...checklistdata }
    const keyname = e.target.name as keystring
    if (keyname === 'checklist_title') {
      preChecklistData[keyname] = e.target.value
      setChecklistData(preChecklistData)
    }
  }

  const changePreInfo = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const preChecklistData: TemplateChecklist = { ...checklistdata }
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

  const changeChecklistSet = (
    checklistset: TemplateChecklist['checklist_set'],
  ) => {
    const preChecklistData: TemplateChecklist = { ...checklistdata }
    preChecklistData.checklist_set = checklistset
    setChecklistData(preChecklistData)
  }
  const changeProtocolSet = (protodolset: ChecklistProtocol) => {
    const preChecklistData: TemplateChecklist = { ...checklistdata }
    preChecklistData.checklist_protocol = protodolset
    setChecklistData(preChecklistData)
  }
  const saveChecklist = () => {
    if (!checklistdata.checklist_title) {
      alert('제목은 필수항목입니다. 반드시 입력해주세요.')
      return
    }
    if (
      !checklistdata.checklist_template_id ||
      checklistdata.checklist_template_id === ''
    ) {
      const preChecklistData: TemplateChecklist = { ...checklistdata }
      //savetemplate
      preChecklistData.hos_id = pathname.split('/')[2]
      preChecklistData.checklist_type = 'checklist'
      saveTemplate(preChecklistData).then(() => {
        toast({
          title: '템플릿 저장 완료',
          description: '템플릿을 저장했습니다.',
        })
      })
      setChecklistEditDialogOpen(false)
    } else {
      const preChecklistData: TemplateChecklist = { ...checklistdata }
      updateTemplate(preChecklistData).then(() => {
        toast({
          title: '템플릿 수정 완료',
          description: '템플릿을 수정했습니다.',
        })
      })
      setChecklistEditDialogOpen(false)
    }

    // updateEachChecklist(preChecklistData).then(() => {
    //   setChecklistEditDialogOpen(false)
    //   toast({
    //     title: isEditMode ? '체크리스트 수정 완료' : '체크리스트 저장 완료',
    //     description: isEditMode
    //       ? '체크리스트를 수정했습니다.'
    //       : '체크리스트를 저장했습니다.',
    //   })
    // })
  }
  const delchecklistchart = () => {
    const targetDate = pathname.split('/')[5]
    if (!checklistdata.checklist_template_id) return
    if (
      confirm(
        '정말로 템플릿을 삭제하시겠습니까? 삭제된 템플릿는 복구할 수 없습니다.',
      )
    ) {
      deleteChecklistTemplate(checklistdata.checklist_template_id).then(() => {
        setChecklistEditDialogOpen(false)
        toast({
          title: '체크리스트 삭제 완료',
          description: '체크리스트를 삭제했습니다.',
        })
        push(
          `/hospital/${checklistdata.hos_id}/checklist/${targetDate}/template`,
        )
      })
    }
  }
  return (
    checklistdata && (
      <div className="flex-col">
        <Separator />

        <div className="flex items-center px-3">
          <span className="mr-2 text-lg">1. 탬플릿 제목 : </span>
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
          // defaultValue=
        >
          <AccordionItem value="preInfo">
            <AccordionTrigger className="text-lg">
              2. 처치 정보
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ChecklistEditTxInfo
                Preinfo={checklistdata.preinfo}
                type={checklistdata.checklist_type ?? '일반'}
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

          <AccordionItem value="protocol">
            <AccordionTrigger className="text-lg">
              4. 프로토콜 설정
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ChecklistEditProtocolset
                protocolSet={checklistdata.checklist_protocol}
                setProtocol={changeProtocolSet}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <ChecklistTagging
          preTag={checklistdata.checklist_tag ?? ''}
          preTagArray={null}
          changeChecklistTag={(tag) => {
            const preChecklistData: TemplateChecklist = { ...checklistdata }
            preChecklistData.checklist_tag = tag
            setChecklistData(preChecklistData)
          }}
          changeChecklistTagArray={() => {}}
        ></ChecklistTagging>
        <div className="m-3 flex items-center">
          <Button onClick={saveChecklist}>
            {isEditMode ? '수정' : '등록'}
          </Button>
          {checklistdata && checklistdata.checklist_template_id && (
            <Button
              className="ml-3"
              style={{ backgroundColor: ORDER_COLORS.red400 }}
              onClick={delchecklistchart}
            >
              <Trash2></Trash2> 삭제
            </Button>
          )}
          {checklistdata && !checklistdata.checklist_title && (
            <div className="ml-3 text-red-500">
              {'제목은 필수입니다. 반드시 입력해주세요.'}
            </div>
          )}
        </div>
      </div>
    )
  )
}
