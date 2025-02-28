'use client'

import AnnouncementsHeader from '@/components/announcements/announcements-header'
import { announcementsTableColumns } from '@/components/announcements/announcements-table-columns'
import DataTable from '@/components/ui/data-table'
import { type AnnouncementListProps } from '@/types/vetool'
import { useRouter } from 'next/navigation'

export default function Announcements({
  announcements,
}: {
  announcements: AnnouncementListProps[]
}) {
  const { push } = useRouter()

  return (
    <div className="space-y-6 p-4 md:p-12">
      <AnnouncementsHeader />
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
