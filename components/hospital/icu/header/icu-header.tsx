import IcuHeaderDateSelector from '@/components/hospital/icu/header/date-picker/header-date-selector'
import { InstructionDialog } from '@/components/hospital/icu/header/instruction/instruction-dialog'
import type { Vet } from '@/types/icu/chart'
import RegisterDialog from './register-dialog/register-dialog'

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
    <div className="fixed top-2 z-30 flex w-full items-center justify-center gap-2 px-2 md:ml-12 md:w-auto md:justify-start 2xl:top-1.5 2xl:ml-0 2xl:w-auto">
      <InstructionDialog />

      <RegisterDialog hosId={hosId} vetsData={vetsData} groupList={groupList} />
      <IcuHeaderDateSelector />
    </div>
  )
}
