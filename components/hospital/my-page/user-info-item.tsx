'use client'

import { cn } from '@/lib/utils/utils'
import { ChevronRight, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useState } from 'react'
import { updateUserInfo } from '@/lib/services/my-page/update-user-info'
import { useUpdateUserInfoStore } from '@/lib/store/hospital/update-user-info'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export default function UserInfoItem({
  label,
  value,
  userId,
  canEdit = false,
}: {
  label: string
  value: string
  userId: string
  canEdit?: boolean
}) {
  const [isValid, setIsValid] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { refresh } = useRouter()
  const { name, avatarUrl, setUserInfo } = useUpdateUserInfoStore()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim()
    setUserInfo(trimmedValue, avatarUrl)

    if (trimmedValue.length < 2 || trimmedValue.length > 10) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  const handleSubmit = async () => {
    if (!isValid || value === name) return

    setIsSubmitting(true)

    await updateUserInfo(userId, name, avatarUrl)

    toast({
      title: '프로필 수정 완료',
      description: '프로필 수정이 완료되었습니다',
    })

    refresh()
    setIsSubmitting(false)
  }

  return (
    <>
      {canEdit ? (
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex w-full cursor-pointer justify-between p-4 hover:bg-muted">
              <span className="font-bold">{label}</span>
              <div className="flex items-center">
                <span>{value}</span>
                <ChevronRight strokeWidth={1.5} />
              </div>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{label} 수정</SheetTitle>
              <SheetDescription>
                변경 사항을 입력 후 수정 완료 버튼을 눌러주세요
              </SheetDescription>
            </SheetHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {label}
                </Label>
                <Input
                  id="name"
                  value={name ?? ''}
                  placeholder={value}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>

            {!isValid && (
              <div className="flex w-full justify-end pb-4">
                <span className="ml-auto text-sm text-red-500">
                  이름은 2자 이상 및 10자 이하여야 합니다
                </span>
              </div>
            )}

            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  onClick={handleSubmit}
                >
                  수정 완료
                  <LoaderCircle
                    className={cn(
                      isSubmitting ? 'ml-2 animate-spin' : 'hidden',
                    )}
                  />
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <div
          className={cn(
            'flex w-full justify-between p-4',
            canEdit && 'cursor-pointer hover:bg-muted',
          )}
        >
          <span className="font-bold">{label}</span>
          <div className="flex items-center">
            <span>{value}</span>
          </div>
        </div>
      )}
    </>
  )
}
