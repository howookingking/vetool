'use client'
import { useEffect, useState } from 'react'
import { IcuIo, Keywords } from './analysis-type'

import AnalysisCountSig from './analysis-count-sig'
import AnalysisCountKeywords from './analysis-count-keywords'
import AnalysisFilter from './analysis-filter'
import AnalysisCountHosday from './analysis-count-hosday'
import AnalysisCountPatients from './analysis-count-patients'

type Props = {
  IoDatas: IcuIo[] | null
  keywords: Keywords[] | null
  predate: string | null
  postdate: string | null
}
export default function AnalysisCountContainer({
  IoDatas,
  keywords,
  predate,
  postdate,
}: Props) {
  const [selectedDatas, setSelectedDatas] = useState<IcuIo[] | []>([])
  const [filteredDatas, setFilteredDatas] = useState<IcuIo[] | []>([])

  useEffect(() => {
    IoDatas && setFilteredDatas(IoDatas)
    setSelectedDatas([])
  }, [IoDatas])
  return (
    <div className="flex-col">
      <AnalysisFilter IoDatas={IoDatas} setFilteredDatas={setFilteredDatas} />
      <div>필터된 환자 : {filteredDatas?.length}</div>
      <div>
        필터된 환자 기준 평균입원일수{' '}
        <AnalysisCountHosday
          predate={predate}
          postdate={postdate}
          IoDatas={filteredDatas && filteredDatas}
        ></AnalysisCountHosday>
      </div>
      <div>
        필터된 환자 기준 일일입원환자수{' '}
        <AnalysisCountPatients
          predate={predate}
          postdate={postdate}
          IoDatas={filteredDatas && filteredDatas}
        ></AnalysisCountPatients>
      </div>
      <div className="flex">
        <div className="flex-col">
          {IoDatas && IoDatas.length > 0 && (
            <AnalysisCountSig
              title="모든 환자"
              IoDatas={filteredDatas && filteredDatas}
              setSelectedDatas={setSelectedDatas}
              predate={predate}
              postdate={postdate}
            />
          )}
          {IoDatas && IoDatas.length > 0 && keywords && (
            <AnalysisCountKeywords
              title="모든 케이스"
              IoDatas={filteredDatas && filteredDatas}
              keywords={keywords && keywords}
              setSelectedDatas={setSelectedDatas}
              predate={predate}
              postdate={postdate}
            />
          )}
        </div>
        <div className="flex-col">
          {selectedDatas && selectedDatas.length > 0 && (
            <AnalysisCountSig
              title="선택된 환자"
              IoDatas={selectedDatas && selectedDatas}
              setSelectedDatas={setSelectedDatas}
              predate={predate}
              postdate={postdate}
            />
          )}
          {selectedDatas && selectedDatas.length > 0 && (
            <AnalysisCountKeywords
              title="선택된 케이스"
              IoDatas={selectedDatas && selectedDatas}
              keywords={keywords && keywords}
              setSelectedDatas={setSelectedDatas}
              predate={predate}
              postdate={postdate}
            />
          )}
        </div>
      </div>
    </div>
  )
}
