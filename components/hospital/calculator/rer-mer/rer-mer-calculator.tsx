import { type PatientFormData, type Species } from '@/types/hospital/calculator'
import { type PatientWithWeight } from '@/types/patients'
import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import RerMerTable from './rer-mer-table'
import RerTab from '@/components/hospital/calculator/rer-mer/rer/rer-tab'
import MerTab from '@/components/hospital/calculator/rer-mer/mer/mer-tab'

export default function RerMerCalculator({
  patientData,
}: {
  patientData: PatientWithWeight | null
}) {
  const [tab, setTab] = useState('rer')
  const [formData, setFormData] = useState<PatientFormData>({
    species: (patientData?.patient.species as Species) ?? 'canine',
    weight: patientData?.vital?.body_weight ?? '',
  })

  useEffect(() => {
    if (patientData) {
      setFormData({
        species: patientData.patient.species as Species,
        weight: patientData.vital?.body_weight ?? '0',
        factor: '1.4',
      })
    }
  }, [patientData])

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="rer">RER</TabsTrigger>
        <TabsTrigger value="mer">MER</TabsTrigger>
      </TabsList>

      <TabsContent value="rer">
        <RerTab formData={formData} setFormData={setFormData} tab={tab} />
        <RerMerTable />
      </TabsContent>

      <TabsContent value="mer">
        <MerTab formData={formData} setFormData={setFormData} tab={tab} />
        <RerMerTable />
      </TabsContent>
    </Tabs>
  )
}
