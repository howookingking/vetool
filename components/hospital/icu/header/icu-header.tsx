import IcuHeaderDateSelector from '@/components/hospital/icu/header/date-picker/header-date-selector'
import { InstructionDialog } from '@/components/hospital/icu/header/instruction/instruction-dialog'
import RegisterDialog from '@/components/hospital/icu/header/register-dialog/register-dialog'
import type { Vet } from '@/types/icu/chart'

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
    <div className="fixed top-2 z-30 flex w-full items-center justify-center gap-2 px-2 xl:ml-12 xl:w-auto xl:justify-start 2xl:top-1.5 2xl:ml-0 2xl:w-auto">
      <InstructionDialog />

      <RegisterDialog hosId={hosId} vetsData={vetsData} groupList={groupList} />
      <IcuHeaderDateSelector />
    </div>
  )
}
