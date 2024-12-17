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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils/utils'
import { RawDrug } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { drugSchema } from './drug-form-schema'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

export function DrugForm({ rawDrugData }: { rawDrugData: RawDrug[] }) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof drugSchema>>({
    resolver: zodResolver(drugSchema),
    defaultValues: {
      hos_drug_description: '',
      hos_drug_indication: '',
      hos_drug_side_effect: '',
      hos_drug_tags: '',
    },
  })

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
        <FormField
          control={form.control}
          name="raw_drug_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>약물 원료명*</FormLabel>
              <Popover open={comboboxOpen} onOpenChange={setComboboxOpen} modal>
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
