export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <header className="z-50 w-full border-b border-zinc-200 bg-primary py-2 text-center text-xl font-bold text-zinc-50">
        이 페이지는 보기만 가능한 체험 페이지입니다.
      </header>
      <main>{children}</main>
    </div>
  )
}
