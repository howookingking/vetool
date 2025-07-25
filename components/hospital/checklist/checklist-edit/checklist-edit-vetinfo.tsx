import { Input } from '@/components/ui/input'
import { ChecklistVet } from '@/types/checklist/checklist-type'

type Props = {
  checklistVet: ChecklistVet | null
  checklistType: string
  changevetlist: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function ChecklistEditVetInfo({
  checklistVet,
  checklistType,
  changevetlist,
}: Props) {
  return (
    <div className="flex-col border border-gray-300 p-3">
      <div className="mb-3 flex items-center px-3">
        <span className="text-l mr-xl">담당수의사(*) : </span>
        <Input
          className="w-[50%]"
          name="attending"
          type="text"
          value={checklistVet?.attending ?? ''}
          onChange={changevetlist}
          placeholder="필수항목입니다. 담당수의사 이름을 입력하세요"
        ></Input>
      </div>
      {checklistType !== '일반' && checklistType !== '응급' && (
        <div className="mb-3 flex items-center px-3">
          <span className="text-l mr-xl">보조 수의사 또는 스탭 : </span>
          <Input
            className="w-[50%]"
            name="assistant"
            type="text"
            value={checklistVet?.assistance ?? ''}
            onChange={changevetlist}
            placeholder="생략이 가능합니다. 보조 수의사 및 스탭 이름을 입력하세요"
          ></Input>
        </div>
      )}
      {checklistType === '마취' && (
        <div className="mb-3 flex items-center px-3">
          <span className="text-l mr-xl">마취수의사 : </span>
          <Input
            className="w-[50%]"
            name="anesthesia"
            type="text"
            value={checklistVet?.anesthesia ?? ''}
            onChange={changevetlist}
            placeholder="생략가능합니다. 마취 수의사 이름을 입력하세요"
          ></Input>
        </div>
      )}
    </div>
  )
}
