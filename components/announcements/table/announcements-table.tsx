import AnnouncementsTableBody from '@/components/announcements/table/announcements-table-body'
import AnnouncementsTableHeader from '@/components/announcements/table/announcements-table-header'
import { Table } from '@/components/ui/table'
import { type AnnouncementListProps } from '@/types/vetool'

type Props = {
  searchTerm: string
  announcements: AnnouncementListProps[]
}

export default function AnnouncementsTable({
  searchTerm,
  announcements,
}: Props) {
  return (
    <Table>
      <AnnouncementsTableHeader />
      <AnnouncementsTableBody
        searchTerm={searchTerm}
        announcements={announcements}
      />
    </Table>
  )
}
