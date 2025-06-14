import { timeInterval } from '@/constants/checklist/checklist'
import { TxChart } from '@/types/checklist/checklistchart'
import React from 'react'

type Props = {
  txChart: TxChart | null
}

const TxchartStatusTxt = ({ txChart }: Props) => {
  //   const timeInterval = (timetz1: string, timetz2: string) => {
  //     const date1 = new Date(timetz1)
  //     const date2 = new Date(timetz2)
  //     const diffMs = date2.getTime() - date1.getTime()
  //     const diffMinutes = Math.floor(diffMs / (1000 * 60)) // 분
  //     const hr = Math.floor(diffMinutes / 60)
  //     const disphr = hr > 0 ? hr : null
  //     const min = diffMinutes % 60
  //     return [diffMinutes, disphr, min]
  //   }
  return (
    <div className="m-3 overflow-hidden rounded-xl border border-gray-300 shadow-md">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b border-gray-300 px-4 py-2 font-semibold text-gray-800">
              구분
            </th>
            <th className="border-b border-gray-300 px-4 py-2 font-semibold text-gray-800">
              시작 시간
            </th>
            <th className="border-b border-gray-300 px-4 py-2 font-semibold text-gray-800">
              종료 시간
            </th>
            <th className="border-b border-gray-300 px-4 py-2 font-semibold text-gray-800">
              총 소요 시간
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border-b border-gray-200 px-4 py-2 font-medium text-blue-700">
              {txChart?.starttime && txChart?.endtime
                ? '종료'
                : txChart?.starttime
                  ? '진행중'
                  : '진행전'}
            </td>
            <td className="border-b border-gray-200 px-4 py-2">
              {txChart?.starttime &&
                new Date(txChart.starttime).toLocaleTimeString('ko-KR', {
                  hour12: false,
                })}
            </td>
            <td className="border-b border-gray-200 px-4 py-2">
              {txChart?.endtime &&
                new Date(txChart.endtime).toLocaleTimeString('ko-KR', {
                  hour12: false,
                })}
            </td>
            <td className="border-b border-gray-200 px-4 py-2 font-semibold">
              {txChart?.starttime && txChart?.endtime && (
                <div>
                  총
                  {timeInterval(txChart.starttime, txChart.endtime)[1]
                    ? timeInterval(txChart.starttime, txChart.endtime)[1] +
                      '시간'
                    : ''}
                  {timeInterval(txChart.starttime, txChart.endtime)[2] ?? '0'}분
                </div>
              )}
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border-b border-gray-200 px-4 py-2 font-medium text-indigo-700">
              과정 1
            </td>
            <td className="border-b border-gray-200 px-4 py-2">14:05</td>
            <td className="border-b border-gray-200 px-4 py-2">14:25</td>
            <td className="border-b border-gray-200 px-4 py-2 font-semibold">
              20분
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TxchartStatusTxt
