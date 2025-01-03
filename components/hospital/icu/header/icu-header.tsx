import IcuHeaderDateSelector from '@/components/hospital/icu/header/date-picker/header-date-selector'

export default async function IcuHeader() {
  return (
    <div className="z-30 flex w-full items-center justify-center gap-2 bg-white xl:ml-16 xl:w-auto xl:justify-start 2xl:hidden">
      <IcuHeaderDateSelector />
    </div>
  )
}
