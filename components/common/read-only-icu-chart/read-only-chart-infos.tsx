import GroupBadge from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/group/group-badge'
import Indate from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/indate'
import VetName from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/vets/vet-name'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuChartsInCharge } from '@/types/adimin'
import type { SelectedIcuChart } from '@/types/icu/chart'
import {
  ActivityIcon,
  ComponentIcon,
  LogOutIcon,
  SirenIcon,
  SquarePlusIcon,
  StarIcon,
  StethoscopeIcon,
  UserIcon,
} from 'lucide-react'

export default function ReadOnlyChartInfos({
  chartData,
}: {
  chartData: SelectedIcuChart
}) {
  const {
    icu_io: {
      in_date,
      cpcr,
      out_date,
      out_due_date,
      cage,
      group_list,
      icu_io_cc,
      icu_io_dx,
    },
    patient,
    main_vet,
    sub_vet,
    in_charge,
    urgency,
  } = chartData
  const [cpcrValue, etTubeValue] = cpcr.split(',')
  const { today } = (in_charge as IcuChartsInCharge) || {}

  const isPatientOut = out_date !== null

  const {
    basicHosData: { isInChargeSystem },
  } = useBasicHosDataContext()

  return (
    <div className="grid select-none grid-cols-6 gap-2" data-guide="chart-info">
      {/* 입원일 */}
      <div className="col-span-1">
        <Indate inDate={in_date} />
      </div>

      {/* 퇴원일 */}
      <div className="col-span-1 flex h-9 items-center gap-2 rounded-md border p-2 shadow-sm">
        <LogOutIcon className="text-muted-foreground" size={16} />
        {isPatientOut ? (
          <span className="text-sm">{out_date}</span>
        ) : (
          <>
            {out_due_date ? (
              <span className="text-sm">{out_due_date}</span>
            ) : (
              <span className="text-sm text-muted-foreground">퇴원 예정일</span>
            )}
          </>
        )}
      </div>

      {/* 보호자 */}
      <div className="col-span-1 flex h-9 items-center gap-2 rounded-md border p-2 shadow-sm">
        <UserIcon className="text-muted-foreground" size={16} />
        {patient.owner_name ? (
          <span className="text-sm">{patient.owner_name}</span>
        ) : (
          <span className="text-sm text-muted-foreground">보호자</span>
        )}
      </div>

      {/* CPCR 여부 | ET Tube */}
      <div className="col-span-1 flex items-center gap-2 rounded-md border p-2 shadow-sm">
        <ActivityIcon className="text-muted-foreground" size={16} />

        <div className="flex items-center gap-2 text-sm">
          <span
            className={cn(cpcrValue === '미지정' && 'text-muted-foreground')}
          >
            {cpcrValue === '미지정' ? 'CPCR 여부 | ET Tube' : cpcrValue}
          </span>

          <Separator
            orientation="vertical"
            className={cn(
              (cpcrValue !== 'CPCR' ||
                etTubeValue === '미지정' ||
                etTubeValue === undefined) &&
                'hidden',
              'h-4',
            )}
          />

          <span className={etTubeValue === '미지정' ? 'hidden' : ''}>
            {etTubeValue}
          </span>
        </div>
      </div>

      {/* 입원장 */}
      <div className="col-span-1 flex h-9 items-center gap-2 rounded-md border p-2 shadow-sm">
        <SquarePlusIcon className="text-muted-foreground" size={16} />
        {cage ? (
          <span className="text-sm">{cage}</span>
        ) : (
          <span className="text-sm text-muted-foreground">입원장</span>
        )}
      </div>

      {/* 응급도 */}
      <div className="col-span-1 flex items-center gap-2 rounded-md border p-2 shadow-sm">
        <SirenIcon size={16} className="text-muted-foreground" />
        {urgency === 0 || urgency === null ? (
          <span className="text-sm text-muted-foreground">응급도</span>
        ) : (
          <div className="flex items-center gap-1">
            {Array(urgency)
              .fill(0)
              .map((_, index) => (
                <StarIcon
                  key={index}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
          </div>
        )}
      </div>

      {/* 담당의 */}
      <div className="col-span-3 flex items-center gap-2 rounded-md border p-2 text-sm shadow-sm">
        <StethoscopeIcon size={16} className="text-muted-foreground" />

        <div className="flex items-center gap-2 overflow-hidden">
          <VetName label="주치의" name={main_vet?.name ?? '미선택'} />

          <Separator orientation="vertical" className="h-4" />

          <VetName label="부주치의" name={sub_vet?.name ?? '미선택'} />

          {isInChargeSystem && (
            <>
              <Separator orientation="vertical" className="h-4" />

              <VetName label="당일" name={today?.all ?? '미선택'} />

              <Separator orientation="vertical" className="h-4" />

              <VetName label="오전" name={today?.am ?? '미선택'} />

              <Separator orientation="vertical" className="h-4" />

              <VetName label="오후" name={today?.pm ?? '미선택'} />
            </>
          )}
        </div>
      </div>

      {/* 그룹 */}
      <div className="col-span-3 flex h-9 items-center gap-2 rounded-md border px-2 text-sm shadow-sm">
        <ComponentIcon size={16} className="text-muted-foreground" />
        {group_list.length === 0 && (
          <span className="text-muted-foreground">그룹</span>
        )}
        <GroupBadge currentGroups={group_list} />
      </div>

      {/* CC */}
      <div className="col-span-3 flex h-9 items-center gap-2 rounded-md border px-2 shadow-sm">
        <span className="text-xs text-muted-foreground">CC</span>
        <span className="text-sm">{icu_io_cc ?? ''}</span>
      </div>

      {/* DX */}
      <div className="col-span-3 flex h-9 items-center gap-2 rounded-md border px-2 shadow-sm">
        <span className="text-xs text-muted-foreground">DX</span>
        <span className="text-sm">{icu_io_dx ?? ''}</span>
      </div>
    </div>
  )
}
