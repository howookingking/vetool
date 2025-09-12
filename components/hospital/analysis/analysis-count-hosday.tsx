import { IcuIo } from '@/types'
import { setDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { start } from 'repl'

type Props = {
  IoDatas: IcuIo[] | null
  predate: string | null
  postdate: string | null
}
export default function AnalysisCountHosday({
  IoDatas,
  predate,
  postdate,
}: Props) {
  const [dayhosDatas, setDayHosDatas] = useState<{ [key: string]: IcuIo[] }>({})
  const [averageHospatients, setAverageHosPatients] = useState<number>(0)
  const [averageHosDays2, setAverageHosDays2] = useState<number>(0)
  useEffect(() => {
    if (IoDatas && predate && postdate) {
      const predates: { [key: string]: IcuIo[] } = {}
      //   const prehosdays: { [key: string]: IcuIo[] } = {}
      const startdate = new Date(predate)
      const enddate = new Date(postdate)
      const diffInMs = Math.abs(enddate.getTime() - startdate.getTime())
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
      for (let i = 0; i <= Math.floor(diffInDays); i++) {
        i === 0
          ? startdate.setDate(startdate.getDate() + 0)
          : startdate.setDate(startdate.getDate() + 1)
        // console.log(startdate.toISOString().split('T')[0])
        predates[startdate.toISOString().split('T')[0]] = []
      }
      let totalhosdas = 0
      IoDatas.forEach((ioData) => {
        const ioinDate = new Date(ioData.in_date)
        const iooutDate = ioData.out_date
          ? new Date(ioData.out_date)
          : new Date()
        const diffInMsB = Math.abs(iooutDate.getTime() - ioinDate.getTime())
        const diffInDaysB = diffInMsB / (1000 * 60 * 60 * 24)
        totalhosdas = totalhosdas + diffInDaysB
        for (let i = 0; i <= Math.floor(diffInDaysB); i++) {
          i === 0
            ? ioinDate.setDate(ioinDate.getDate() + 0)
            : ioinDate.setDate(ioinDate.getDate() + 1)
          const ioDateString = ioinDate.toISOString().split('T')[0]

          if (predates[ioDateString]) {
            predates[ioDateString].push(ioData)
          }
        }
      })
      let allhosday = 0
      Object.keys(predates).forEach((key) => {
        allhosday = allhosday + predates[key].length
      })

      setDayHosDatas(predates)
      Object.keys(predates).length > 0 &&
        setAverageHosPatients(allhosday / Object.keys(predates).length)
      IoDatas.length > 0 && setAverageHosDays2(totalhosdas / IoDatas.length)
    }
  }, [IoDatas, predate, postdate])
  return (
    <div>
      {averageHosDays2 &&
        averageHosDays2 > 0 &&
        Math.round(averageHosDays2 * 10) / 10}
    </div>
  )
}
