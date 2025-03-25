'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { dietSchema } from '@/lib/schemas/admin/admin-schema'
import { upsertDietData } from '@/lib/services/admin/diet'
import { cn } from '@/lib/utils/utils'
import type { AdminDietData } from '@/types/adimin'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, LoaderCircle, Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function AddDietDialog({
  dietData,
  isEdit,
  isOpen,
  onOpenChange,
}: {
  dietData?: AdminDietData
  isEdit?: boolean
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [unit, setUnit] = useState('g')

  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof dietSchema>>({
    resolver: zodResolver(dietSchema),
    defaultValues: {
      diet_id: dietData?.diet_id || undefined,
      name: dietData?.name || '',
      description: dietData?.description || null,
      company: dietData?.company || '',
      species: dietData?.species || '',
      mass_vol: dietData?.mass_vol.toString() || '',
      unit: dietData?.unit || unit,
    },
  })

  const handleSubmit = async (values: z.infer<typeof dietSchema>) => {
    setIsSubmitting(true)

    await upsertDietData(
      {
        company: values.company,
        description: values.description,
        diet_id: values.diet_id,
        name: values.name,
        species: values.species!,
        unit: values.unit,
        mass_vol: Number(values.mass_vol),
        hos_id: hos_id as string,
      },
      isEdit,
    )

    refresh()
    form.reset()
    setIsDialogOpen(false)
    setIsSubmitting(false)
  }

  return (
    <Dialog
      open={isOpen || isDialogOpen}
      onOpenChange={(open) => {
        if (onOpenChange) {
          onOpenChange(open)
        }
        setIsDialogOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant={isEdit ? 'ghost' : 'default'}
          className={cn(
            isEdit
              ? 'inline-flex'
              : onOpenChange
                ? 'hidden'
                : 'h-6 w-6 rounded-full',
            '',
          )}
        >
          {isEdit ? <Edit size={16} /> : <Plus size={18} />}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? '사료 수정' : '새 사료 추가'}</DialogTitle>
          <DialogDescription>사료의 상세 정보를 입력해주세요</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* 사료명 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    사료명 <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="사료명 입력" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 설명 */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="사료 설명 입력"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4">
              {/* 제조사  */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      제조사 <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="제조사 입력"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 종 */}
              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      종 <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                        }}
                        defaultValue={field.value ?? 'both'}
                        name="unit"
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              'h-8 text-sm',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            <SelectValue placeholder="종을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="canine" className="text-xs">
                            <span>Canine</span>
                          </SelectItem>
                          <SelectItem value="feline" className="text-xs">
                            Feline
                          </SelectItem>
                          <SelectItem value="both" className="text-xs">
                            Both
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 총량과 단위 */}
            <div className="flex space-x-4">
              {/* 단위 */}
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      단위 <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          setUnit(value)
                          field.onChange(value)
                        }}
                        defaultValue={field.value}
                        name="unit"
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              'h-8 text-sm',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            <SelectValue placeholder="종을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="g" className="text-xs">
                            g
                          </SelectItem>
                          <SelectItem value="ml" className="text-xs">
                            mL
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 단위당 칼로리 */}
              <FormField
                control={form.control}
                name="mass_vol"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      단위당 칼로리 <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="단위당 칼로리 입력"
                          {...field}
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                          {`kcal/${unit}`}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" tabIndex={-1}>
                  닫기
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  `${isEdit ? '수정' : '추가'}`
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
