'use client'

import MobileTitle from '@/components/common/mobile-title'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { ClipboardListIcon } from 'lucide-react'
import { redirect, useParams } from 'next/navigation'

export default function ChartDefaultPage() {
  const { hos_id, target_date } = useParams()

  const {
    basicHosData: { icuSidebarPatients },
  } = useBasicHosDataContext()

  if (icuSidebarPatients.length === 0) {
    return (
      <>
        <MobileTitle icon={ClipboardListIcon} title="입원차트" />

        <NoResultSquirrel
          className="h-mobile flex-col 2xl:h-desktop"
          size="lg"
          text="입원환자가 없습니다"
        />
      </>
    )
  }

  const firstPatientId = icuSidebarPatients[0].patient.patient_id

  redirect(`/hospital/${hos_id}/icu/${target_date}/chart/${firstPatientId}`)
}
