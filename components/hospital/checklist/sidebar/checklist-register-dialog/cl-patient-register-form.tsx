'use no memo'

import HelperTooltip from '@/components/common/helper-tooltip'
import BirthDatePicker from '@/components/common/patients/form/birth-date-picker'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import {
  CANINE_BREEDS,
  FELINE_BREEDS,
  SEX,
} from '@/constants/hospital/register/breed'
import { registerPatientFormSchema } from '@/lib/schemas/patient/patient-schema'
import { registerChecklist } from '@/lib/services/checklist/register-checklist-patient'
import {
  insertPatient,
  isHosPatientIdDuplicated,
} from '@/lib/services/patient/patient'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { LoaderCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import * as z from 'zod'

type Props = {
  hosId: string
  targetDate: string
  setIsPatientRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function ClPatientRegisterForm({
  hosId,
  targetDate,
  setIsPatientRegisterDialogOpen,
}: Props) {
  const { push } = useRouter()

  const [breedOpen, setBreedOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDuplicatedId, setIsDuplicatedId] = useState(false)

  const form = useForm<z.infer<typeof registerPatientFormSchema>>({
    resolver: zodResolver(
      registerPatientFormSchema.refine(
        async (data) => {
          const isDuplicate = await isHosPatientIdDuplicated(
            data.hos_patient_id,
            hosId,
          )
          return !isDuplicate
        },
        {
          message: '이 환자 번호는 이미 존재합니다',
          path: ['hos_patient_id'],
        },
      ),
    ),

    defaultValues: {
      name: '',
      hos_patient_id: '',
      species: undefined,
      breed: undefined,
      gender: undefined,
      birth: undefined,
      microchip_no: '',
      memo: '',
      weight: '',
      owner_name: '',
      hos_owner_id: '',
    },
  })

  const watchHosPatientId = form.watch('hos_patient_id')
  const watchSpecies = form.watch('species')
  const watchBreed = form.watch('breed')
  const BREEDS = watchSpecies === 'canine' ? CANINE_BREEDS : FELINE_BREEDS

  useEffect(() => {
    if (watchBreed) {
      setBreedOpen(false)
    }
  }, [watchBreed, form])

  const handleRegister = async (
    values: z.infer<typeof registerPatientFormSchema>,
  ) => {
    if (isDuplicatedId) return

    setIsSubmitting(true)

    const {
      birth,
      breed,
      gender,
      hos_owner_id,
      hos_patient_id,
      memo,
      microchip_no,
      name,
      species,
      owner_name,
      weight,
    } = values

    const returningPatientId = await insertPatient(
      {
        birth: format(birth, 'yyyy-MM-dd'),
        breed: breed.split('#')[0],
        gender,
        hos_patient_id,
        memo,
        microchip_no,
        name,
        species,
        owner_name,
        hos_owner_id,
        weight,
      },
      hosId,
    )

    const returningChecklistId = await registerChecklist(
      hosId,
      targetDate,
      returningPatientId,
      format(birth, 'yyyy-MM-dd'),
    )

    toast({
      title: `${name} 생성 및 체크리스트가 등록되었습니다`,
    })

    setIsSubmitting(false)
    setIsPatientRegisterDialogOpen(false)

    push(
      `/hospital/${hosId}/checklist/${targetDate}/chart/${returningChecklistId}/checklist`,
    )
  }

  const handleHosPatientIdInputChange = useDebouncedCallback(async () => {
    if (watchHosPatientId.trim() === '') {
      form.clearErrors('hos_patient_id')
      return
    }

    const result = await isHosPatientIdDuplicated(watchHosPatientId, hosId)
    setIsDuplicatedId(result)

    if (result) {
      form.setError('hos_patient_id', {
        type: 'manual',
        message: '이 환자 번호는 이미 존재합니다',
      })
    } else {
      form.clearErrors('hos_patient_id')
    }
  }, 700)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">
                환자 이름 <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-8 text-sm"
                  autoComplete="off"
                  id="name"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hos_patient_id"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <div className="flex items-center gap-2">
                <FormLabel>
                  환자 번호 <span className="text-destructive">*</span>
                </FormLabel>
                <HelperTooltip>메인차트에 등록되어있는 환자번호</HelperTooltip>
              </div>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(e)
                    handleHosPatientIdInputChange()
                  }}
                  className="h-8 text-sm"
                />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                종 <span className="text-destructive">*</span>
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  form.setValue('breed', '')
                }}
                defaultValue={field.value}
                name="species"
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
                    Canine
                  </SelectItem>
                  <SelectItem value="feline" className="text-xs">
                    Feline
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <FormLabel>
                품종 <span className="text-destructive">*</span>
              </FormLabel>
              <Popover open={breedOpen} onOpenChange={setBreedOpen} modal>
                <PopoverTrigger asChild disabled={!watchSpecies}>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'relative h-8 w-full justify-start overflow-hidden border border-input bg-inherit px-3 text-sm font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <span className="block overflow-hidden text-ellipsis whitespace-nowrap pr-6">
                        {field.value
                          ? `${field.value.split('#')[1]} (${field.value.split('#')[0]})`
                          : watchSpecies
                            ? '품종을 선택해주세요'
                            : '종을 먼저 선택해주세요'}
                      </span>
                      <CaretSortIcon className="absolute right-3 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] p-0"
                  align="start"
                  side="bottom"
                >
                  <Command className="w-full">
                    <CommandInput
                      placeholder="품종 검색"
                      className="h-8 text-xs"
                      name="breed"
                    />
                    <CommandList>
                      <ScrollArea className="h-64">
                        <CommandEmpty>해당 품종 검색 결과 없음.</CommandEmpty>
                        <CommandGroup>
                          {BREEDS.map((breed) => (
                            <CommandItem
                              value={breed.eng + '#' + breed.kor}
                              key={breed.id + breed.eng}
                              onSelect={field.onChange}
                              className="text-xs"
                            >
                              {`${breed.kor} (${breed.eng})`}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  breed.eng === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                성별 <span className="text-destructive">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                name="sex"
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="성별을 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SEX.map((sex) => (
                    <SelectItem
                      id={sex.value}
                      key={sex.value}
                      value={sex.value}
                      className="text-xs"
                    >
                      {sex.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <BirthDatePicker form={form} />

        <FormField
          control={form.control}
          name="microchip_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>마이크로칩 번호</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>몸무게</FormLabel>
              <div className="relative flex">
                <FormControl>
                  <Input {...field} className="h-8 text-sm" />
                </FormControl>
                <span className="absolute right-2 top-2 text-xs">kg</span>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>보호자 이름</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hos_owner_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>보호자 번호</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="memo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>메모</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 flex items-center justify-end gap-2">
          <div className="space-x-2">
            <Button
              tabIndex={-1}
              type="button"
              disabled={isSubmitting}
              variant="outline"
              onClick={() => {
                setIsPatientRegisterDialogOpen!(false)
              }}
            >
              닫기
            </Button>

            <Button disabled={isSubmitting} className="w-14">
              {isSubmitting ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                '확인'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
