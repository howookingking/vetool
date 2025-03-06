import { FileText } from 'lucide-react'

export default function AnnouncementsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
          <FileText className="h-4 w-4 text-primary" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
          벳툴 공지사항
        </h2>
      </div>
    </div>
  )
}
