import { FileText, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { type Dispatch, type SetStateAction } from 'react'
type Props = {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

export default function AnnouncementListHeader({
  searchTerm,
  setSearchTerm,
}: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
          <FileText className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
          벳툴 공지사항
        </h2>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="공지사항 검색..."
          className="border-gray-200 bg-gray-50 pl-9 focus-visible:ring-primary/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}
