import { Card } from '@/components/ui/card'
import { PatchDetailData } from '@/types/vetool'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function PatchDetail({
  patchDetailData,
}: {
  patchDetailData: PatchDetailData
}) {
  const { patch_title, patch_content, created_at } = patchDetailData

  return (
    <Card className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">{patch_title}</span>

        <span className="text-xs text-muted-foreground">
          {created_at.slice(0, 10)}
        </span>
      </div>
      <div className="prose min-h-[400px] max-w-none rounded-md border p-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {patch_content}
        </ReactMarkdown>
      </div>
    </Card>
  )
}
