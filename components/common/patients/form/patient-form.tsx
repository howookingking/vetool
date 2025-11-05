'use client'
'use no memo'

import HelperTooltip from '@/components/common/helper-tooltip'
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
import {
  CANINE_BREEDS,
  FELINE_BREEDS,
  SEX,
} from '@/constants/hospital/register/breed'
import { registerPatientFormSchema } from '@/lib/schemas/patient/patient-schema'
import { registerIcu } from '@/lib/services/icu/register-icu'
import {
  insertPatient,
  isHosPatientIdDuplicated,
  updatePatientFromIcu,
  updatePatientFromPatientRoute,
} from '@/lib/services/patient/patient'
import { cn } from '@/lib/utils/utils'
import type { Patient } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ChevronDownIcon, MessageCircleIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { DebouncedState } from 'use-debounce'
import * as z from 'zod'
import NoResultSquirrel from '../../no-result-squirrel'
import RequiredFieldDot from '../../requied-field-dot'
import SubmitButton from '../../submit-button'
import BirthDatePicker from './birth-date-picker'
import InputSuffix from '../../input-suffix'

type BaseProps = {
  hosId: string
}

type RegisterFromPatientRoute = BaseProps & {
  mode: 'registerFromPatientRoute'
  setIsPatientRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
  editingPatient?: null
  weight?: null
  weightMeasuredDate?: null
  setIsPatientUpdateDialogOpen?: null
  setIsConfirmDialogOpen?: null
  icuChartId?: null
  setIsEdited?: Dispatch<SetStateAction<boolean>>
  registeringPatient: null
  setRegisteringPatient: null
  debouncedSearch: null
}

type UpdateFromPatientRoute = BaseProps & {
  mode: 'updateFromPatientRoute'
  editingPatient: Patient
  setIsPatientRegisterDialogOpen?: null
  setIsConfirmDialogOpen?: null
  weight: string
  weightMeasuredDate: string
  setIsPatientUpdateDialogOpen: Dispatch<SetStateAction<boolean>>
  icuChartId?: null
  setIsEdited?: Dispatch<SetStateAction<boolean>>
  registeringPatient: null
  setRegisteringPatient: null
  debouncedSearch: DebouncedState<() => Promise<void>>
}

type RegisterFromIcuRoute = BaseProps & {
  mode: 'registerFromIcuRoute'
  setIsPatientRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsConfirmDialogOpen?: (isOpen: boolean) => void
  editingPatient?: null
  weight?: null
  weightMeasuredDate?: null
  setIsPatientUpdateDialogOpen?: null
  icuChartId?: null
  setIsEdited?: Dispatch<SetStateAction<boolean>>
  debouncedSearch: null
}

type UpdateFromIcuRoute = BaseProps & {
  mode: 'updateFromIcuRoute'
  editingPatient: Patient
  setIsPatientRegisterDialogOpen?: null
  setIsConfirmDialogOpen?: null
  weight: string
  weightMeasuredDate: string | null
  setIsPatientUpdateDialogOpen: Dispatch<SetStateAction<boolean>>
  icuChartId: string
  registeringPatient: null
  setRegisteringPatient: null
  debouncedSearch: null
}

type Props =
  | RegisterFromPatientRoute
  | UpdateFromPatientRoute
  | RegisterFromIcuRoute
  | UpdateFromIcuRoute

export default function PatientForm({
  hosId,
  mode,
  setIsPatientRegisterDialogOpen,
  editingPatient,
  weight,
  weightMeasuredDate,
  setIsPatientUpdateDialogOpen,
  icuChartId,
  debouncedSearch,
}: Props) {
  const isEdit =
    mode === 'updateFromPatientRoute' || mode === 'updateFromIcuRoute'

  const { refresh, push } = useRouter()
  const { target_date } = useParams()

  const [breedOpen, setBreedOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  let defaultBreed: string

  if (editingPatient?.species === 'canine') {
    defaultBreed = [
      editingPatient?.breed,
      CANINE_BREEDS.find((breed) => breed.eng === editingPatient?.breed)?.kor,
    ].join('#')
  }
  if (editingPatient?.species === 'feline') {
    defaultBreed = [
      editingPatient?.breed,
      FELINE_BREEDS.find((breed) => breed.eng === editingPatient?.breed)?.kor,
    ].join('#')
  }

  const form = useForm<z.infer<typeof registerPatientFormSchema>>({
    resolver: zodResolver(
      registerPatientFormSchema.refine(
        async (data) => {
          // 수정인 경우 기존 환자 번호와 동일하면 통과
          if (
            isEdit &&
            data.hos_patient_id === editingPatient?.hos_patient_id
          ) {
            return true
          }
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
    defaultValues: isEdit
      ? {
          name: editingPatient?.name,
          hos_patient_id: editingPatient?.hos_patient_id,
          species: editingPatient?.species,
          breed: editingPatient?.breed!,
          gender: editingPatient?.gender,
          birth: new Date(editingPatient?.birth!),
          microchip_no: editingPatient?.microchip_no ?? '',
          memo: editingPatient?.memo ?? '',
          weight: weight,
          owner_name: editingPatient?.owner_name ?? '',
          hos_owner_id: editingPatient?.hos_owner_id ?? '',
          // is_alive: editingPatient?.is_alive ?? true,
        }
      : {
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
          // is_alive: true,
        },
  })

  const watchSpecies = form.watch('species')
  const watchBreed = form.watch('breed')
  const BREEDS = watchSpecies === 'canine' ? CANINE_BREEDS : FELINE_BREEDS

  useEffect(() => {
    if (watchBreed) {
      setBreedOpen(false)
    }
    form.setValue('weight', weight ?? '')
  }, [watchBreed, weight, form])

  const handleRegister = async (
    values: z.infer<typeof registerPatientFormSchema>,
  ) => {
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

    const patientId = await insertPatient(
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

    // icu에서 등록했다면 그냥 바로 입원시키고 route 등록환자로 전환
    if (mode === 'registerFromIcuRoute') {
      await registerIcu(
        hosId,
        patientId,
        birth.toString(),
        target_date as string,
      )

      push(`/hospital/${hosId}/icu/${target_date}/chart/${patientId}`)

      setIsSubmitting(false)

      setIsPatientRegisterDialogOpen(false)

      toast.success('신규 환자 등록 및 입원 완료')

      return
    }
    setIsSubmitting(false)

    setIsPatientRegisterDialogOpen!(false)

    refresh()

    toast.success('환자를 등록했습니다')
  }

  const handleUpdate = async (
    values: z.infer<typeof registerPatientFormSchema>,
  ) => {
    const {
      birth,
      breed,
      gender,
      hos_owner_id,
      hos_patient_id,
      memo,
      microchip_no,
      name,
      owner_name,
      species,
      weight: weightInput,
    } = values
    const isWeightChanged = weightInput !== weight

    setIsSubmitting(true)

    if (mode === 'updateFromPatientRoute') {
      await updatePatientFromPatientRoute(
        {
          birth: format(birth, 'yyyy-MM-dd'),
          breed: breed.split('#')[0],
          gender,
          hos_owner_id,
          hos_patient_id,
          memo,
          microchip_no,
          name,
          owner_name,
          species,
          weight: weightInput,
        },
        editingPatient?.patient_id!,
        isWeightChanged,
      )
      debouncedSearch()
    }

    if (mode === 'updateFromIcuRoute') {
      await updatePatientFromIcu(
        {
          birth: format(birth, 'yyyy-MM-dd'),
          breed: breed.split('#')[0],
          gender,
          hos_owner_id,
          hos_patient_id,
          memo,
          microchip_no,
          name,
          owner_name,
          species,
          weight: weightInput,
        },
        editingPatient?.patient_id!,
        icuChartId,
        format(new Date(), 'yyyy-MM-dd'),
        isWeightChanged,
      )
    }

    toast.success('환자 정보가 수정되었습니다')

    // if (setIsEdited) setIsEdited(true)
    setIsSubmitting(false)
    setIsPatientUpdateDialogOpen!(false)
    refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(isEdit ? handleUpdate : handleRegister)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">
                환자 이름 <RequiredFieldDot />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-8"
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
                  환자 번호 <RequiredFieldDot />
                </FormLabel>
                <HelperTooltip side="right">메인차트 환자번호</HelperTooltip>
              </div>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ''}
                  onChange={field.onChange}
                  className="h-8"
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
                종 <RequiredFieldDot />
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
                      'h-8',
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
              <div className="flex items-center gap-2">
                <FormLabel>
                  품종
                  <RequiredFieldDot />
                </FormLabel>
                <HelperTooltip side="right">
                  <div className="flex items-center">
                    품종이 없을 경우 &apos;기타종&apos;으로 등록 후 피드백
                    <MessageCircleIcon size={12} className="mx-1" />
                    부탁드립니다
                  </div>
                </HelperTooltip>
              </div>
              <Popover open={breedOpen} onOpenChange={setBreedOpen} modal>
                <PopoverTrigger asChild disabled={!watchSpecies}>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'relative h-8 w-full justify-start pl-3 font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? `${field.value.split('#')[0]}`
                        : watchSpecies
                          ? '품종 선택'
                          : '종 선택'}
                      <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] p-0"
                  align="start"
                  side="bottom"
                >
                  <Command>
                    <CommandInput
                      placeholder="품종 검색"
                      className="h-8 text-xs"
                      name="breed"
                    />
                    <CommandList>
                      <ScrollArea className="h-64">
                        <CommandEmpty>
                          <NoResultSquirrel
                            text="품종 검색 결과 없음"
                            size="sm"
                            className="flex-col pt-16 text-muted-foreground"
                          />
                        </CommandEmpty>

                        <CommandGroup>
                          {BREEDS.map((breed) => (
                            <CommandItem
                              value={breed.eng + '#' + breed.kor}
                              key={breed.id + breed.eng}
                              onSelect={field.onChange}
                              className="text-xs"
                            >
                              {`${breed.kor} (${breed.eng})`}
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
                성별 <RequiredFieldDot />
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                name="sex"
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="성별 선택" />
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

        <BirthDatePicker
          form={form}
          birth={isEdit ? new Date(editingPatient?.birth) : new Date()}
        />

        <FormField
          control={form.control}
          name="microchip_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>마이크로칩 번호</FormLabel>
              <FormControl>
                <Input {...field} className="h-8" />
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
              <FormLabel>
                몸무게
                {weightMeasuredDate && (
                  <span className="ml-0.5 text-xs text-muted-foreground">
                    ({weightMeasuredDate} 측정)
                  </span>
                )}
              </FormLabel>

              <div className="relative">
                <FormControl>
                  <Input {...field} className="h-8 text-sm" />
                </FormControl>
                <InputSuffix text="kg" />
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
                <Input {...field} className="h-8" />
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
                <Input {...field} className="h-8" />
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
              size="sm"
              disabled={isSubmitting}
              variant="outline"
              onClick={() => {
                isEdit
                  ? setIsPatientUpdateDialogOpen(false)
                  : setIsPatientRegisterDialogOpen!(false)
              }}
            >
              닫기
            </Button>

            <SubmitButton
              buttonText={isEdit ? '수정' : '등록'}
              isPending={isSubmitting}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
