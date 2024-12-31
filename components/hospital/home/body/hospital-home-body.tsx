import { Card } from '@/components/ui/card'
import Notice from './notice/notice'

export default function HospitalHomeBody({ hosId }: { hosId: string }) {
  return (
    <div className="mt-12 flex w-full flex-col gap-2 p-2 xl:flex-row">
      <Notice hosId={hosId} />

      {/* <Todo hosId={hosId} /> */}
      <Card className="w-full xl:w-1/4">TODO placeholder</Card>
    </div>
  )
}
