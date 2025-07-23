import { Textarea } from '@/components/ui/textarea'
import { PreInfo } from '@/types/checklist/checklist-type'

type Props = {
  Preinfo: PreInfo | null
  type: string
  changePreInfo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export default function ChecklistEditTxInfo({
  Preinfo,
  type,
  changePreInfo,
}: Props) {
  return (
    <div className="flex-col border border-gray-300 p-3">
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
      {type === '마취' && (
        <div className="flex-col items-center px-3">
          <span className="text-l m-2">유도마취 </span>
          <Textarea
            className="m-2"
            name="induce"
            rows={1}
            value={Preinfo?.induce ?? ''}
            onChange={changePreInfo}
            placeholder="유도마취 정보를 입력하세요"
          ></Textarea>
        </div>
      )}
      <div className="flex-col items-center px-3">
        <span className="text-l m-2">
          {type === '마취' ? '유지마취' : '주요처치'}{' '}
        </span>
        <Textarea
          className="m-2"
          name="main"
          rows={type === '마취' ? 1 : 3}
          value={Preinfo?.main ?? ''}
          onChange={changePreInfo}
          placeholder={
            type === '마취'
              ? '유지마취 정보를 입력하세요'
              : '주요처치 정보를 입력하세요'
          }
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
