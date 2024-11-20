import IcuHeaderDateSelector from '@/components/hospital/icu/header/date-picker/header-date-selector'
import { InstructionDialog } from '@/components/hospital/icu/header/instruction/instruction-dialog'
import RegisterDialog from '@/components/hospital/icu/header/register-dialog/register-dialog'
import type { Vet } from '@/types/icu/chart'

export default async function IcuHeader({
  hosId,
  vetsData,
  groupList,
  totalPatientCount,
}: {
  hosId: string
  vetsData: Vet[]
  groupList: string[]
  totalPatientCount: number
}) {
  return (
    <div className="fixed top-2 z-30 flex w-full items-center justify-center gap-2 px-2 md:left-14 md:w-auto md:justify-start">
      <InstructionDialog />

      <RegisterDialog
        hosId={hosId}
        vetsData={vetsData}
        groupList={groupList}
        totalPatientCount={totalPatientCount}
      />
      <IcuHeaderDateSelector />
    </div>
  )
}
