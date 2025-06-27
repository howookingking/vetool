import { calculateAge } from '@/lib/utils/utils'
import { ChecklistSidebarData } from '@/types/checklist/checklistchart'
import React from 'react'

type Props = {
  txchartdata: ChecklistSidebarData
}

const TxReportUser = ({ txchartdata }: Props) => {
  return (
    <div>
      <div className="fle-wrap flex items-center">
        <div className="m-5 text-2xl font-bold">
          {txchartdata?.checklist_title}
        </div>
      </div>
      <div className="fle-wrap flex items-center">
        <div className="mb-3 ml-5 text-lg font-bold">시행일 :</div>
        <div className="mb-3 text-lg font-bold">{txchartdata?.due_date}</div>
      </div>
      <div className="mb-3 ml-5 text-base">1.환자정보</div>
      <table className="m-5 w-full min-w-[600px] border border-gray-300 text-center text-sm">
        <tbody>
          <tr>
            <td className="border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              환자명(ID)
            </td>
            <td className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.patients?.name}(
              {txchartdata?.patients?.hos_patient_id})
            </td>
            <td className="border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              종(species)/품종(breed)
            </td>
            <td className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.patients?.species?.toUpperCase()}/
              {txchartdata?.patients?.breed}
            </td>
          </tr>
          <tr>
            <td className="border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              성별
            </td>
            <td className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.patients?.gender?.toUpperCase()}
            </td>
            <td className="border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              생년월일(연령)
            </td>
            <td className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.patients?.birth}(
              {txchartdata?.patients?.birth &&
                calculateAge(txchartdata?.patients?.birth)}
              )
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mb-3 ml-5 text-base">2.수의사 정보</div>
      <table className="m-5 w-full min-w-[600px] border border-gray-300 text-center text-sm">
        <tbody>
          <tr>
            <td className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              담당의(주치의)
            </td>
            <td className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.checklist_vet?.attending}
            </td>
            <td className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              술자
            </td>
            <td className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.checklist_vet?.primary}
            </td>
          </tr>
          <tr>
            <td className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              어시스트
            </td>
            <td className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.checklist_vet?.assistence}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mb-3 ml-5 text-base">3.처치 정보</div>
      <table className="m-5 w-full min-w-[600px] border border-gray-300 text-sm">
        <tbody>
          <tr>
            <td className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold text-gray-800">
              전처치
            </td>
            <td className="whitespace-pre-wrap border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.preinfo?.pre}
            </td>
          </tr>
          <tr>
            <td className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold text-gray-800">
              주요처치
            </td>
            <td className="whitespace-pre-wrap border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.preinfo?.main}
            </td>
          </tr>
          <tr>
            <td className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold text-gray-800">
              후처치
            </td>
            <td className="whitespace-pre-wrap border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.preinfo?.post}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mb-3 ml-5 text-base">3.주요 과정</div>
      <table className="m-5 w-full min-w-[600px] border border-gray-300 text-sm">
        <tbody>
          <tr>
            <td className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold text-gray-800">
              전처치
            </td>
            <td className="whitespace-pre-wrap border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.preinfo?.pre}
            </td>
          </tr>
          <tr>
            <td className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold text-gray-800">
              주요처치
            </td>
            <td className="whitespace-pre-wrap border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.preinfo?.main}
            </td>
          </tr>
          <tr>
            <td className="max-w-[30px] border-b border-gray-300 bg-gray-100 px-4 py-2 text-center font-semibold text-gray-800">
              후처치
            </td>
            <td className="whitespace-pre-wrap border-b border-gray-200 bg-white px-4 py-2 font-medium text-blue-700">
              {txchartdata?.preinfo?.post}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TxReportUser
