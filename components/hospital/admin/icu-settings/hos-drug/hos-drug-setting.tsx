import NoResultSquirrel from '@/components/common/no-result-squirrel'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import DataTable from '@/components/ui/data-table'
import { cn } from '@/lib/utils/utils'
import { type HosDrug } from '@/types'
import { hosDrugColumns } from './hos-drug-columns'
import { InsertHosDrugDialog } from './insert-hos-drug-dialog'

type Props = {
  hosDrugs: HosDrug[]
  hosId: string
}
export default function HosDrugSetting({ hosDrugs }: Props) {
  return (
    <Card className={cn('mt-2')}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          자주 사용하는 주사
          <InsertHosDrugDialog />
        </CardTitle>
        <CardDescription className="flex flex-col">
          <span>
            주사오더 추가시 자동완성 및 약물 투여량 계산기능을 제공합니다
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {hosDrugs.length === 0 ? (
          <NoResultSquirrel
            text="자주 사용하는 약물을 등록해주세요"
            size="lg"
            className="my-4 flex-col"
          />
        ) : (
          <DataTable columns={hosDrugColumns} data={hosDrugs} />
        )}
      </CardContent>
    </Card>
  )
}
