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
import { toast } from '@/components/ui/use-toast'
import { createPatchNote } from '@/lib/services/super/patch/patch'
import { cn } from '@/lib/utils/utils'
import type { PatchFormProps, UserFeedbackType } from '@/types/vetool'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const PATCH_CATEGORIES = [
  'icu',
  'patients',
  'surgery',
  'echocardio',
  'checkup',
  'analytics',
]

export default function PatchForm({
  userFeedBackData,
}: {
  userFeedBackData: UserFeedbackType[]
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<PatchFormProps>({
    feedback_id: '',
    patch_title: '',
    patch_content: '',
    patch_category: '',
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

    await createPatchNote(formData)

    toast({
      title: '패치노트가 등록되었습니다',
    })

    setIsSubmitting(false)
    setFormData({
      feedback_id: '',
      patch_title: '',
      patch_content: '',
      patch_category: '',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>패치노트 작성</CardTitle>
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
            value={formData.patch_category ?? ''}
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
            id="patch_title"
            name="patch_title"
            value={formData.patch_title}
            onChange={handleInputChange}
            required
            placeholder="패치노트 제목"
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
                id="patch_content"
                name="patch_content"
                value={formData.patch_content}
                onChange={handleInputChange}
                required
                className="min-h-[400px]"
              />
            </TabsContent>

            <TabsContent value="preview">
              <div className="prose min-h-[400px] max-w-none rounded-md border p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.patch_content}
                </ReactMarkdown>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end space-x-4">
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
