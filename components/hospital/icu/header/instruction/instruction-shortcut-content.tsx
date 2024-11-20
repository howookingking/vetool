import InstructionShortcutItem from '@/components/hospital/icu/header/instruction/instruction-shortcut-item'
import { INSTRUCITON_SHORTCUTS } from '@/constants/hospital/icu/chart/instruction'

export default function InstructionShortcutContent() {
  return (
    <div className="h-full p-8">
      <h2 className="mb-6 text-2xl font-semibold">단축키 모음</h2>
      <ul className="space-y-6">
        {INSTRUCITON_SHORTCUTS.map((shortcut, index) => (
          <InstructionShortcutItem key={index} {...shortcut} />
        ))}
      </ul>
    </div>
  )
}