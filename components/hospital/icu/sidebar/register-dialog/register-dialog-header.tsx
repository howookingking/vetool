import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function RegisterDialogHeader({ tab }: { tab: string }) {
  return (
    <DialogHeader>
      <DialogTitle>
        {tab === 'search' && '환자 검색 및 선택'}
        {tab === 'register' && '신규 환자 등록'}
      </DialogTitle>

      <DialogDescription>
        {tab === 'search' && '환자를 선택해주세요'}
        {tab === 'register' && '신규 환자를 등록합니다'}
      </DialogDescription>
    </DialogHeader>
  )
}
