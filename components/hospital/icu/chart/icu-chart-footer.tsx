'use client'

import { Button } from '@/components/ui/button'
import { FOOTER_CATEGORIES } from '@/constants/hospital/icu/chart'
import { useIcuSelectedChartCategoryStore } from '@/lib/store/hospital/icu/icu-selected-category'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'

export default function IcuChartFooter() {
  const { selectedPatient, setSelectedPatient } = useIcuSelectedPatientStore()
  const { selectedCategory, setSelectedCategory } =
    useIcuSelectedChartCategoryStore()

  const handleButtonClick = (value: string) => {
    setSelectedCategory(value)

    if (value === 'overall') {
      setSelectedPatient(null)
    }
  }

  return (
    <footer className="h-12 bg-white">
      <ul className="flex h-full items-center gap-4 pl-4">
        {FOOTER_CATEGORIES.map(({ label, value }) => (
          <li key={value}>
            <Button
              type="button"
              className="footer-link"
              variant={selectedCategory === value ? 'default' : 'outline'}
              onClick={() => handleButtonClick(value)}
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>
    </footer>
  )
}
