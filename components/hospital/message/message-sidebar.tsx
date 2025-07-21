import { cn } from '@/lib/utils/utils'

type Props = {
  selectedCategory: string
  onSelectCategory: (category: string) => void
  isConnected: boolean
}

export default function MessageSidebar({
  selectedCategory,
  onSelectCategory,
  isConnected,
}: Props) {
  return (
    <div className="relative flex w-48 flex-col border-r bg-gray-100 p-4">
      <div
        className={`absolute left-1 top-1 h-3 w-3 animate-pulse rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      <nav className="flex-1 space-y-2">
        {MESSAGE_CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() => onSelectCategory(category.value)}
            className={cn(
              'block w-full rounded-md p-2 text-left text-sm font-medium transition-colors hover:bg-gray-200',
              selectedCategory === category.value
                ? 'bg-gray-300 text-blue-700'
                : 'text-gray-700',
            )}
          >
            {category.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export const MESSAGE_CATEGORIES = [
  {
    value: 'home',
    label: '홈',
  },
  {
    value: 'consultation',
    label: '진료',
  },
  {
    value: 'examination',
    label: '검사',
  },
  {
    value: 'srugery',
    label: '수술',
  },
  {
    value: 'reservation',
    label: '예약',
  },
  {
    value: 'etc',
    label: '기타',
  },
] as const
