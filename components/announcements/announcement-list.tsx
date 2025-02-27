'use client'

import AnnouncementListHeader from '@/components/announcements/announcement-list-header'
import AnnouncementsTable from '@/components/announcements/table/announcements-table'
import type { AnnouncementListProps } from '@/types/vetool'
import { useState } from 'react'

export default function AnnouncementList({
  announcements,
}: {
  announcements: AnnouncementListProps[]
}) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.announcement_title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6 p-4 md:p-12">
      <AnnouncementListHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <AnnouncementsTable
            searchTerm={searchTerm}
            announcements={filteredAnnouncements}
          />
        </div>
      </div>
    </div>
  )
}
