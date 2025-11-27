import type { JSX, ReactNode } from 'react'

type Props = {
  icon: JSX.Element
  title: string
  description: string | ReactNode
}

export default function FaqSolution({ icon, title, description }: Props) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-teal-500/30 hover:shadow-lg">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-100 group-hover:text-teal-700">
          {icon}
        </div>

        <div className="flex-1 space-y-2">
          <h4 className="text-lg font-semibold text-zinc-900">{title}</h4>

          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
