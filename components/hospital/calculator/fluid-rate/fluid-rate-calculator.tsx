import MaintenanceTab from '@/components/hospital/calculator/fluid-rate/maintenance/maintenance-tab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type PatientWithWeight } from '@/types/patients'
import { useState } from 'react'
import RehydrationTab from './rehydration/rehydration-tab'
import ResuscitationTab from './resuscitation/resuscitation-tab'

export default function FluidRateCalculator({
  patientData,
}: {
  patientData: PatientWithWeight | null
}) {
  const [tab, setTab] = useState('maintenance')
  const [localWeight, setLocalWeight] = useState(
    patientData?.vital?.body_weight ?? '',
  )
  const handleLocalWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalWeight(e.target.value)
  }

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="rehydration">Rehydration</TabsTrigger>
        <TabsTrigger value="resusitation">Resuscitation</TabsTrigger>
      </TabsList>

      <TabsContent value="maintenance" className="px-2">
        <MaintenanceTab
          birth={patientData?.patient.birth}
          weight={localWeight}
          species={patientData?.patient.species}
          handleLocalWeightChange={handleLocalWeightChange}
        />
      </TabsContent>

      <TabsContent value="rehydration" className="px-2">
        <RehydrationTab
          weight={localWeight}
          handleLocalWeightChange={handleLocalWeightChange}
        />
      </TabsContent>

      <TabsContent value="resusitation" className="px-2">
        <ResuscitationTab
          species={patientData?.patient.species}
          weight={localWeight}
          handleLocalWeightChange={handleLocalWeightChange}
        />
      </TabsContent>
    </Tabs>
  )
}
