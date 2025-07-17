import { Textarea } from '@/components/ui/textarea'
import { PreInfo } from '@/types/checklist/checklist-type'

type Props = {
  Preinfo: PreInfo | null
  changePreInfo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export default function ChecklistEditTxInfo({ Preinfo, changePreInfo }: Props) {
  return (
    <div className="flex-col">
      <div className="flex-col items-center px-3">
        <span className="text-l m-2">전처치 </span>
        <Textarea
          className="m-2"
          name="pre"
          rows={3}
          value={Preinfo?.pre ?? ''}
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
          value={Preinfo?.main ?? ''}
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
          value={Preinfo?.post ?? ''}
          onChange={changePreInfo}
          placeholder="후처치 정보를 입력하세요"
        ></Textarea>
      </div>
    </div>
  )
}
