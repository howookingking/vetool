'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
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
  FormDescription,
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
import { cn } from '@/lib/utils/utils'
import { RawDrug } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { drugSchema } from './drug-form-schema'

export function DrugForm({ rawDrugData }: { rawDrugData: RawDrug[] }) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof drugSchema>>({
    resolver: zodResolver(drugSchema),
    defaultValues: {
      hos_drug_dosages: {
        unit: 'ml',
        bw_unit: 'kg',
        dose_unit: 'mg/kg',
        mg_per_ml: 0,
        dosages: [
          {
            species: '',
            max: 0,
            min: 0,
            default: 0,
          },
        ],
      },
      hos_drug_description: '',
      hos_drug_indication: '',
      hos_drug_side_effect: '',
      hos_drug_tags: '',
      hos_drug_name: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'hos_drug_dosages.dosages',
  })

  const SPECIES_OPTIONS = [
    { value: 'both', label: 'Both' },
    { value: 'canine', label: 'Canine' },
    { value: 'feline', label: 'Feline' },
  ] as const

  const availableSpecies = useMemo(() => {
    const selectedSpecies = fields.map((field) =>
      form.getValues(
        `hos_drug_dosages.dosages.${fields.indexOf(field)}.species`,
      ),
    )

    return SPECIES_OPTIONS.filter(
      (option) => !selectedSpecies.includes(option.value),
    )
  }, [fields, form.getValues])

  function onSubmit(values: z.infer<typeof drugSchema>) {
    console.log(values)
  }
  const [comboboxOpen, setComboboxOpen] = useState(false)

  const handleSearchInput = () => {
    // Access the ScrollArea's viewport div and scroll it to top
    const viewport = scrollAreaRef.current?.querySelector(
      '[data-radix-scroll-area-viewport]',
    )
    if (viewport) {
      viewport.scrollTop = 0
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="relative grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="raw_drug_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>약물 원료명*</FormLabel>
                <Popover
                  open={comboboxOpen}
                  onOpenChange={setComboboxOpen}
                  modal
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[400px] justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? rawDrugData.find(
                              (rawDrug) =>
                                rawDrug.raw_drug_id.toLocaleLowerCase() ===
                                field.value.toLocaleLowerCase(),
                            )?.raw_drug_name
                          : '약물 원료를 선택해주세요'}
                        <ChevronsUpDown className="opacity-50" />
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
                        placeholder="약물 원료명 검색"
                        className="h-9"
                        onValueChange={handleSearchInput}
                      />
                      <CommandList>
                        <ScrollArea
                          className="h-60"
                          ref={scrollAreaRef}
                          type="always"
                        >
                          <CommandEmpty>
                            <NoResultSquirrel
                              className="h-40 flex-col text-muted-foreground"
                              size="sm"
                              text={
                                <div>
                                  등록되지 않은 약물원료명입니다 <br /> 벳툴에
                                  문의해주세요
                                </div>
                              }
                            />
                          </CommandEmpty>

                          <CommandGroup>
                            {rawDrugData.map((rawDrug) => (
                              <CommandItem
                                value={rawDrug.raw_drug_name}
                                key={rawDrug.raw_drug_id}
                                onSelect={() => {
                                  form.setValue(
                                    'raw_drug_id',
                                    rawDrug.raw_drug_id,
                                  )
                                  setComboboxOpen(false)
                                }}
                              >
                                {rawDrug.raw_drug_name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    rawDrug.raw_drug_id === field.value
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
                <FormDescription>
                  등록되어 있지 않은 약물원료는 벳툴에게 문의해주세요
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hos_drug_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>약물명*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 약물 용량 */}
        <FormField
          control={form.control}
          name="hos_drug_dosages"
          render={() => (
            <FormItem>
              <FormLabel>약물 용량 설정*</FormLabel>
              <FormControl>
                <div className="space-y-8">
                  {/* 1. mg/ml */}
                  <div className="grid grid-cols-9 gap-4">
                    <div className="relative col-span-2">
                      <FormField
                        control={form.control}
                        name={`hos_drug_dosages.mg_per_ml`}
                        render={({ field }) => (
                          <FormItem>
                            <div>
                              <FormLabel>mg/ml</FormLabel>
                            </div>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>

                            <FormMessage className="absolute" />
                          </FormItem>
                        )}
                      />
                      <span className="absolute right-2 top-[42px] text-xs text-muted-foreground">
                        mg
                      </span>
                    </div>
                  </div>

                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-9 items-end gap-4"
                    >
                      {/* 종 선택 */}
                      <div className="col-span-2 space-y-2">
                        <FormField
                          control={form.control}
                          name={`hos_drug_dosages.dosages.${index}.species`}
                          render={({ field }) => (
                            <FormItem>
                              <div>
                                <FormLabel>종</FormLabel>
                              </div>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="종 선택" />
                                  </SelectTrigger>

                                  <SelectContent>
                                    {SPECIES_OPTIONS.filter(
                                      (option) =>
                                        availableSpecies.some(
                                          (species) =>
                                            species.value === option.value,
                                        ) || option.value === field.value,
                                    ).map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>

                              <FormMessage className="absolute" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* 기본 용량 선택 */}
                      <div className="relative col-span-2 space-y-2">
                        <FormField
                          control={form.control}
                          name={`hos_drug_dosages.dosages.${index}.default`}
                          render={({ field }) => (
                            <FormItem>
                              <div>
                                <FormLabel>기본 용량</FormLabel>
                              </div>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>

                              <FormMessage className="absolute" />
                            </FormItem>
                          )}
                        />
                        <span className="absolute right-2 top-9 text-xs text-muted-foreground">
                          ml
                        </span>
                      </div>

                      {/* 최소 용량 선택 */}
                      <div className="relative col-span-2 space-y-2">
                        <FormField
                          control={form.control}
                          name={`hos_drug_dosages.dosages.${index}.min`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>최소</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage className="absolute" />
                            </FormItem>
                          )}
                        />
                        <span className="absolute right-2 top-9 text-xs text-muted-foreground">
                          ml
                        </span>
                      </div>

                      {/* 최대 용량 선택 */}
                      <div className="relative col-span-2 space-y-2">
                        <FormField
                          control={form.control}
                          name={`hos_drug_dosages.dosages.${index}.max`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>최대</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage className="absolute" />
                            </FormItem>
                          )}
                        />
                        <span className="absolute right-2 top-9 text-xs text-muted-foreground">
                          ml
                        </span>
                      </div>

                      <div className="col-span-1 mt-2 flex justify-start">
                        {fields.length < 2 ? (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              append({
                                species: '',
                                max: 0,
                                min: 0,
                                default: 0,
                              })
                            }
                          >
                            <Plus size={16} className="mr-2" /> 추가
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => remove(index)}
                          >
                            <Trash2 size={16} className="mr-2" /> 삭제
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4 pt-4">
          <FormField
            control={form.control}
            name="hos_drug_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description 약물 설명 </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hos_drug_indication"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indication 용법</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="hos_drug_side_effect"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Side Effect 부작용</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hos_drug_tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>약물 태그 (검색시 사용)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="#파모티딘#가스터#파모#위장관계"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
