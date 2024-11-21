import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export default function ErrorTypeFilter({
  value,
  onChange,
  search,
  setSearch,
}: {
  value: string
  onChange: (value: string) => void
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>에러 로그</CardTitle>
        <CardDescription>에러 검색, 서버/클라이언트 필터링</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="현재는 Error Description 검색이 가능합니다"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="server">서버 에러</SelectItem>
              <SelectItem value="client">클라이언트 에러</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
