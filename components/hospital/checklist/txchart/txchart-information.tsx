import { ChecklistSidebarData } from '@/types/checklist/checklistchart'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  txchartdata: ChecklistSidebarData
}
const TxChartInformation = ({ txchartdata }: Props) => {
  const type = txchartdata?.checklist_type

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={undefined}
      >
        <AccordionItem value="vet-info">
          <AccordionTrigger>수의사 정보</AccordionTrigger>
          <AccordionContent>
            <Table className="m-3">
              <TableHeader className="text-bold w-[200px] bg-gray-100">
                <TableRow>
                  <TableHead>직책</TableHead>
                  <TableHead>수의사</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>담당의(주치의)</TableCell>
                  <TableCell>{txchartdata?.checklist_vet?.attending}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{type === '사용자' ? '술자' : '술자'}</TableCell>
                  <TableCell>{txchartdata?.checklist_vet?.primary}</TableCell>
                </TableRow>
                {type === '수술' && (
                  <TableRow>
                    <TableCell>마취의</TableCell>
                    <TableCell>
                      {txchartdata?.checklist_vet?.anesthesia}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>{type === '사용자' ? '보조자' : '술자'}</TableCell>
                  <TableCell>
                    {txchartdata?.checklist_vet?.assistence}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="vet-info">
          <AccordionTrigger>처치정보</AccordionTrigger>
          <AccordionContent>
            <div className="flex-col">
              <div>전처치</div>
              <div className="whitespace-pre-wrap">
                {txchartdata?.preinfo?.pre}
              </div>
              {(txchartdata?.checklist_type === '마취' ||
                txchartdata?.checklist_type === '수술') && (
                <div>
                  <div>유도마취</div>
                  <div className="whitespace-pre-wrap">
                    {txchartdata?.preinfo?.induce}
                  </div>
                </div>
              )}
              <div>
                {txchartdata?.checklist_type === '마취' ||
                txchartdata?.checklist_type === '수술'
                  ? '유지마취'
                  : '주요처치'}
              </div>
              <div className="whitespace-pre-wrap">
                {txchartdata?.preinfo?.main}
              </div>
              <div>후처치</div>
              <div className="whitespace-pre-wrap">
                {txchartdata?.preinfo?.post}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default TxChartInformation
