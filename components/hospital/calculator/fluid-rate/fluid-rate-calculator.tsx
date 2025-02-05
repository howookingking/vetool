import MaintenanceTab from '@/components/hospital/calculator/fluid-rate/maintenance/maintenance-tab'
import RehydrationTab from '@/components/hospital/calculator/fluid-rate/rehydration/rehydration-tab'
import ResuscitationTab from '@/components/hospital/calculator/fluid-rate/resuscitation/resuscitation-tab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PatientFormData, type Species } from '@/types/hospital/calculator'
import { type PatientWithWeight } from '@/types/patients'
import { useEffect, useState } from 'react'

export default function FluidRateCalculator({
  patientData,
}: {
  patientData: PatientWithWeight | null
}) {
  const [tab, setTab] = useState('maintenance')
  const [formData, setFormData] = useState<PatientFormData>(() => ({
    species: (patientData?.patient.species as Species) ?? 'canine',
    calcMethod: 'a',
    weight: patientData?.vital?.body_weight ?? '',
    fold: '1',
  }))

  useEffect(() => {
    if (patientData) {
      setFormData({
        species: patientData.patient.species as Species,
        calcMethod: 'a',
        weight: patientData.vital?.body_weight ?? '0',
        fold: '1',
      })
    }
  }, [patientData])

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="rehydration">Rehydration</TabsTrigger>
        <TabsTrigger value="resusitation">Resuscitation</TabsTrigger>
      </TabsList>

      <TabsContent value="maintenance">
        <MaintenanceTab
          formData={formData}
          setFormData={setFormData}
          tab={tab}
        />
      </TabsContent>

      <TabsContent value="rehydration">
        <RehydrationTab
          formData={formData}
          setFormData={setFormData}
          tab={tab}
        />
      </TabsContent>

      <TabsContent value="resusitation">
        <ResuscitationTab
          formData={formData}
          setFormData={setFormData}
          tab={tab}
        />
      </TabsContent>
    </Tabs>
  )
}
