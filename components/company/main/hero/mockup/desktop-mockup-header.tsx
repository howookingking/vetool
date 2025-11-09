import {
  BookmarkPlusIcon,
  CatIcon,
  ClipboardIcon,
  LogOutIcon,
  Share2Icon,
  ShareIcon,
  Trash2Icon,
} from 'lucide-react'

export default function DesktopMockupHeader() {
  return (
    <div className="mb-3 flex items-center justify-between pt-1">
      <span className="text-md font-extrabold tracking-[-0.12em] text-primary">
        VETOOL
      </span>
      <span className="flex items-center gap-1 text-sm font-semibold">
        <CatIcon size={16} /> · 벳툴이 · Persian · SF · 1년 6개월 · 5kg
      </span>
      <div className="mr-2 flex items-center gap-4 text-xl">
        <BookmarkPlusIcon size={16} />
        <Share2Icon size={16} />
        <ClipboardIcon size={16} />
        <ShareIcon size={16} />
        <LogOutIcon size={16} />
        <Trash2Icon size={16} />
      </div>
    </div>
  )
}
