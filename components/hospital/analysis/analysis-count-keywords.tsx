'use client'

import { useEffect, useState } from 'react'
import { IcuIo, Keywords } from './analysis-type'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import AnalysisCountHosday from './analysis-count-hosday'
import AnalysisCountPatients from './analysis-count-patients'
// import AnalysisCountPatients from './analysis-count-patients'

type Props = {
  IoDatas: IcuIo[] | null
  title: string | null
  keywords: Keywords[] | null
  setSelectedDatas: React.Dispatch<React.SetStateAction<IcuIo[]>>
  predate: string | null
  postdate: string | null
}
export default function AnalysisCountKeywords({
  IoDatas,
  title,
  keywords,
  setSelectedDatas,
  predate,
  postdate,
}: Props) {
  const [keywordArray, setKeywordArray] = useState<{ [key: string]: IcuIo[] }>(
    {},
  )
  const [relatedKeywordsArray, setRelatedKeywordsArray] = useState<{
    [key: string]: IcuIo[]
  }>({})

  useEffect(() => {
    const newIoArray: { icu_io_id: string; keywords: string[] }[] = []
    const keywordNames: string[] = []
    if (IoDatas && keywords) {
      //1.기존 자료로 newidarray만들기
      IoDatas.forEach((ioData) => {
        const newIo: { icu_io_id: string; keywords: string[] } = {
          icu_io_id: ioData.icu_io_id,
          keywords: [],
        }
        keywords.forEach((keyword) => {
          if (
            keyword &&
            keyword.keyword &&
            (ioData.icu_io_cc.includes(keyword.keyword) ||
              ioData.icu_io_dx.includes(keyword.keyword))
          ) {
            if (keyword.keyword === keyword.search_keyword) {
              keyword &&
                keyword.tags &&
                newIo.keywords.push(...keyword.tags.split('#'))
            } else {
              const b = keywords.filter(
                (x) => x.keyword === keyword.search_keyword,
              )[0]
              b && b.tags && newIo.keywords.push(...b.tags.split('#'))
            }
          }
        })
        const prekeyword = [...new Set(newIo.keywords)]
        newIo.keywords = [...prekeyword]
        newIoArray.push(newIo)
        keywordNames.push(...newIo.keywords)
      })
    }
    const newKeywordNames = [...new Set(keywordNames)]
    const prekeywordArray: { [key: string]: IcuIo[] } = {}
    newKeywordNames.forEach((keywordName) => {
      prekeywordArray[keywordName] = []
      newIoArray.forEach((ioData) => {
        if (ioData.keywords.includes(keywordName)) {
          const inIoData = IoDatas?.find(
            (io) => io.icu_io_id === ioData.icu_io_id,
          )
          inIoData && prekeywordArray[keywordName].push(inIoData)
        }
      })
    })
    // const sorted = Object.entries(prekeywordArray).sort(
    //   (a, b) => b[1].length - a[1].length,
    // )
    // console.log(sorted)
    // const sortedKeywords: { [key: string]: IcuIo[] } = {}
    // sorted.forEach((item) => {
    //   sortedKeywords[item[0]] = item[1]
    // })
    setKeywordArray(prekeywordArray)
    // console.log(sortedKeywords)
  }, [IoDatas])
  return (
    <div>
      <h1>AnalysisCountKeywords</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Keyword</TableHead>
            <TableHead>Count</TableHead>
            <TableHead>일평균환자수</TableHead>
            <TableHead>평균입원일수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(keywordArray)
            .sort((a, b) => b[1].length - a[1].length)
            .map(
              ([key, value]) =>
                key !== '' && (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value.length}</TableCell>
                    <TableCell>
                      {' '}
                      <AnalysisCountPatients
                        IoDatas={value}
                        predate={predate && predate}
                        postdate={postdate && postdate}
                      />
                    </TableCell>
                    <TableCell>
                      {/* {value.map((io, i) => (
                        <div key={io.icu_io_id}>
                          {i + 1 + '.'}
                          {io.icu_io_cc + io.icu_io_dx}
                        </div>
                      ))} */}
                      <AnalysisCountHosday
                        IoDatas={value}
                        predate={predate && predate}
                        postdate={postdate && postdate}
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => setSelectedDatas(value)}>
                        자세히
                      </Button>
                    </TableCell>
                  </TableRow>
                ),
            )}
        </TableBody>
      </Table>
    </div>
  )
}
