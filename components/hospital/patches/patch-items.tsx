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

export default function PatchItems({
  patches,
  isSuper,
}: {
  patches: PatchListProps[]
  isSuper: boolean
}) {
  return (
    <div className="space-y-4 p-2 md:p-4">
      <span className="relative z-10 mb-3 pl-2 text-lg font-bold md:p-0 md:text-xl">
        패치 노트
      </span>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table className="w-full">
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-100">
              <TableHead className="w-[30%] py-3 pl-0 text-center text-xs font-medium uppercase tracking-wider text-gray-500 md:w-[20%] md:pl-12 md:text-left md:text-sm">
                타입
              </TableHead>
              <TableHead className="w-[40%] px-2 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 md:text-sm">
                제목
              </TableHead>
              <TableHead className="w-[30%] py-3 pr-0 text-center text-xs font-medium uppercase tracking-wider text-gray-500 md:w-[20%] md:pr-12 md:text-right md:text-sm">
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
                isDraft={patch.is_draft}
                isSuper={isSuper}
              />
            ))}
          </TableBody>
        </Table>

        {patches.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            패치 노트가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}
