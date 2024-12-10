import HelperTooltip from '@/components/common/helper-tooltip'
import DrugComboBox from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-form/drug-order/drug-combo-box'
import DrugDoseInput from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-form/drug-order/drug-dose-input'
import DrugDoseUnitRadio from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-form/drug-order/drug-dose-unit-radio'
import DrugSelectField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-form/drug-order/drug-select-field'
import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-schema'
import { calculateTotalDrugAmount } from '@/lib/utils/utils'
import { useCallback, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function DrugFormField({
  form,
  drugs,
  weight,
  species,
  isSettingMode,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
  drugs?: any[]
  weight?: string
  species?: string
  isSettingMode?: boolean
}) {
  const drugOrders = form.getValues('icu_chart_order_name')
  const totalAmount = form
    .getValues('icu_chart_order_comment')
    ?.replace(/[A-Za-z]/g, '')
  const isMicro = form.getValues('icu_chart_order_comment')?.includes('ul')

  const [name, dosage, route, time] = drugOrders.split('#')
  const [drugName, setDrugName] = useState(name ?? '')
  const [drugDosage, setDrugDosage] = useState(dosage ?? '0')
  const [drugRoute, setDrugRoute] = useState(route ?? 'IV')
  const [drugTime, setDrugTime] = useState(time ?? 'BID')
  const [drugTotalAmount, setDrugTotalAmount] = useState(
    dosage ? totalAmount : '0',
  )
  const [drugTotalUnit, setDrugTotalUnit] = useState(isMicro ? 'ul' : 'ml')
  const [drugMassVolume, setDrugMassVolume] = useState<number | null>(null)
  const [isAutoCalculate, setIsAutoCalculate] = useState(Boolean(!totalAmount))

  useEffect(() => {
    form.setValue(
      'icu_chart_order_name',
      `${drugName}#${drugDosage}#${drugRoute}#${drugTime}`,
    )
    form.setValue('icu_chart_order_comment', drugTotalAmount + drugTotalUnit)
  }, [
    drugName,
    drugDosage,
    drugRoute,
    drugTime,
    drugTotalAmount,
    form,
    drugTotalUnit,
  ])

  // useMemo(() => {
  //   const selectedDrug = drugs?.find((drug) =>
  //     drug.drug_products.some((product) => product.name === drugName),
  //   )

  //   const drugDoses = selectedDrug?.drug_doses?.filter(
  //     (dose) =>
  //       dose?.route?.includes(drugRoute) &&
  //       (dose?.species === species || dose?.species === 'both'),
  //   )

  //   setDrugDosage(drugDoses?.length ? drugDoses[0].default_dose! : '0')
  // }, [drugName, drugs, species, drugRoute])

  // 약물 총량 계산
  const getTotalAmount = useCallback(() => {
    if (!drugMassVolume || !weight) return

    return calculateTotalDrugAmount(
      weight,
      drugDosage,
      drugTotalUnit,
      drugMassVolume,
    )
  }, [drugDosage, drugMassVolume, drugTotalUnit, weight])

  useEffect(() => {
    if (isAutoCalculate && drugMassVolume) {
      const totalAmount = getTotalAmount()

      if (totalAmount) setDrugTotalAmount(totalAmount)
    }
  }, [drugMassVolume, getTotalAmount, isAutoCalculate])

  const handleTotalAmountChange = (value: string) => {
    setDrugTotalAmount(value)
    setIsAutoCalculate(false)
  }

  const handleDosageChange = (value: string) => {
    setDrugDosage(value)
    setIsAutoCalculate(true)
  }

  const handleRouteChange = (value: string) => {
    setDrugRoute(value)
    setIsAutoCalculate(true)
  }

  return (
    <div>
      <DrugComboBox
        drugName={drugName}
        setDrugName={setDrugName}
        setDrugMassVolume={setDrugMassVolume}
        setIsAutoCalculate={setIsAutoCalculate}
        drugs={drugs}
      />

      <div className="grid grid-cols-3 gap-4">
        <DrugDoseInput
          label="약물 용량"
          value={drugDosage}
          onChange={handleDosageChange}
          unit="mg/kg"
        />

        <DrugSelectField
          label="투여 경로"
          value={drugRoute}
          onChange={handleRouteChange}
          options={[
            { value: 'IV', label: 'IV' },
            { value: 'SC', label: 'SC' },
            { value: 'IM', label: 'IM' },
            { value: 'ID', label: 'ID' },
          ]}
        />

        <DrugSelectField
          label="투여 횟수"
          value={drugTime}
          onChange={setDrugTime}
          options={[
            { value: 'SID', label: 'SID' },
            { value: 'BID', label: 'BID' },
            { value: 'QID', label: 'QID' },
            { value: 'PRN', label: 'PRN' },
          ]}
        />

        {!isSettingMode && (
          <div>
            <DrugDoseInput
              label={
                <div className="mb-1 flex items-center gap-1">
                  약물 총량
                  <HelperTooltip className="w-4">
                    자동 계산된 총량은 참고용으로만 사용해주세요
                  </HelperTooltip>
                </div>
              }
              value={drugTotalAmount}
              onChange={handleTotalAmountChange}
              unit={drugTotalUnit}
            />

            <DrugDoseUnitRadio
              drugTotalUnit={drugTotalUnit}
              setDrugTotalUnit={setDrugTotalUnit}
            />
          </div>
        )}
      </div>
    </div>
  )
}
