// import DrugsDataTable from '@/components/hospital/admin/drug/drugs-data-table/drugs-data-table'
import { getHosName } from '@/lib/services/hospital-home/get-hos-name'
import { getHosDrugs, getRawDrugs } from '@/lib/services/icu/chart/get-drugs'

export default async function AdminDrugSettingsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  // const params = await props.params
  // const hosName = await getHosName(params.hos_id)
  // const hosDrugsData = await getHosDrugs(params.hos_id)
  // const rawDrugData = await getRawDrugs()

  return (
    // <DrugsDataTable
    //   hosName={hosName}
    //   hosDrugsData={hosDrugsData}
    //   rawDrugData={rawDrugData}
    // />
    <></>
  )
}
