import { minToLocalTime, timeInterval } from '@/constants/checklist/checklist'
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
    <div className="m-3 overflow-x-auto">
      <table className="w-full min-w-[600px] border border-gray-300 text-center text-sm">
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
                ? '전체과정 종료'
                : txChart?.starttime
                  ? '전체과정 진행중'
                  : '전체과정 진행전'}
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
          {txChart?.starttime &&
            txChart.checklist_protocol &&
            txChart.checklist_protocol.length > 0 &&
            txChart.checklist_protocol.map(
              (protocol, i) =>
                protocol.type === 'main' && (
                  <tr key={i} className="bg-gray-50">
                    <td className="border-b border-gray-200 px-4 py-2 font-medium text-indigo-700">
                      {'주요과정' + (i + 1) + ': '}
                      {protocol.title}
                      {protocol.txStart && !protocol.txEnd
                        ? ' 진행중'
                        : !protocol.txStart && !protocol.txEnd
                          ? ' 진행전'
                          : '완료'}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2">
                      {protocol.txStart &&
                        minToLocalTime(
                          String(txChart.starttime),
                          String(protocol.txStart),
                        )[1]}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2">
                      {' '}
                      {protocol.txEnd &&
                        minToLocalTime(
                          String(txChart.starttime),
                          String(protocol.txEnd),
                        )[1]}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2 font-semibold">
                      {' '}
                      {protocol.txStart &&
                        protocol.txEnd &&
                        Number(protocol.txEnd) -
                          Number(protocol.txStart) +
                          '분'}
                    </td>
                  </tr>
                ),
            )}
        </tbody>
      </table>
    </div>
  )
}

export default TxchartStatusTxt
