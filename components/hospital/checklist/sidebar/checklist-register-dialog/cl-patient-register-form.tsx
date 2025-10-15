'use no memo'

import HelperTooltip from '@/components/common/helper-tooltip'
import InputSuffix from '@/components/common/input-suffix'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import BirthDatePicker from '@/components/common/patients/form/birth-date-picker'
import RequiredFieldDot from '@/components/common/requied-field-dot'
import SubmitButton from '@/components/common/submit-button'
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
import { ChecklistPatient } from '@/lib/services/checklist/checklist-data'
import { registerChecklist } from '@/lib/services/checklist/register-checklist-patient'
import {
  insertPatient,
  isHosPatientIdDuplicated,
  updatePatientFromChecklist,
} from '@/lib/services/patient/patient'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { MessageCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

type Props =
  | {
      hosId: string
      targetDate: string
      setIsDialogOpen: Dispatch<SetStateAction<boolean>>
      isEdit: true
      patient: ChecklistPatient
    }
  | {
      hosId: string
      targetDate: string
      setIsDialogOpen: Dispatch<SetStateAction<boolean>>
      isEdit?: false
      patient?: ChecklistPatient
    }

export default function ClPatientRegisterForm({
  hosId,
  targetDate,
  setIsDialogOpen,
  isEdit,
  patient,
}: Props) {
  const { push, refresh } = useRouter()

  const [breedOpen, setBreedOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof registerPatientFormSchema>>({
    resolver: zodResolver(
      registerPatientFormSchema.refine(
        async (data) => {
          if (isEdit && data.hos_patient_id === patient.hos_patient_id) {
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
          name: patient.name,
          hos_patient_id: patient.hos_patient_id,
          species: patient.species,
          breed: patient.breed ?? '',
          gender: patient.gender,
          birth: new Date(patient.birth),
          microchip_no: patient.microchip_no ?? '',
          memo: patient.memo ?? '',
          weight: patient.body_weight ?? '',
          owner_name: patient.owner_name ?? '',
          hos_owner_id: patient.hos_owner_id ?? '',
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
        },
  })

  const watchSpecies = form.watch('species')
  const watchBreed = form.watch('breed')
  const BREEDS = watchSpecies === 'canine' ? CANINE_BREEDS : FELINE_BREEDS

  useEffect(() => {
    if (watchBreed) {
      setBreedOpen(false)
    }
    form.setValue('weight', patient?.body_weight ?? '')
  }, [watchBreed, form, patient?.body_weight])

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

    push(
      `/hospital/${hosId}/checklist/${targetDate}/chart/${returningChecklistId}/checklist`,
    )

    setIsSubmitting(false)

    setIsDialogOpen(false)

    toast.success('신규 환자 등록 및 체크리스트 등록 완료')
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
      weight,
    } = values

    const isWeightChanged = weight !== patient!.body_weight

    setIsSubmitting(true)

    await updatePatientFromChecklist(
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
      patient!.patient_id,
      isWeightChanged!,
    )

    toast.success('환자 정보를 수정하였습니다')

    setIsSubmitting(false)

    setIsDialogOpen(false)

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
                <HelperTooltip side="right">
                  메인차트에 등록되어있는 환자번호
                </HelperTooltip>
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
                      <CaretSortIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
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
          birth={isEdit ? new Date(patient?.birth!) : new Date()}
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
                {patient?.weight_measured_date && (
                  <span className="ml-0.5 text-xs text-muted-foreground">
                    ({patient?.weight_measured_date} 측정)
                  </span>
                )}
              </FormLabel>

              <div className="relative">
                <FormControl>
                  <Input {...field} className="h-8" />
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
              disabled={isSubmitting}
              variant="outline"
              size="sm"
              onClick={() => setIsDialogOpen(false)}
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
