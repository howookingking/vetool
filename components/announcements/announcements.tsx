'use client'

import { announcementsTableColumns } from '@/components/announcements/announcements-table-columns'
import DataTable from '@/components/ui/data-table'
import type { AnnouncementList } from '@/types/vetool'
import { FileTextIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Announcements({
  announcements,
}: {
  announcements: AnnouncementList[]
}) {
  const { push } = useRouter()

  return (
    <div className="space-y-6 p-4 md:p-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <FileTextIcon className="h-4 w-4 text-primary" />
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
            벳툴 공지사항
          </h2>
        </div>
      </div>
      <DataTable
        columns={announcementsTableColumns}
        data={announcements}
        onRowClick={(row) => {
          push(`/announcements/${row.announcement_id}`)
        }}
      />
    </div>
  )
}
