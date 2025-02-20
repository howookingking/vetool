import { Cat, Copy, Share, Share2, Trash2 } from 'lucide-react'

export default function MobileMockupHeader() {
  return (
    <div className="mb-3 flex items-center justify-center pt-1">
      <span className="flex items-center gap-1 text-xs font-semibold">
        <Cat size={16} /> · 벳툴이 · Persian · IF · 1년 6개월 · 7.4kg
      </span>
    </div>
  )
}
