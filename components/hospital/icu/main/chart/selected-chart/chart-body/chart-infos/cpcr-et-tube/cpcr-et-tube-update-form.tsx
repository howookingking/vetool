'use no memo'

import CommonDialogFooter from '@/components/common/common-dialog-footer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { cpcrEtTubeSchema } from '@/lib/schemas/icu/chart/chart-info-schema'
import { updateCpcrEtTube } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const TUBE_THICKNESS = [
  '미지정',
  2,
  2.5,
  3,
  3.5,
  4,
  4.5,
  5,
  5.5,
  6,
  6.5,
  7,
  7.5,
  8,
  8.5,
  9,
  9.5,
  10,
] as const

type Props = {
  icuIoId: string
  cpcr: string
  etTube: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function CpcrEtTubeUpdateForm({
  icuIoId,
  cpcr,
  etTube,
  setIsDialogOpen,
}: Props) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateCpcrEtTube = async (
    values: z.infer<typeof cpcrEtTubeSchema>,
  ) => {
    setIsUpdating(true)

    const etTube = values.cpcr === 'CPCR' ? values.etTube : null
    await updateCpcrEtTube(icuIoId, values.cpcr, etTube)

    toast({
      title: 'CPCR / ET Tube를 변경하였습니다',
    })

    setIsUpdating(false)
    setIsDialogOpen(false)
  }

  const form = useForm<z.infer<typeof cpcrEtTubeSchema>>({
    resolver: zodResolver(cpcrEtTubeSchema),
    defaultValues: {
      cpcr: cpcr,
      etTube: etTube,
    },
  })

  const cpcrValue = form.watch('cpcr')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateCpcrEtTube)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="cpcr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                CPCR <span className="text-destructive">*</span>
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  if (value === '미지정') {
                    form.setValue('etTube', '미지정')
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="CPCR">CPCR</SelectItem>
                    <SelectItem value="DNR">DNR</SelectItem>
                    <SelectItem value="미지정">미지정</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="etTube"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ET Tube</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? ''}
                disabled={cpcrValue !== 'CPCR'}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {TUBE_THICKNESS.map((thickness) => (
                      <SelectItem key={thickness} value={`${thickness}`}>
                        {thickness}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <CommonDialogFooter
          buttonName="변경"
          isPending={isUpdating}
          type="submit"
          className="col-span-2"
        />
      </form>
    </Form>
  )
}
