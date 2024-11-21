import WarningMessage from '@/components/common/warning-message'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useTemplateStore } from '@/lib/store/icu/template'

export default function ResetTemplateOrdersButton() {
  const { templateOrders, reset } = useTemplateStore()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="ml-auto"
          variant="outline"
          tabIndex={-1}
        >
          초기화
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>템플릿 오더 초기화</AlertDialogTitle>
          <AlertDialogDescription>
            정말로 오더 목록를 초기화하시겠습니까?
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel tabIndex={-1}>취소</AlertDialogCancel>
          <AlertDialogAction
            disabled={!templateOrders.length}
            onClick={() => reset()}
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
