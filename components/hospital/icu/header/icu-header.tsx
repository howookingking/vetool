import IcuHeaderDateSelector from '@/components/hospital/icu/header/date-picker/header-date-selector'
import type { Vet } from '@/types/icu/chart'
import RegisterDialog from './register-dialog/register-dialog'
import { InstructionDialog } from './instruction/instruction-dialog'

export default async function IcuHeader({
  hosId,
  vetsData,
  groupList,
}: {
  hosId: string
  vetsData: Vet[]
  groupList: string[]
}) {
  return (
    <div className="fixed top-2 z-30 flex w-full items-center justify-center gap-2 px-2 md:left-14 md:w-auto md:justify-start">
      <InstructionDialog />

      <RegisterDialog hosId={hosId} vetsData={vetsData} groupList={groupList} />
      <IcuHeaderDateSelector />
    </div>
  )
}
