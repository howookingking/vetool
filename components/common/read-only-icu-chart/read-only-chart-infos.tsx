import GroupBadge from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/group/group-badge'
import VetName from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/vets/vet-name'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuChartsInCharge } from '@/types/adimin'
import type { SelectedIcuChart } from '@/types/icu/chart'
import {
  ActivityIcon,
  ComponentIcon,
  LogInIcon,
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
  const { icu_io, patient, main_vet, sub_vet, in_charge, urgency } = chartData
  const [cpcr, etTube] = icu_io.cpcr.split(',')
  const { today } = (in_charge as IcuChartsInCharge) || {}

  const {
    basicHosData: { isInChargeSystem },
  } = useBasicHosDataContext()

  return (
    <div className="grid grid-cols-12 gap-2">
      {/* 입원일 */}
      <div className="col-span-2 flex h-9 items-center gap-2 rounded-md border px-2 shadow-sm">
        <LogInIcon className="text-muted-foreground" size={16} />
        <span className="text-sm">{icu_io.in_date}</span>
      </div>

      {/* 퇴원일 */}
      <div className="col-span-2 flex h-9 items-center gap-2 rounded-md border px-2 shadow-sm">
        <LogOutIcon className="text-muted-foreground" size={16} />
        <div className="text-sm">
          {icu_io.out_date ? (
            <span>{icu_io.out_date}</span>
          ) : (
            <>
              {icu_io.out_due_date ? (
                <span>{icu_io.out_due_date}</span>
              ) : (
                <span className="text-muted-foreground">퇴원 예정일</span>
              )}
            </>
          )}
        </div>
      </div>

      {/* 보호자 */}
      <div className="col-span-2 flex h-9 items-center gap-2 rounded-md border px-2 shadow-sm">
        <UserIcon className="text-muted-foreground" size={16} />
        <div className="text-sm">
          {patient.owner_name ? (
            <span>{patient.owner_name}</span>
          ) : (
            <span className="text-muted-foreground">보호자</span>
          )}
        </div>
      </div>

      {/* CPCR 여부 | ET Tube */}
      <div className="col-span-2 flex items-center gap-2 rounded-md border px-2 shadow-sm">
        <ActivityIcon className="text-muted-foreground" size={16} />

        <div className="flex items-center gap-1.5 truncate text-xs 2xl:gap-2 2xl:text-sm">
          <span className={cn(cpcr === '미지정' && 'text-muted-foreground')}>
            {cpcr === '미지정' ? 'CPCR 여부 | ET Tube' : cpcr}
          </span>

          <Separator
            orientation="vertical"
            className={cn(cpcr !== 'CPCR' && 'hidden', 'h-4')}
          />

          <span>{etTube}</span>
        </div>
      </div>

      {/* 입원장 */}
      <div className="col-span-2 flex h-9 items-center gap-2 rounded-md border px-2 shadow-sm">
        <SquarePlusIcon className="text-muted-foreground" size={16} />
        <div className="text-sm">
          {icu_io.cage ? (
            <span>{icu_io.cage}</span>
          ) : (
            <span className="text-muted-foreground">입원장</span>
          )}
        </div>
      </div>

      {/* 응급도 */}
      <div className="col-span-2 flex items-center gap-2 rounded-md border px-2 shadow-sm">
        <SirenIcon size={16} className="text-muted-foreground" />

        <div>
          {urgency === 0 || urgency === null ? (
            <span className="text-sm text-muted-foreground">응급도</span>
          ) : (
            <div>
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
      </div>

      {/* 담당의 */}
      <div className="col-span-6 flex items-center gap-2 rounded-md border px-2 text-sm shadow-sm">
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
      <div className="col-span-6 flex h-9 items-center gap-2 rounded-md border px-2 text-sm shadow-sm">
        <ComponentIcon size={16} className="text-muted-foreground" />
        {icu_io.group_list.length === 0 && (
          <span className="text-muted-foreground">그룹</span>
        )}
        <GroupBadge currentGroups={icu_io.group_list} />
      </div>

      {/* CC */}
      <div className="col-span-6 flex h-9 items-center gap-2 rounded-md border px-2 text-sm shadow-sm">
        <span className="text-xs text-muted-foreground">CC</span>
        <span>{icu_io.icu_io_cc ?? ''}</span>
      </div>

      {/* DX */}
      <div className="col-span-6 flex h-9 items-center gap-2 rounded-md border px-2 text-sm shadow-sm">
        <span className="text-xs text-muted-foreground">DX</span>
        <span>{icu_io.icu_io_dx ?? ''}</span>
      </div>
    </div>
  )
}
