'use client'

import DialogFooterButtons from '@/components/common/dialog-footer-buttons'
import { vetsFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/vets/vets-schema'
import { Button } from '@/components/ui/button'
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
import { toast } from '@/components/ui/use-toast'
import { updateMainSubVet } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { Json } from '@/lib/supabase/database.types'
import { cn } from '@/lib/utils/utils'
import { IcuChartsInCharge } from '@/types/adimin'
import type { MainAndSubVet, Vet } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function VetsUpdateForm({
  mainVet,
  subVet,
  vetsList,
  icuChartId,
  setIsDialogOpen,
  inCharge,
}: {
  mainVet: MainAndSubVet
  subVet: MainAndSubVet | null
  vetsList: Vet[]
  icuChartId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  inCharge: Json | null
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { today, tomorrow } = (inCharge as IcuChartsInCharge) || {}

  const handleUpdateMainAndSubVet = async (
    values: z.infer<typeof vetsFormSchema>,
  ) => {
    setIsUpdating(true)

    const inCharge = {
      today: {
        all: values.today_vet ?? '',
        am: values.today_am_vet ?? '',
        pm: values.today_pm_vet ?? '',
      },
      tomorrow: {
        all: values.tommorow_vet ?? '',
        am: values.tommorow_am_vet ?? '',
        pm: values.tommorow_pm_vet ?? '',
      },
    }

    await updateMainSubVet(
      icuChartId,
      values.main_vet,
      inCharge,
      values.sub_vet,
    )

    toast({
      title: '담당의를 변경하였습니다',
    })

    setIsUpdating(false)
    setIsDialogOpen(false)
  }

  const form = useForm<z.infer<typeof vetsFormSchema>>({
    resolver: zodResolver(vetsFormSchema),
    defaultValues: {
      main_vet: mainVet.user_id,
      sub_vet: subVet?.user_id ?? 'null',
      today_vet: today ? today.all : '미선택',
      today_am_vet: today ? today.am : '미선택',
      today_pm_vet: today ? today.pm : '미선택',
      tommorow_vet: tomorrow ? tomorrow.all : '미선택',
      tommorow_am_vet: tomorrow ? tomorrow.am : '미선택',
      tommorow_pm_vet: tomorrow ? tomorrow.pm : '미선택',
    },
  })

  return (
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
              <FormLabel>주치의*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vetsList.map((vet) => (
                    <SelectItem key={vet.user_id} value={vet.user_id}>
                      <div className="flex items-center gap-2">
                        <Image
                          unoptimized
                          src={vet.avatar_url ?? ''}
                          alt={vet.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
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
          name="sub_vet"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>부주치의</FormLabel>
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
                    <SelectValue placeholder="부주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    ...vetsList,
                    {
                      user_id: 'null',
                      name: '미선택',
                      position: '',
                      avatar_url: '',
                    },
                  ].map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.user_id}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <Image
                            unoptimized
                            src={vet.avatar_url ?? ''}
                            alt={vet.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
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
          name="today_vet"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>당일 담당자</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    ...vetsList,
                    {
                      user_id: 'null',
                      name: '미선택',
                      position: '',
                      avatar_url: '',
                    },
                  ].map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.name}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <Image
                            unoptimized
                            src={vet.avatar_url ?? ''}
                            alt={vet.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
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
          name="today_am_vet"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>당일 오전 담당자</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    ...vetsList,
                    {
                      user_id: 'null',
                      name: '미선택',
                      position: '',
                      avatar_url: '',
                    },
                  ].map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.name}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <Image
                            unoptimized
                            src={vet.avatar_url ?? ''}
                            alt={vet.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
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
          name="today_pm_vet"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>당일 오후 담당자</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    ...vetsList,
                    {
                      user_id: 'null',
                      name: '미선택',
                      position: '',
                      avatar_url: '',
                    },
                  ].map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.name}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <Image
                            unoptimized
                            src={vet.avatar_url ?? ''}
                            alt={vet.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
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
          name="tommorow_vet"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>익일 담당자</FormLabel>
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
                    <SelectValue placeholder="부주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    ...vetsList,
                    {
                      user_id: 'null',
                      name: '미선택',
                      position: '',
                      avatar_url: '',
                    },
                  ].map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.name}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <Image
                            unoptimized
                            src={vet.avatar_url ?? ''}
                            alt={vet.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
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
          name="tommorow_am_vet"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>익일 오전 담당자</FormLabel>
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
                    <SelectValue placeholder="부주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    ...vetsList,
                    {
                      user_id: 'null',
                      name: '미선택',
                      position: '',
                      avatar_url: '',
                    },
                  ].map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.name}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <Image
                            unoptimized
                            src={vet.avatar_url ?? ''}
                            alt={vet.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
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
          name="tommorow_pm_vet"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>익일 오후 담당자</FormLabel>
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
                    <SelectValue placeholder="부주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    ...vetsList,
                    {
                      user_id: 'null',
                      name: '미선택',
                      position: '',
                      avatar_url: '',
                    },
                  ].map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.name}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <Image
                            unoptimized
                            src={vet.avatar_url ?? ''}
                            alt={vet.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
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

        <div className="col-span-6 ml-auto font-semibold">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
          >
            취소
          </Button>

          <Button type="submit" className="ml-2" disabled={isUpdating}>
            변경
            <LoaderCircle
              className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}
