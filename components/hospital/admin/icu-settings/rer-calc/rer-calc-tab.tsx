'use client'

import RerCalcSettings from '@/components/hospital/admin/icu-settings/rer-calc/rer-calc-settings'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

export default function RerCalcTab({ hosId }: { hosId: string }) {
  const {
    basicHosData: { rerCalcMethod },
  } = useBasicHosDataContext()

  return <RerCalcSettings hosId={hosId} rerCalcMethodData={rerCalcMethod} />
}
