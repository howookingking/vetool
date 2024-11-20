import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PatchListProps } from '@/types/vetool'
import PatchItem from './patch-item'

export default function PatchItems({ patches }: { patches: PatchListProps[] }) {
  return (
    <div className="space-y-4 p-4">
      <span className="text-3xl font-bold">패치 노트</span>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px] pl-8">타입</TableHead>
              <TableHead className="w-[120px] text-center">제목</TableHead>
              <TableHead className="w-[180px] pr-8 text-right">
                등록일
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {patches.map((patch) => (
              <PatchItem
                key={patch.patch_id}
                id={patch.patch_id}
                title={patch.patch_title}
                category={patch.patch_category}
                createdAt={patch.created_at}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
