'use client'

import CalculatorResult from '@/components/hospital/calculator/result/calculator-result'
import DietComboBox from '@/components/hospital/calculator/rer-mer/diet/diet-combo-box'
import DietFeedPerDayInput from '@/components/hospital/calculator/rer-mer/diet/diet-feed-per-day-input'
import { cacluateFeedAmount } from '@/lib/calculators/rer-mer'
import { getDiets } from '@/lib/services/admin/diet/diet'
import { type Diet } from '@/types/hospital/calculator'
import { useEffect, useState } from 'react'

export default function DietForm({ mer }: { mer: number | null }) {
  const [diets, setDiets] = useState<Diet[]>([])
  const [selectedDiet, setSelectedDiet] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [feedPerDay, setFeedPerDay] = useState('2')
  const [feedAmount, setFeedAmount] = useState<number | null>(null)

  useEffect(() => {
    const fetchDiets = async () => {
      const diets = await getDiets()
      setDiets(diets)
    }

    fetchDiets()
  }, [setDiets])

  useEffect(() => {
    const massVol = diets.find((diet) => diet.name === selectedDiet)?.mass_vol
    const unit = diets.find((diet) => diet.name === selectedDiet)?.unit || 'g'
    setUnit(unit)

    if (mer && massVol && feedPerDay) {
      const feedAmount = cacluateFeedAmount(mer, massVol, Number(feedPerDay))

      setFeedAmount(feedAmount)
    }
  }, [mer, selectedDiet, feedPerDay, diets])

  const mappedDietList = diets.map((diet) => ({
    value: diet.name,
    label: diet.name,
  }))

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-2 grid grid-cols-2 gap-2">
        <DietComboBox
          mappedDietList={mappedDietList}
          selectedDiet={selectedDiet}
          setSelectedDiet={setSelectedDiet}
        />

        <DietFeedPerDayInput
          feedPerDay={feedPerDay}
          setFeedPerDay={setFeedPerDay}
        />
      </div>

      {feedAmount !== null && feedAmount > 0 && (
        <CalculatorResult
          displayResult={
            <span className="font-bold text-primary">
              {feedAmount.toString()} {unit}/회
            </span>
          }
          copyResult={`${feedAmount.toString()} ${unit}/회`}
        />
      )}
    </div>
  )
}
