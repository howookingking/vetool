'use client'
import { TXTYPES } from '@/constants/checklist/checklist'
import { ChecklistSidebarData, TxTypes } from '@/types/checklist/checklistchart'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import PatientDetailInfo from '../../common/patient/patient-detail-info'
import CustomTooltip from '@/components/ui/custom-tooltip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import dynamic from 'next/dynamic'

const LazyTxChartTypeConrimUser = dynamic(
  () => import('@/components/hospital/checklist/edit/txchart-edit-user'),
  { ssr: false },
)

type Props = {
  pretxdata: ChecklistSidebarData | null
  setaChecklistEditDialogOpen: (isopen: boolean) => void
}

const txTypes: string[] = [...TXTYPES]

export default function TxEditContainer(props: Props | null) {
  if (!props) return null
  const { pretxdata, setaChecklistEditDialogOpen } = props
  const [txData, setTxData] = useState<ChecklistSidebarData | null>()
  const [isActive, setIsActive] = useState<string | null>(null)
  useEffect(() => {
    pretxdata && setTxData({ ...pretxdata })
    pretxdata && pretxdata.checklist_type
      ? setIsActive(pretxdata.checklist_type)
      : null
  }, [pretxdata])
  return (
    <>
      <div className="flex-col">
        <PatientDetailInfo
          species={txData?.patients?.species ?? ''}
          name={txData?.patients?.name ?? ''}
          breed={txData?.patients?.breed ?? ''}
          gender={txData?.patients?.gender ?? ''}
          birth={txData?.patients?.birth ?? ''}
          weight={txData?.weight ? String(txData.weight) : '0'}
        ></PatientDetailInfo>
        <div className="flex flex-wrap">
          {txTypes &&
            txTypes.map((_type) => (
              <CustomTooltip
                key={_type}
                contents={_type}
                side="right"
                sideOffset={4}
                delayDuration={300}
              >
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    'm-1 2xl:m-2 2xl:ml-2',
                    isActive === _type && 'bg-primary text-white',
                  )}
                  onClick={(e) => {
                    setIsActive(_type)
                  }}
                >
                  <p>{_type}</p>
                </Button>
              </CustomTooltip>
            ))}
        </div>
        {isActive && isActive === '사용자' ? (
          <div>
            <LazyTxChartTypeConrimUser
              txData={txData}
              setaChecklistEditDialogOpen={setaChecklistEditDialogOpen}
            ></LazyTxChartTypeConrimUser>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  )
}
