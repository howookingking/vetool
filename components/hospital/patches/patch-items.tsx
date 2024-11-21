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
import SearchPatientPagination from '@/components/hospital/icu/header/register-dialog/search-patient/search-patient-pagination'
import { useSearchParams } from 'next/navigation'

export default function PatchItems({ patches }: { patches: PatchListProps[] }) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || '1')

  return (
    <div className="space-y-4 p-4">
      <span className="text-3xl font-bold">패치 노트</span>

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
      <SearchPatientPagination
        currentPage={currentPage}
        totalPages={patches.length}
        onPageChange={() => {}}
      />
    </div>
  )
}
