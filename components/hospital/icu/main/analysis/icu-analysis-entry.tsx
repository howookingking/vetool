'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import GroupByStatistics from '@/components/hospital/icu/main/analysis/group-by-statistics'
import IoPatientsStatistics from '@/components/hospital/icu/main/analysis/io-patients-statistics'
import VetAssignmentStatistics from '@/components/hospital/icu/main/analysis/vet-assignment-statistics'
import { getAnalysisData } from '@/lib/services/icu/analysis/get-analysis-data'
import type { IcuAnalysisData } from '@/types/icu/analysis'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function IcuAnalysisEntry() {
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [analysisData, setAnalysisData] = useState<IcuAnalysisData[]>([])
  const { hos_id, target_date } = useParams()

  useEffect(() => {
    const fetchAnalysisData = async () => {
      const data = await getAnalysisData(
        hos_id as string,
        target_date as string,
        startDate,
        endDate,
      )
      setAnalysisData(data)
    }

    fetchAnalysisData()
  }, [startDate, endDate, hos_id, target_date])

  const groups = (() => {
    const groupSet = new Set<string>()

    analysisData.forEach((item) => {
      if (item.icu_io?.group_list) {
        item.icu_io.group_list.forEach((group) => {
          if (group) {
            groupSet.add(group)
          }
        })
      }
    })

    return Array.from(groupSet).sort()
  })()

  const vets = (() => {
    // <user_id, name>
    const vetsMap = new Map<string, string>()

    analysisData.forEach((item) => {
      if (item.main_vet?.user_id && item.main_vet?.name) {
        vetsMap.set(item.main_vet.user_id, item.main_vet.name)
      }
    })

    return Array.from(vetsMap.values()).sort()
  })()

  return (
    <>
      {analysisData.length === 0 ? (
        <NoResultSquirrel
          text="분석할 차트 데이터가 없습니다"
          className="h-screen flex-col"
          size="lg"
        />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <IoPatientsStatistics
            analysisData={analysisData}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            groups={groups}
            vets={vets}
          />

          <div className="col-span-2 grid grid-cols-2 gap-2 pb-12">
            <VetAssignmentStatistics analysisData={analysisData} />
            <GroupByStatistics analysisData={analysisData} />
          </div>

          {/* <IoDurationStatistics analysisData={analysisData} /> */}
        </div>
      )}
    </>
  )
}
