import CommonDialogFooter from '@/components/common/common-dialog-footer'
import SubmitButton from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
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
import { useSafeRefresh } from '@/hooks/use-safe-refresh'
import { cpcrEtTubeSchema } from '@/lib/schemas/icu/chart/chart-info-schema'
import { updateCpcrEtTube } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

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
  const safeRefresh = useSafeRefresh()

  const [isUpdating, setIsUpdating] = useState(false)
  const [etTubeSelectOpen, setEtTubeSelectOpen] = useState(false)

  const handleUpdateCpcrEtTube = async (
    values: z.infer<typeof cpcrEtTubeSchema>,
  ) => {
    setIsUpdating(true)

    const etTube = values.cpcr === 'CPCR' ? values.etTube : null
    await updateCpcrEtTube(icuIoId, values.cpcr, etTube)

    toast.success('CPCR / ET Tube를 변경하였습니다')

    setIsUpdating(false)
    setIsDialogOpen(false)

    safeRefresh()
  }

  const form = useForm<z.infer<typeof cpcrEtTubeSchema>>({
    resolver: zodResolver(cpcrEtTubeSchema),
    defaultValues: {
      cpcr: cpcr ?? '미지정',
      etTube: etTube ?? '미지정',
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <SelectItem value="미지정">미지정</SelectItem>
                    <SelectItem value="CPCR">CPCR</SelectItem>
                    <SelectItem value="DNR">DNR</SelectItem>
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
                open={etTubeSelectOpen}
                onOpenChange={setEtTubeSelectOpen}
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

        <DialogFooter className="col-span-2 ml-auto">
          <DialogClose asChild>
            <Button tabIndex={-1} variant="outline">
              닫기
            </Button>
          </DialogClose>

          <SubmitButton isPending={isUpdating} buttonText="변경" />
        </DialogFooter>
      </form>
    </Form>
  )
}

const TUBE_THICKNESS = [
  '미지정',
  'V-GEL',
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
