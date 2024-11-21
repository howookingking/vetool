'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import usePatientFileUpload from '@/hooks/use-patient-file-upload'
import { cn } from '@/lib/utils/utils'
import { DialogClose } from '@radix-ui/react-dialog'
import { FileUp, LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UploadPatientArea() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const { refresh } = useRouter()
  const { hos_id } = useParams()
  const {
    selectedFile,
    uploadStatus,
    isLoading,
    handleFileSelection,
    handleUpload,
  } = usePatientFileUpload(hos_id as string, () => {
    setIsDialogOpen(false)
    refresh()
    toast({
      title: '환자 목록을 업로드하였습니다',
      className: 'bg-green-600 text-white',
    })
  })

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files

    if (files.length > 0) handleFileSelection(files[0])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      handleFileSelection(file)
    }
  }

  const handleDialogOpen = () => {
    setIsDialogOpen((prev) => !prev)
    handleFileSelection(null)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileUp size={20} />
          엑셀 업로드
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>환자 목록 업로드</DialogTitle>
          <DialogDescription>
            Excel 혹은 CSV 파일을 업로드하면 환자 목록을 업로드할 수 있습니다
          </DialogDescription>
        </DialogHeader>

        <Card className="flex flex-col gap-4 border border-dashed border-gray-300 p-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
              `flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed text-center`,
              isDragging ? 'border-blue-500 bg-blue-100' : 'bg-gray-100',
            )}
          >
            <Label className="flex h-full w-full cursor-pointer items-center justify-center">
              <Input
                type="file"
                accept=".csv,.xlsx"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="text-gray-500">
                {selectedFile
                  ? selectedFile.name
                  : 'Excel 또는 CSV 파일을 드래그하거나 클릭하여 선택하세요'}
              </span>
            </Label>
          </div>

          {uploadStatus && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-destructive">{uploadStatus}</span>
              {isLoading && (
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-blue-500 transition-all duration-300" />
                </div>
              )}
            </div>
          )}
        </Card>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              tabIndex={-1}
              variant="outline"
              disabled={isLoading}
            >
              닫기
            </Button>
          </DialogClose>

          <Button onClick={handleUpload} disabled={!selectedFile || isLoading}>
            업로드
            {isLoading && (
              <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
