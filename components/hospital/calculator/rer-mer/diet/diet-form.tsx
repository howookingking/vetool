'use client'

import DietComboBox from '@/components/hospital/calculator/rer-mer/diet/diet-combo-box'
import DietFeedPerDayInput from '@/components/hospital/calculator/rer-mer/diet/diet-feed-per-day-input'
import CalculatorResult from '@/components/hospital/calculator/result/calculator-result'
import { cacluateFeedAmount } from '@/lib/calculators/rer-mer'
import { getDiets } from '@/lib/services/icu/chart/get-diets'
import { type Diet } from '@/types/hospital/calculator'
import { useEffect, useState } from 'react'

export default function DietForm({ mer }: { mer?: number }) {
  const [diets, setDiets] = useState<Diet[]>([])
  const [selectedDiet, setSelectedDiet] = useState<string>('')
  const [feedPerDay, setFeedPerDay] = useState('2')

  useEffect(() => {
    getDiets().then(setDiets)
  }, [])

  const mappedDietList = diets.map((diet) => ({
    value: diet.name,
    label: diet.name,
  }))

  const massVol = diets.find((diet) => diet.name === selectedDiet)?.mass_vol
  const unit = diets.find((diet) => diet.name === selectedDiet)?.unit || 'g'

  const result = cacluateFeedAmount(mer, massVol, Number(feedPerDay))

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-2 grid grid-cols-2 gap-2">
        <DietComboBox
          mappedDietList={mappedDietList}
          selectedDiet={selectedDiet}
          setSelectedDiet={setSelectedDiet}
          disabled={!mer}
        />

        <DietFeedPerDayInput
          feedPerDay={feedPerDay}
          setFeedPerDay={setFeedPerDay}
          disabled={!mer}
        />
      </div>

      {result && (
        <CalculatorResult
          displayResult={
            <span className="font-bold text-primary">
              {result.toString()} {unit}/회
            </span>
          }
          copyResult={`${result.toString()} ${unit}/회`}
        />
      )}
    </div>
  )
}
