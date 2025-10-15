'use client'

import SubmitButton from '@/components/common/submit-button'
import UserAvatar from '@/components/hospital/common/user-avatar'
import VetName from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/vets/vet-name'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { vetsFormSchema } from '@/lib/schemas/icu/chart/chart-info-schema'
import { updateClVet } from '@/lib/services/checklist/update_checklist'
import { updateMainSubVet } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { cn } from '@/lib/utils/utils'
import { useClContextData } from '@/providers/cl-context-provider'
import type { IcuChartsInCharge } from '@/types/adimin'
import type { ChecklistVet } from '@/types/checklist/checklist-type'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Stethoscope } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

type Props = {
  checklistVet: ChecklistVet
  checklistId: string
}

export default function ClVet({ checklistVet, checklistId }: Props) {
  const vetsFormSchema = z.object({
    main_vet: z.string().optional(),
    primary: z.string().optional(),
    anesthesia: z.string().optional(),
    assistance: z.string().optional(),
  })

  const {
    clContextData: { vetsListData },
  } = useClContextData()

  const mainVet = vetsListData.find(
    (vet) => vet.user_id === checklistVet.main_vet,
  )
  const primary = vetsListData.find(
    (vet) => vet.user_id === checklistVet.primary,
  )
  const anesthesia = vetsListData.find(
    (vet) => vet.user_id === checklistVet.anesthesia,
  )
  const assistance = vetsListData.find(
    (vet) => vet.user_id === checklistVet.assistance,
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateMainAndSubVet = async (
    values: z.infer<typeof vetsFormSchema>,
  ) => {
    const { main_vet, anesthesia, primary, assistance } = values

    setIsUpdating(true)

    const vetInput: ChecklistVet = {
      main_vet: main_vet ?? '',
      anesthesia: anesthesia ?? '',
      primary: primary ?? '',
      assistance: assistance ?? '',
    }

    await updateClVet(checklistId, vetInput)

    toast.success('담당수의사 변경하였습니다')

    setIsUpdating(false)

    setIsDialogOpen(false)
  }

  const form = useForm<z.infer<typeof vetsFormSchema>>({
    resolver: zodResolver(vetsFormSchema),
    defaultValues: {
      main_vet: checklistVet?.main_vet,
      primary: checklistVet?.primary,
      anesthesia: checklistVet?.anesthesia,
      assistance: checklistVet?.assistance,
    },
  })

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full items-center justify-start gap-2 px-2"
        >
          <Stethoscope size={16} className="text-muted-foreground" />

          <div className="flex items-center gap-2 overflow-hidden">
            <VetName label="주치의" name={mainVet?.name ?? '미선택'} />

            <Separator orientation="vertical" className="h-4" />

            <VetName label="술자" name={primary?.name ?? '미선택'} />

            <Separator orientation="vertical" className="h-4" />

            <VetName label="마취의" name={anesthesia?.name ?? '미선택'} />

            <Separator orientation="vertical" className="h-4" />

            <VetName label="보조자" name={assistance?.name ?? '미선택'} />
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>담당수의사 변경</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateMainAndSubVet)}
            className="grid grid-cols-6 gap-4"
          >
            <FormField
              control={form.control}
              name="main_vet"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>주치의</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'h-8 text-sm',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <SelectValue placeholder="주치의 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vetsListData.map((vet) => (
                        <SelectItem key={vet.user_id} value={vet.user_id}>
                          <div className="flex items-center gap-2">
                            <UserAvatar alt={vet.name} src={vet.avatar_url} />
                            <span>{vet.name}</span>
                            <span className="text-xs">({vet.position})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="primary"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>술자</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'h-8 text-sm',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <SelectValue placeholder="술자 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        {
                          user_id: 'null',
                          name: '미선택',
                          position: '',
                          avatar_url: '',
                        },
                        ...vetsListData,
                      ].map((vet) => (
                        <SelectItem
                          key={vet.user_id}
                          value={vet.user_id}
                          className="w-full"
                        >
                          <div className="flex items-center gap-2">
                            {vet.avatar_url && (
                              <UserAvatar src={vet.avatar_url} alt={vet.name} />
                            )}

                            <span>{vet.name}</span>
                            {vet.position && (
                              <span className="text-xs">({vet.position})</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="anesthesia"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>마취의</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'h-8 text-sm',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <SelectValue placeholder="마취의 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        {
                          user_id: 'null',
                          name: '미선택',
                          position: '',
                          avatar_url: '',
                        },
                        ...vetsListData,
                      ].map((vet) => (
                        <SelectItem
                          key={vet.user_id}
                          value={vet.user_id}
                          className="w-full"
                        >
                          <div className="flex items-center gap-2">
                            {vet.avatar_url && (
                              <UserAvatar src={vet.avatar_url} alt={vet.name} />
                            )}

                            <span>{vet.name}</span>
                            {vet.position && (
                              <span className="text-xs">({vet.position})</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assistance"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>보조자</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'h-8 text-sm',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <SelectValue placeholder="보조자 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        {
                          user_id: 'null',
                          name: '미선택',
                          position: '',
                          avatar_url: '',
                        },
                        ...vetsListData,
                      ].map((vet) => (
                        <SelectItem
                          key={vet.user_id}
                          value={vet.user_id}
                          className="w-full"
                        >
                          <div className="flex items-center gap-2">
                            {vet.avatar_url && (
                              <UserAvatar src={vet.avatar_url} alt={vet.name} />
                            )}

                            <span>{vet.name}</span>
                            {vet.position && (
                              <span className="text-xs">({vet.position})</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className={cn('col-span-6 ml-auto flex gap-2 font-semibold')}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(false)}
              >
                취소
              </Button>

              <SubmitButton buttonText="수정" isPending={isUpdating} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
