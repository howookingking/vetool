'use client'

import PatchItem from '@/components/hospital/patches/patch-item'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PatchListProps } from '@/types/vetool'

export default function PatchItems({ patches }: { patches: PatchListProps[] }) {
  return (
    <div className="p-2">
      <span className="absolute left-2 top-2.5 z-20 text-xl font-bold md:left-[72px]">
        패치 노트
      </span>

      <div className="overflow-hidden rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] pl-2 sm:w-[120px] sm:pl-8">
                타입
              </TableHead>
              <TableHead className="text-center sm:w-[120px]">제목</TableHead>
              <TableHead className="w-[80px] pr-2 text-right sm:w-[180px] sm:pr-8">
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
      {/* <SearchPatientPagination
        currentPage={currentPage}
        totalPages={patches.length}
        onPageChange={() => {}}
      /> */}
    </div>
  )
}
