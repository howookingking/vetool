'use client'
'use no memo'

import IcuSettingsCard from '@/components/hospital/admin/icu-settings/icu-settings-card'
import {
  hosDrugFormSchema,
  type HosDrugFormSchema,
} from '@/lib/schemas/admin/admin-schema'
import { type RawDrugs } from '@/types/adimin'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AutoComplete } from '@/components/ui/auto-complete'
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
import { toast } from '@/components/ui/use-toast'
import { upsertHosDrugData } from '@/lib/services/admin/drug/drug'

type Props = {
  rawDrugs: RawDrugs[]
  hosId: string
}

export default function HosDrugSetting({ rawDrugs, hosId }: Props) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [rawDrugInputValue, setRawDrugInputValue] = useState('')
  const [selectedRawDrug, setSelectedRawDrug] = useState<string>('')

  const form = useForm<HosDrugFormSchema>({
    resolver: zodResolver(hosDrugFormSchema),
    defaultValues: {
      raw_drug_id: '',
      hos_drug_name: '',
      hos_drug_route: '',
      mg_per_kg: 0,
      ml_per_kg: 0,
    },
  })

  const handleSubmit = async (values: HosDrugFormSchema) => {
    setIsUpdating(true)

    await upsertHosDrugData(values, selectedRawDrug, hosId)

    toast({
      title: '선호 약물 설정이 완료되었습니다.',
    })

    setIsUpdating(false)
  }

  const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value === '') return ''

    const parsedValue = parseFloat(parseFloat(value).toFixed(2))

    return isNaN(parsedValue) ? '' : parsedValue
  }

  const handleSelectedRawDrugChange = (value: string) => {
    setSelectedRawDrug(value)
  }

  return (
    <IcuSettingsCard
      title="선호 약물 설정"
      description="주사 오더 생성에 사용되는 선호 약물을 설정합니다."
      isUpdating={isUpdating}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="raw_drug_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>약물 원료명</FormLabel>
                <FormControl>
                  <AutoComplete
                    items={rawDrugs.map((drug) => ({
                      value: drug.raw_drug_id,
                      label: drug.raw_drug_name,
                    }))}
                    selectedValue={selectedRawDrug}
                    onSelectedValueChange={handleSelectedRawDrugChange}
                    searchValue={rawDrugInputValue}
                    onSearchValueChange={setRawDrugInputValue}
                    placeholder="약물 원료명을 검색하세요"
                    emptyMessage="검색 결과가 없습니다"
                    noBracket
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hos_drug_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>자주 사용하는 약물명</FormLabel>
                <FormControl>
                  <Input placeholder="약물 이름을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hos_drug_route"
            render={({ field }) => (
              <FormItem>
                <FormLabel>투여 경로</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="투여 경로를 선택하세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="IV">IV</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="IM">IM</SelectItem>
                    <SelectItem value="ID">ID</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mg_per_kg"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="mg_per_kg">mg/kg</FormLabel>
                <FormControl>
                  <Input
                    id="mg_per_kg"
                    type="number"
                    step="0.01"
                    placeholder="mg/kg 값을 입력하세요"
                    {...field}
                    value={field.value === undefined ? '' : field.value}
                    onChange={(e) => {
                      const value = handleNumberInputChange(e)
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ml_per_kg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ml/kg</FormLabel>
                <FormControl>
                  <Input
                    id="ml_per_kg"
                    type="number"
                    step="0.01"
                    placeholder="ml/kg 값을 입력하세요"
                    {...field}
                    value={field.value === undefined ? '' : field.value}
                    onChange={(e) => {
                      const value = handleNumberInputChange(e)
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </IcuSettingsCard>
  )
}
