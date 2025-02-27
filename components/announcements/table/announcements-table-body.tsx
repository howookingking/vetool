import AnnouncementItem from '@/components/announcements/announcement-item'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { type AnnouncementListProps } from '@/types/vetool'

type Props = {
  searchTerm: string
  announcements: AnnouncementListProps[]
}

export default function AnnouncementsTableBody({
  searchTerm,
  announcements,
}: Props) {
  const hasAnnouncements = announcements.length > 0

  return (
    <TableBody>
      {hasAnnouncements ? (
        announcements.map((announcement) => (
          <AnnouncementItem
            key={announcement.announcement_id}
            id={announcement.announcement_id}
            title={announcement.announcement_title}
            category={announcement.announcement_category}
            createdAt={announcement.created_at}
            isDraft={announcement.is_draft}
          />
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3} className="py-16 text-center">
            <NoResultSquirrel
              text={
                searchTerm ? '검색 결과가 없습니다.' : '공지사항이 없습니다.'
              }
            />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
