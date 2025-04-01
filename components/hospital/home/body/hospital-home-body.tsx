import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import Notice from './notice/notice'
import Todo from './todo/todo'

export function HospitalHomeBody({ hosId }: { hosId: string }) {
  return (
    <div className="mt-12">
      <ResizablePanelGroup direction="horizontal" className="mt-12 w-full">
        <ResizablePanel defaultSize={500} className="w-full min-w-[600px]">
          <Notice hosId={hosId} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={500} className="w-full min-w-[600px]">
          <Todo hosId={hosId} />
        </ResizablePanel>
        <ResizableHandle />
      </ResizablePanelGroup>
    </div>
  )
}
