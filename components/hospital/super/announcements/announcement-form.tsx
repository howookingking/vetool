'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { createAnnouncement } from '@/lib/services/super/announcement/announcement'
import type { UserFeedback } from '@/lib/services/super/feedback/feedback'
import { cn } from '@/lib/utils/utils'
import type { AnnouncementFormProps } from '@/types/vetool'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { toast } from 'sonner'

const PATCH_CATEGORIES = [
  'icu',
  'patients',
  'surgery',
  'echocardio',
  'checkup',
  'analytics',
]

export default function AnnouncementForm({
  userFeedBackData,
}: {
  userFeedBackData: UserFeedback[]
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<AnnouncementFormProps>({
    feedback_id: null,
    announcement_title: '',
    announcement_content: '',
    announcement_category: '',
    is_pinned: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFeedbackChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      feedback_id: value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      patch_category: value,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    await createAnnouncement(formData)

    toast.success('공지사항이 등록되었습니다')

    setIsSubmitting(false)
    setFormData({
      feedback_id: null,
      announcement_title: '',
      announcement_content: '',
      announcement_category: '',
      is_pinned: false,
    })
  }

  const handleSave = async () => {
    setIsSubmitting(true)

    await createAnnouncement(formData, true)

    toast.success('공지사항이 임시저장되었습니다')

    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>공지사항 작성</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="patch_title">유저 피드백 선택</Label>
          <Select
            name="feedback_id"
            onValueChange={handleFeedbackChange}
            value={formData.feedback_id ?? ''}
          >
            <SelectTrigger className="w-[800px]">
              <SelectValue placeholder="유저 피드백 목록" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {userFeedBackData.slice(0, 10).map((feedback) => (
                  <SelectItem
                    key={feedback.feedback_id}
                    value={feedback.feedback_id}
                  >
                    {feedback.feedback_description}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="patch_category">패치 카테고리 선택</Label>
          <Select
            name="patch_category"
            onValueChange={handleCategoryChange}
            value={formData.announcement_category ?? ''}
          >
            <SelectTrigger className="w-[800px]">
              <SelectValue placeholder="카테고리 목록" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {PATCH_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="patch_title">제목</Label>
          <Input
            id="announcement_title"
            name="announcement_title"
            value={formData.announcement_title}
            onChange={handleInputChange}
            required
            placeholder="공지사항 제목"
          />
        </div>

        <div className="space-y-2">
          <Label>내용</Label>
          <Tabs defaultValue="write" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="write">작성</TabsTrigger>
              <TabsTrigger value="preview">미리보기</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
              <Textarea
                id="announcement_content"
                name="announcement_content"
                value={formData.announcement_content}
                onChange={handleInputChange}
                required
                className="min-h-[400px]"
              />
            </TabsContent>

            <TabsContent value="preview">
              <div className="prose min-h-[400px] max-w-none rounded-md border p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.announcement_content}
                </ReactMarkdown>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            disabled={isSubmitting}
            variant="outline"
            onClick={handleSave}
          >
            임시 저장
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>

          <Button type="button" disabled={isSubmitting} onClick={handleSubmit}>
            등록
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
