'use client'

import Autocomplete from '@/components/common/auto-complete/auto-complete'
import { registerIcuPatientFormSchema } from '@/components/hospital/icu/header/register-dialog/register-icu/icu-schema'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { registerIcuPatient } from '@/lib/services/icu/register-icu-patient'
import { useIcuRegisterStore } from '@/lib/store/icu/icu-register'
import { changeTargetDateInUrl, cn } from '@/lib/utils/utils'
import type { Vet } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon, LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function RegisterIcuForm({
  hosId,
  groupList,
  vetsData,
  tab,
  handleCloseDialog,
}: {
  hosId: string
  groupList: string[]
  vetsData: Vet[]
  tab: string
  handleCloseDialog: () => void
}) {
  const path = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { target_date } = useParams()
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(target_date as string),
    to: undefined,
  })

  const { push } = useRouter()
  const { setStep, registeringPatient } = useIcuRegisterStore()

  const form = useForm<z.infer<typeof registerIcuPatientFormSchema>>({
    resolver: zodResolver(registerIcuPatientFormSchema),
    defaultValues: {
      dx: undefined,
      cc: undefined,
      in_date: range?.from,
      out_due_date: range?.to,
      main_vet: vetsData[0].user_id,
      sub_vet: undefined,
      group_list: [groupList[0]],
    },
  })

  useEffect(() => {
    if (range && range.from && range.to) {
      form.setValue('in_date', range.from)
      form.setValue('out_due_date', range.to)
    }
  }, [form, range])

  const handleSubmit = async (
    values: z.infer<typeof registerIcuPatientFormSchema>,
  ) => {
    const { dx, cc, in_date, out_due_date, main_vet, sub_vet, group_list } =
      values
    if (
      confirm(
        `${registeringPatient?.patientName} 환자를 "${format(in_date, 'yyyy-MM-dd')}"에 입원시키겠습니까?`,
      )
    ) {
      setIsSubmitting(true)

      await registerIcuPatient(
        hosId,
        registeringPatient!.patientId,
        registeringPatient!.birth,
        dx,
        cc,
        format(in_date, 'yyyy-MM-dd'),
        out_due_date ? format(out_due_date, 'yyyy-MM-dd') : '',
        group_list,
        main_vet,
        sub_vet,
      )

      toast({
        title: '입원 환자가 등록되었습니다',
      })
      handleCloseDialog()
      setIsSubmitting(false)

      const splittedPath = path.split('/')
      if (splittedPath[6]) {
        splittedPath[splittedPath.length - 1] = registeringPatient!.patientId
      } else {
        splittedPath[5] = 'chart'
        splittedPath.push(registeringPatient!.patientId)
      }

      const newPatientPath = splittedPath.join('/')

      const newPath = changeTargetDateInUrl(
        newPatientPath,
        format(in_date, 'yyyy-MM-dd'),
      )

      push(newPath)
    }
  }

  const handlePreviousButtonClick = () => {
    if (tab === 'search') {
      setStep('patientSearch')
      return
    }
    if (tab === 'register') {
      setStep('patientRegister')
      return
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="dx"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="DX">진단명 DX*</FormLabel>
              <FormControl className="w-full">
                <Autocomplete
                  defaultValue={field.value || ''}
                  handleUpdate={(value) => field.onChange(value)}
                  label="DX"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cc"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="CC">주증상 CC*</FormLabel>
              <FormControl>
                <Autocomplete
                  defaultValue={field.value || ''}
                  handleUpdate={(value) => field.onChange(value)}
                  label="CC"
                />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="in_date"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>입원일 ~ 퇴원 예정일 선택*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'h-8 overflow-hidden border border-input bg-inherit pl-3 text-left text-sm font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {range && range.from ? (
                        <>{`${format(range.from, 'yyyy-MM-dd')} ~ ${range.to ? format(range.to, 'yyyy-MM-dd') : '미정'}`}</>
                      ) : (
                        <span className="overflow-hidden whitespace-nowrap">
                          입원일을 선택해주세요
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    locale={ko}
                    numberOfMonths={2}
                    disabled={(date) => date < new Date('1990-01-01')}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="group_list"
          render={() => (
            <FormItem>
              <p className="text-sm font-medium">그룹*</p>
              <div className="flex flex-wrap items-center gap-2">
                {groupList.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="group_list"
                    render={({ field }) => {
                      return (
                        <FormItem key={item} className="flex items-end gap-1">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item,
                                      ),
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="main_vet"
          render={({ field }) => (
            <FormItem>
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
                  {vetsData.map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.user_id}
                      id={vet.user_id}
                    >
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
            <FormItem>
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
                  {vetsData.map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.user_id}
                      id={vet.user_id}
                    >
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
                        <span className="text-xs">
                          ({vet.position ?? '미분류'})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="col-span-2 mt-24 flex justify-end gap-2 font-semibold">
          <Button
            type="button"
            variant="outline"
            tabIndex={-1}
            onClick={handlePreviousButtonClick}
          >
            이전
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            확인
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>

          <AlertDialog>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>입원 등록</AlertDialogTitle>
                <AlertDialogDescription>
                  {format(range?.from ?? new Date(), 'yyyy-MM-dd')} 날짜로
                  입원하시겠습니까?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit" disabled={isSubmitting}>
                  확인
                  <LoaderCircle
                    className={cn(
                      isSubmitting ? 'ml-2 animate-spin' : 'hidden',
                    )}
                  />
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </Form>
  )
}
