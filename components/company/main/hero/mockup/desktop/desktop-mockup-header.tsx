import { Cat, Copy, Share, Share2, Trash2 } from 'lucide-react'

export default function DesktopMockupHeader() {
  return (
    <div className="mb-3 flex items-center justify-between pt-1">
      <span className="text-md font-extrabold tracking-tighter text-primary">
        VETOOL
      </span>
      <span className="flex items-center gap-1 text-sm font-semibold">
        <Cat size={16} /> · 벳툴이 · Persian · IF · 1년 6개월 · 7.4kg
      </span>
      <div className="mr-2 flex items-center gap-4 text-xl">
        <Share2 size={16} />
        <Share size={16} />
        <Copy size={16} />
        <Trash2 size={16} />
      </div>
    </div>
  )
}
