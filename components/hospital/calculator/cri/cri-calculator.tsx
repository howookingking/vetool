'use no memo'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { calculateCri } from '@/lib/calculators/cri'
import {
  criFormSchema,
  type CriFormValues,
} from '@/lib/schemas/calculator/cri-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CriResult from './cri-result'

type CriCalculatorProps = {
  weight: string
  drug: string
}

export default function CriCalculator({ weight, drug }: CriCalculatorProps) {
  const isBicarbonate = drug === 'Bicarbonate'

  const [criResults, setCriResults] = useState({
    fluidVol: 0, // {fluidVol} ml 수액에 ...
    additiveVol: 0, // {additiveVol} ml를 넣고 {criSpeed} ml/hr 속도로 투여
  })

  const form = useForm<CriFormValues>({
    resolver: zodResolver(criFormSchema),
    defaultValues: {
      dose: 1, // 약물 용량
      fluidMassVol: 30, // 수액 총량
      weight: Number(weight), // 환자 체중
      criSpeed: 2, // CRI 속도
    },
  })

  const bodyWeight = form.watch('weight')
  const dose = form.watch('dose')
  const fluidMassVol = form.watch('fluidMassVol')
  const criSpeed = form.watch('criSpeed')

  useEffect(() => {
    const { fluidVol, additiveVol } = calculateCri(
      Number(bodyWeight),
      dose,
      fluidMassVol,
      criSpeed,
      drug,
    )

    setCriResults({ fluidVol, additiveVol })
  }, [bodyWeight, dose, fluidMassVol, criSpeed, drug])

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-2 p-1">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>체중 (kg)</FormLabel>
              <FormControl>
                <Input
                  placeholder="체중을 입력하세요"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isBicarbonate ? 'BE' : drug}</FormLabel>
              <FormControl>
                <Input
                  placeholder="약물 용량을 입력하세요"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fluidMassVol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>수액 총량 (ml)</FormLabel>
              <FormControl>
                <Input
                  placeholder="수액 총량을 입력하세요"
                  type="number"
                  disabled={isBicarbonate}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="criSpeed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CRI 속도</FormLabel>
              <FormControl>
                <Input
                  placeholder="CRI 속도를 입력하세요"
                  type="number"
                  disabled={isBicarbonate}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>

      {criResults.fluidVol > 0 && criResults.additiveVol > 0 && (
        <CriResult
          fluidVol={criResults.fluidVol}
          additiveVol={criResults.additiveVol}
          criSpeed={criSpeed}
          drug={drug}
        />
      )}
    </Form>
  )
}
