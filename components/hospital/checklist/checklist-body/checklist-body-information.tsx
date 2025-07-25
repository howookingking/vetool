import { ChecklistData } from '@/types/checklist/checklist-type'
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
  checklistData: ChecklistData
}
export default function ChecklistBodyInformation({ checklistData }: Props) {
  const type = checklistData?.checklist_type
  return (
    <div className="flex w-full flex-col">
      <h1 className="ml-3 text-xl font-bold tracking-tight text-foreground">
        수의사
      </h1>
      <Table className="m-3 max-w-2xl">
        <TableHeader className="text-bold bg-gray-100">
          <TableRow>
            <TableHead className="max-w-s">직책</TableHead>
            <TableHead>수의사</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>담당의(주치의)</TableCell>
            <TableCell>{checklistData?.checklist_vet?.attending}</TableCell>
          </TableRow>
          {checklistData?.checklist_vet?.primary &&
            checklistData?.checklist_vet?.primary !== '' && (
              <TableRow>
                <TableCell>{type === '사용자' ? '술자' : '술자'}</TableCell>
                <TableCell>{checklistData?.checklist_vet?.primary}</TableCell>
              </TableRow>
            )}
          {checklistData?.checklist_vet?.assistence &&
            checklistData?.checklist_vet?.assistence !== '' && (
              <TableRow>
                <TableCell>{type === '사용자' ? '보조자' : '술자'}</TableCell>
                <TableCell>
                  {checklistData?.checklist_vet?.assistence}
                </TableCell>
              </TableRow>
            )}
          {checklistData?.checklist_vet?.anesthesia &&
            checklistData?.checklist_vet?.anesthesia !== '' && (
              <TableRow>
                <TableCell>마취의</TableCell>
                <TableCell>
                  {checklistData?.checklist_vet?.anesthesia}
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
      <h1 className="ml-3 text-xl font-bold tracking-tight text-foreground">
        처치정보
      </h1>
      <Table className="m-3 max-w-2xl">
        <TableHeader className="text-bold bg-gray-100">
          <TableRow>
            <TableHead className="max-w-s">구분</TableHead>
            <TableHead>처치내용</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checklistData?.preinfo?.pre &&
            checklistData?.preinfo?.pre !== '' && (
              <TableRow>
                <TableCell>전처치</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.preinfo?.pre}
                </TableCell>
              </TableRow>
            )}
          {checklistData?.preinfo?.induce &&
            checklistData?.preinfo?.induce !== '' && (
              <TableRow>
                <TableCell>유도마취</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.preinfo?.induce}
                </TableCell>
              </TableRow>
            )}
          {checklistData?.preinfo?.main &&
            checklistData?.preinfo?.main !== '' && (
              <TableRow>
                <TableCell>주요처치</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.preinfo?.main}
                </TableCell>
              </TableRow>
            )}
          {checklistData?.preinfo?.post &&
            checklistData?.preinfo?.post !== '' && (
              <TableRow>
                <TableCell>후처치</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.preinfo?.post}
                </TableCell>
              </TableRow>
            )}

          {/* {checklistData?.preinfo?.other && checklistData?.preinfo?.other !== ''&& <TableRow><TableCell>기타처치</TableCell><TableCell>{checklistData?.preinfo?.other}</TableCell></TableRow>}  */}
        </TableBody>
      </Table>
      {/* <div className="flex-col">
        <div>전처치</div>
        <div className="m-3 overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-300 p-2 text-sm text-gray-800">
          {checklistData?.preinfo?.pre}
        </div>
        {(checklistData?.checklist_type === '마취' ||
          checklistData?.checklist_type === '수술') && (
          <div>
            <div>유도마취</div>
            <div className="m-3 overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-300 p-2 text-sm text-gray-800">
              {checklistData?.preinfo?.induce}
            </div>
          </div>
        )}
        <div>
          {checklistData?.checklist_type === '마취' ||
          checklistData?.checklist_type === '수술'
            ? '유지마취'
            : '주요처치'}
        </div>
        <div className="m-3 overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-300 p-2 text-sm text-gray-800">
          {checklistData?.preinfo?.main}
        </div>
        <div>후처치</div>
        <div className="m-3 overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-300 p-2 text-sm text-gray-800">
          {checklistData?.preinfo?.post}
          {checklistData?.checklist_type === '수술' ? '유지마취' : '주요처치'}
        </div>
        <div className="m-3 overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-300 p-2 text-sm text-gray-800">
          {checklistData?.preinfo?.main}
        </div>
        <div>후처치</div>
        <div className="m-3 overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-300 p-2 text-sm text-gray-800">
          {checklistData?.preinfo?.post}
        </div>
      </div> */}
    </div>
  )
}
