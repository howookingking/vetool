import { Keyboard, Mouse } from 'lucide-react'

export default function InstructionShortcutItem({
  title,
  description,
  icons,
}: {
  title: string
  description: string
  icons: string[]
}) {
  return (
    <li className="flex items-center space-x-4">
      <div className="flex min-w-[80px] gap-4">
        {icons.includes('keyboard') && (
          <Keyboard className="h-6 w-6 flex-shrink-0 text-blue-600" />
        )}
        {icons.includes('mouse') && (
          <Mouse className="h-6 w-6 flex-shrink-0 text-blue-600" />
        )}
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <span className="min-w-[280px] font-bold text-gray-700">{title}</span>
        <span className="inline-flex items-center rounded-lg bg-blue-100 px-4 py-2 font-mono text-blue-800">
          <span>{description}</span>
        </span>
      </div>
    </li>
  )
}
