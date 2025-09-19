// import { Button } from '@/components/ui/button'
// import { ChecklistData } from '@/types/checklist/checklist-type'
// import {
//   minToLocalTime,
//   timeInterval,
//   timestampPlusMin,
// } from '@/constants/checklist/checklist'
// import { updateEachChecklist } from '@/lib/services/checklist/get-checklist-data-client'
// import { useState } from 'react'
// import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
// import { Pencil } from 'lucide-react'
// import ChecklistTimetableTimeEditor from './checklist-timetabletime-editor'
// type Props = {
//   checklistData: ChecklistData
// }

// export default function ChecklistTimetableProtocol({ checklistData }: Props) {
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [dialogecontent, setDialogcontent] = useState<{
//     pretime: number
//     index: number
//     name: string
//     txt: ''
//   }>({
//     pretime: 0,
//     index: 0,
//     name: 'txStart',
//     txt: '',
//   })
//   const cancelStart = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const predata = { ...checklistData } as any
//     const index = e.currentTarget.name
//     if (
//       checklistData.checklist_protocol &&
//       checklistData.checklist_protocol.length > 0 &&
//       index
//     ) {
//       const mainProtocol = checklistData.checklist_protocol[Number(index)]
//       mainProtocol.txStart = null
//       mainProtocol.txEnd = null
//       predata.checklist_protocol[Number(index)] = mainProtocol
//       predata.checklist_timetable = cancelTimetableTx(
//         mainProtocol.title + ' 시작',
//       )
//       updateEachChecklist(predata)
//     }
//   }
//   const cancelTimetableTx = (pretxt: string) => {
//     if (
//       checklistData.checklist_timetable &&
//       checklistData.checklist_timetable.length > 0
//     ) {
//       const txt = pretxt
//       const newTimetable = [...checklistData.checklist_timetable]
//       const index = newTimetable.findIndex((item) => item.txt === txt)
//       if (index !== -1) {
//         newTimetable.splice(index, 1)
//         return newTimetable
//       }
//     }
//   }
//   const endProtocol = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const predata = { ...checklistData } as any

//     const index = e.currentTarget.name
//     if (
//       checklistData?.starttime &&
//       checklistData.checklist_protocol &&
//       checklistData.checklist_protocol.length > 0 &&
//       index
//     ) {
//       const mainProtocol = checklistData.checklist_protocol[Number(index)]
//       mainProtocol.txEnd = new Date().getTime()
//       predata.checklist_protocol[Number(index)] = mainProtocol
//       predata.checklist_timetable = makeTimetableTx(
//         mainProtocol.title + ' 종료',
//         mainProtocol.type + '-' + index,
//       )
//       updateEachChecklist(predata)
//     }
//   }
//   const makeTimetableTx = (pretxt: string, type: string | null) => {
//     if (
//       checklistData.checklist_timetable &&
//       checklistData.checklist_timetable.length > 0
//     ) {
//       const txt = pretxt
//       const newTimetable = [...checklistData.checklist_timetable]
//       newTimetable.push({
//         time: new Date().getTime(),
//         txt: txt,
//         type: type,
//         imgurl: null,
//       })
//       return newTimetable
//     }
//   }
//   const startProtocol = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const predata = { ...checklistData } as any

//     const index = e.currentTarget.name
//     if (
//       checklistData?.starttime &&
//       checklistData.checklist_protocol &&
//       checklistData.checklist_protocol.length > 0 &&
//       index
//     ) {
//       const mainProtocol = checklistData.checklist_protocol[Number(index)]
//       if (mainProtocol.type === 'main') {
//         mainProtocol.txStart = new Date().getTime()
//         predata.checklist_protocol[Number(index)] = mainProtocol
//         predata.checklist_timetable = makeTimetableTx(
//           mainProtocol.title + ' 시작',
//           mainProtocol.type + '-' + index,
//         )
//         updateEachChecklist(predata)
//       } else {
//         mainProtocol.txEnd = new Date().getTime()
//         predata.checklist_protocol[Number(index)] = mainProtocol
//         predata.checklist_timetable = makeTimetableTx(
//           mainProtocol.title + ' 완료',
//           mainProtocol.type + '-' + index,
//         )
//         updateEachChecklist(predata)
//       }
//     }
//   }

//   const cancelEnd = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const predata = { ...checklistData } as any

//     const index = e.currentTarget.name
//     if (
//       checklistData.checklist_protocol &&
//       checklistData.checklist_protocol.length > 0 &&
//       index
//     ) {
//       const mainProtocol = checklistData.checklist_protocol[Number(index)]
//       mainProtocol.txEnd = null
//       predata.checklist_protocol[Number(index)] = mainProtocol
//       predata.checklist_timetable =
//         mainProtocol.type === 'main'
//           ? cancelTimetableTx(mainProtocol.title + ' 종료')
//           : cancelTimetableTx(mainProtocol.title + ' 완료')

//       updateEachChecklist(predata)
//     }
//   }
//   const setTime = (time: number, index: number, name: string, txt: string) => {
//     if (txt !== '' && name === 'time') {
//       //timetable 변경
//       const predata = { ...checklistData } as ChecklistData
//       predata.checklist_timetable &&
//         (predata.checklist_timetable[index].time = time)
//       predata.checklist_timetable &&
//         (predata.checklist_timetable[index].txt = txt)
//       updateEachChecklist(predata)
//       setIsDialogOpen(false)
//     } else {
//       //protocol변경
//       const predata = { ...checklistData } as any
//       predata.checklist_protocol[index][name] = time
//       if (predata.checklist_protocol[index].type === 'main') {
//         const tableindex =
//           name === 'txStart'
//             ? predata.checklist_timetable.findIndex(
//                 (x: any) =>
//                   x.txt === predata.checklist_protocol[index].title + ' 시작',
//               )
//             : predata.checklist_timetable.findIndex(
//                 (x: any) =>
//                   x.txt === predata.checklist_protocol[index].title + ' 종료',
//               )
//         predata.checklist_timetable[tableindex].time = time
//         updateEachChecklist(predata)
//         setIsDialogOpen(false)
//       } else {
//         const tableindex = predata.checklist_timetable.findIndex(
//           (x: any) =>
//             x.txt === predata.checklist_protocol[index].title + ' 완료',
//         )
//         predata.checklist_timetable[tableindex].time = time
//         updateEachChecklist(predata)
//         setIsDialogOpen(false)
//       }
//     }
//   }
//   return (
//     <div className="m-3 overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-300 p-2 text-sm text-gray-800">
//       <div className="flex-col">
//         <div className="text-bold text-lg">프로토콜</div>
//         <div className="text-sm text-gray-500">과정을 기록합니다.</div>
//         {checklistData.checklist_protocol &&
//           checklistData.checklist_protocol.length > 0 &&
//           checklistData.checklist_protocol.map((list, i) => {
//             if (list.type === 'main') {
//               return (
//                 <div
//                   className="mb-2 flex flex-wrap items-center"
//                   key={list.title && list.title + i}
//                 >
//                   <Button className="mb-3 mr-2">
//                     {list.title}
//                     {checklistData &&
//                     checklistData.starttime &&
//                     list.mode &&
//                     list.mode === 'afterStart'
//                       ? '(예정시간' +
//                         minToLocalTime(
//                           String(checklistData.starttime),
//                           String(list.dueStart),
//                         )[1] +
//                         ')'
//                       : i > 0 &&
//                         checklistData?.starttime &&
//                         checklistData.checklist_protocol &&
//                         checklistData.checklist_protocol[i - 1].txStart &&
//                         '(예정시간' +
//                           minToLocalTime(
//                             String(checklistData.starttime),
//                             String(
//                               Number(
//                                 checklistData.checklist_protocol[i - 1].txStart,
//                               ) + Number(list.dueStart),
//                             ),
//                           )[1] +
//                           ')'}
//                   </Button>
//                   {list.txStart && !list.txEnd ? (
//                     <div>
//                       {' '}
//                       <Button
//                         className="mb-3 mr-2"
//                         variant="outline"
//                         name={String(i)}
//                         onClick={cancelStart}
//                       >
//                         시작취소
//                       </Button>
//                       <Button
//                         className="mb-3 mr-2"
//                         variant="outline"
//                         name={String(i)}
//                         onClick={endProtocol}
//                       >
//                         종료
//                       </Button>
//                     </div>
//                   ) : !list.txStart ? (
//                     <Button
//                       className="mb-3 mr-2"
//                       variant="outline"
//                       name={String(i)}
//                       onClick={startProtocol}
//                     >
//                       시작
//                     </Button>
//                   ) : (
//                     <Button
//                       className="mb-3 mr-2"
//                       variant="outline"
//                       name={String(i)}
//                       onClick={cancelEnd}
//                     >
//                       종료취소
//                     </Button>
//                   )}
//                   {list.txStart && (
//                     <Button
//                       className="mb-3 mr-2"
//                       variant="outline"
//                       onClick={() => {
//                         setDialogcontent({
//                           pretime: Number(list.txStart),
//                           index: i,
//                           name: 'txStart',
//                           txt: '',
//                         })
//                         setIsDialogOpen(true)
//                       }}
//                     >
//                       시작 시간: {new Date(list.txStart).toLocaleTimeString()}
//                     </Button>
//                   )}
//                   {list.txEnd && (
//                     <Button
//                       className="mb-3 mr-2"
//                       variant="outline"
//                       onClick={() => {
//                         setDialogcontent({
//                           pretime: Number(list.txEnd),
//                           index: i,
//                           name: 'txEnd',
//                           txt: '',
//                         })
//                         setIsDialogOpen(true)
//                       }}
//                     >
//                       종료 시간:{' '}
//                       {new Date(list.txEnd).toLocaleTimeString()}{' '}
//                     </Button>
//                   )}
//                   {list.txStart && list.txEnd && (
//                     <div className="ml-3 text-sm text-gray-500">
//                       경과 시간:{' '}
//                       {Math.floor((list.txEnd - list.txStart) / (60 * 1000))}분
//                     </div>
//                   )}
//                   <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                     <DialogContent>
//                       <DialogTitle>시간변경</DialogTitle>
//                       <DialogContent>
//                         <ChecklistTimetableTimeEditor
//                           pretime={dialogecontent.pretime}
//                           index={dialogecontent.index}
//                           name={dialogecontent.name}
//                           txt={dialogecontent.txt}
//                           setTime={setTime}
//                         />
//                       </DialogContent>
//                     </DialogContent>
//                   </Dialog>
//                 </div>
//               )
//             } else {
//               return (
//                 <div
//                   key={list.title && list.title + i}
//                   className="ml-6 flex items-center"
//                 >
//                   <div className="felx flex-wrap">
//                     {list.txEnd && (
//                       <div className="mr-3 text-sm text-gray-500">
//                         {list.title}완료
//                       </div>
//                     )}
//                     {list.txEnd && (
//                       <div className="text-sm text-gray-500">
//                         (완료시간: {new Date(list.txEnd).toLocaleTimeString()})
//                       </div>
//                     )}
//                   </div>
//                   {!list.txEnd && (
//                     <Button
//                       variant="outline"
//                       className="mb-1 mr-2"
//                       name={String(i)}
//                       onClick={startProtocol}
//                     >
//                       {list.title}
//                       {checklistData &&
//                       checklistData.starttime &&
//                       list.mode &&
//                       list.mode === 'afterStart'
//                         ? '(예정시간' +
//                           minToLocalTime(
//                             String(checklistData.starttime),
//                             String(list.dueStart),
//                           )[1] +
//                           ')'
//                         : i > 0 &&
//                             checklistData.checklist_protocol &&
//                             checklistData.checklist_protocol[i - 1].type ===
//                               'main' &&
//                             checklistData.checklist_protocol[i - 1].txStart
//                           ? '(예정시간' +
//                             timestampPlusMin(
//                               Number(
//                                 checklistData.checklist_protocol[i - 1].txStart,
//                               ),
//                               String(list.dueStart),
//                             )[3] +
//                             ')'
//                           : i > 0 &&
//                             checklistData.checklist_protocol &&
//                             checklistData.checklist_protocol[i - 1].type ===
//                               'sub' &&
//                             checklistData.checklist_protocol[i - 1].txEnd &&
//                             '(예정시간' +
//                               timestampPlusMin(
//                                 Number(
//                                   checklistData.checklist_protocol[i - 1].txEnd,
//                                 ),
//                                 String(list.dueStart),
//                               )[3] +
//                               ')'}
//                     </Button>
//                   )}
//                   {list.txEnd && (
//                     <div className="flex items-center">
//                       <Button
//                         variant="outline"
//                         className="mb-1 ml-2"
//                         size="sm"
//                         name={String(i)}
//                         onClick={cancelEnd}
//                       >
//                         완료취소
//                       </Button>
//                       <Button
//                         className="mb-1 ml-2"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           setDialogcontent({
//                             pretime: Number(list.txEnd),
//                             index: i,
//                             name: 'txEnd',
//                             txt: '',
//                           })
//                           setIsDialogOpen(true)
//                         }}
//                       >
//                         <Pencil />
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               )
//             }
//           })}
//       </div>
//     </div>
//   )
// }
