import StatsCounter from './ui/stats-counter'

export default function Stats() {
  return (
    <div className="flex h-[calc(100vh-32px)] flex-col bg-slate-50 px-3 py-12 lg:px-24">
      <div className="flex flex-col">
        <span className="text-center text-2xl font-bold tracking-tighter sm:text-6xl md:text-4xl">
          디지털 차트를 통해 <br /> 동물 병원은 변화중
        </span>
        <StatsCounter />
      </div>

      <div className="flex h-full gap-12">
        <div className="flex h-full w-full items-center justify-center bg-green-200">
          벳툴 전자 차트1 혹은 종이 차트 사진
        </div>
        <div className="hidden h-full w-full items-center justify-center bg-green-200 sm:flex">
          벳툴 전자 차트2
        </div>
      </div>
    </div>
  )
}
