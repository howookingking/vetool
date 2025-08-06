'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IcuIo } from '@/types'
import { set } from 'date-fns'
import { useEffect, useState } from 'react'
import AnalysisCountPatients from './analysis-count-patients'
import AnalysisCountHosday from './analysis-count-hosday'

type Props = {
  IoDatas: IcuIo[] | null
  title: string | null
  setSelectedDatas: React.Dispatch<React.SetStateAction<IcuIo[]>>
  predate: string | null
  postdate: string | null
}
// tag[1]: 'species'
// tag[2] : 'breed'
// tag[3] : 'gender'
// tag[4] : 'age'
// tag[5] : 'name'
// tag[6] : 'owner_name'
export default function AnalysisCountSig({
  IoDatas,
  title,
  setSelectedDatas,
  predate,
  postdate,
}: Props) {
  const [sigNo, setSigNo] = useState<{
    species: { canine: IcuIo[]; feline: IcuIo[]; other: IcuIo[] }
    breed: { [key: string]: IcuIo[] }
    gender: { [key: string]: IcuIo[] }
    age: { [key: string]: IcuIo[] }
  }>({
    species: { canine: [], feline: [], other: [] },
    breed: {},
    gender: { im: [], cm: [], if: [], sf: [] },
    age: {
      '0': [],
      '1': [],
      '2': [],
      '3': [],
      '4': [],
      '5': [],
      '6': [],
      '7': [],
      '8': [],
      '9': [],
      '10': [],
      '11': [],
      '12': [],
      '13': [],
      '14': [],
      '15': [],
      '16': [],
      '17': [],
      '18': [],
      '19': [],
      '20': [],
    },
  })
  useEffect(() => {
    const preSig = {
      species: { canine: [], feline: [], other: [] },
      breed: {},
      gender: { im: [], cm: [], if: [], sf: [] },
      age: {
        '0': [],
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
        '7': [],
        '8': [],
        '9': [],
        '10': [],
        '11': [],
        '12': [],
        '13': [],
        '14': [],
        '15': [],
        '16': [],
        '17': [],
        '18': [],
        '19': [],
        '20': [],
      },
    } as {
      species: { canine: IcuIo[]; feline: IcuIo[]; other: IcuIo[] }
      breed: { [key: string]: IcuIo[] }
      gender: { [key: string]: IcuIo[] }
      age: { [key: string]: IcuIo[] }
    }
    const breednames: string[] = []
    const genders = ['im', 'cm', 'if', 'sf']

    IoDatas &&
      IoDatas.forEach((ioData) => {
        if (ioData && ioData.icu_io_tags) {
          const ioTagArray = ioData.icu_io_tags.split('#')
          const ioBreed = ioTagArray[2] ?? ''
          if (!breednames.includes(ioBreed)) {
            breednames.push(ioBreed)
          }
        }
      })

    IoDatas &&
      IoDatas.forEach((ioData) => {
        if (ioData && ioData.icu_io_tags) {
          const ioTagArray = ioData.icu_io_tags.split('#')
          const ioSpecies = ioTagArray[1] ?? ''
          const ioBreed = String(ioTagArray[2]) ?? ''
          const iogender = ioTagArray[3] ?? ''
          const ioAge = ioData.age_in_days ?? 0
          const ageyear =
            Number(ioAge) && Number(ioAge) > 0
              ? Math.floor(Number(ioAge) / 365)
              : 0

          if (ioBreed !== '' && !preSig.breed[ioBreed]) {
            preSig.breed[ioBreed] = [ioData]
          } else {
            preSig.breed[ioBreed].push(ioData)
          }
          if (ioSpecies !== '' && ioSpecies === 'canine') {
            preSig.species.canine.push(ioData)
          } else if (ioSpecies !== '' && ioSpecies === 'feline') {
            preSig.species.feline.push(ioData)
          } else {
            preSig.species.other.push(ioData)
          }

          if (
            iogender !== '' &&
            genders.includes(iogender) &&
            !preSig.gender[iogender]
          ) {
            preSig.gender[iogender] = [ioData]
          } else if (iogender !== '' && genders.includes(iogender)) {
            preSig.gender[iogender].push(ioData)
          }
          if (Number(ioAge) && Number(ioAge) > 0) {
            if (ageyear && ageyear >= 20) {
              preSig.age['20'].push(ioData)
            } else if (
              [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
              ].includes(String(ageyear))
            ) {
              preSig.age[String(ageyear)].push(ioData)
            }
          }
        }
      })
    setSigNo(preSig)
  }, [IoDatas])
  return (
    <div>
      {IoDatas && title && <h2>{title}</h2>}
      <div>SPECIES</div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Species</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>일평균환자수</TableHead>
            <TableHead>일평균입원일수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sigNo.species.canine.length > 0 && (
            <TableRow>
              <TableCell>Canine</TableCell>
              <TableCell>{sigNo.species.canine.length}</TableCell>
              <TableCell>
                <AnalysisCountPatients
                  IoDatas={sigNo.species.canine}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <AnalysisCountHosday
                  IoDatas={sigNo.species.canine}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => setSelectedDatas(sigNo.species.canine)}>
                  자세히
                </Button>
              </TableCell>
            </TableRow>
          )}
          {sigNo.species.feline.length > 0 && (
            <TableRow>
              <TableCell>Feline</TableCell>
              <TableCell>{sigNo.species.feline.length}</TableCell>
              <TableCell>
                <AnalysisCountPatients
                  IoDatas={sigNo.species.feline}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <AnalysisCountHosday
                  IoDatas={sigNo.species.feline}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => setSelectedDatas(sigNo.species.feline)}>
                  자세히
                </Button>
              </TableCell>
            </TableRow>
          )}
          {sigNo.species.other.length > 0 && (
            <TableRow>
              <TableCell>Other</TableCell>
              <TableCell>{sigNo.species.other.length}</TableCell>
              <TableCell>
                <AnalysisCountPatients
                  IoDatas={sigNo.species.other}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <AnalysisCountHosday
                  IoDatas={sigNo.species.other}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => setSelectedDatas(sigNo.species.other)}>
                  자세히
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div>GENDER</div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Gender</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>일평균환자수</TableHead>
            <TableHead>일평균입원일수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sigNo.gender.if.length > 0 && (
            <TableRow>
              <TableCell>Intact Female</TableCell>
              <TableCell>{sigNo.gender.if.length}</TableCell>
              <TableCell>
                <AnalysisCountPatients
                  IoDatas={sigNo.gender.if}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <AnalysisCountHosday
                  IoDatas={sigNo.gender.if}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => setSelectedDatas(sigNo.gender.if)}>
                  자세히
                </Button>
              </TableCell>
            </TableRow>
          )}
          {sigNo.gender.sf.length > 0 && (
            <TableRow>
              <TableCell>Spayed Female</TableCell>
              <TableCell>{sigNo.gender.sf.length}</TableCell>
              <TableCell>
                <AnalysisCountPatients
                  IoDatas={sigNo.gender.sf}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <AnalysisCountHosday
                  IoDatas={sigNo.gender.sf}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => setSelectedDatas(sigNo.gender.sf)}>
                  자세히
                </Button>
              </TableCell>
            </TableRow>
          )}
          {sigNo.gender.im.length > 0 && (
            <TableRow>
              <TableCell>Intact Male</TableCell>
              <TableCell>{sigNo.gender.im.length}</TableCell>

              <TableCell>
                <AnalysisCountPatients
                  IoDatas={sigNo.gender.im}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <AnalysisCountHosday
                  IoDatas={sigNo.gender.im}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => setSelectedDatas(sigNo.gender.im)}>
                  자세히
                </Button>
              </TableCell>
            </TableRow>
          )}
          {sigNo.gender.cm.length > 0 && (
            <TableRow>
              <TableCell>Castrated Male</TableCell>
              <TableCell>{sigNo.gender.cm.length}</TableCell>

              <TableCell>
                <AnalysisCountPatients
                  IoDatas={sigNo.gender.cm}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <AnalysisCountHosday
                  IoDatas={sigNo.gender.cm}
                  predate={predate}
                  postdate={postdate}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => setSelectedDatas(sigNo.gender.cm)}>
                  자세히
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div>BREEDS</div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Breed</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>일평균환자수</TableHead>
            <TableHead>일평균입원일수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {Object.keys(sigNo.breed).map((breed, i) => (
            <TableRow key={i}>
              <TableCell>{breed}</TableCell>
              <TableCell>{sigNo.breed[breed].length}</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Button onClick={() => setSelectedDatas(sigNo.breed[breed])}>
                  자세히
                </Button>
              </TableCell>
            </TableRow>
          ))} */}
          {Object.entries(sigNo.breed)
            .sort((a, b) => b[1].length - a[1].length)
            .map((breed, i) => (
              <TableRow key={i}>
                <TableCell>{breed[0]}</TableCell>
                <TableCell>{breed[1].length}</TableCell>
                <TableCell>
                  <AnalysisCountPatients
                    IoDatas={breed[1]}
                    predate={predate}
                    postdate={postdate}
                  />
                </TableCell>
                <TableCell>
                  <AnalysisCountHosday
                    IoDatas={breed[1]}
                    predate={predate}
                    postdate={postdate}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => setSelectedDatas(breed[1])}>
                    자세히
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div>AGES</div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Age</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>일평균환자수</TableHead>
            <TableHead>일평균입원일수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(sigNo.age).map((num, i) =>
            Number(num) === 0 ? (
              <TableRow key={i}>
                <TableCell>Less than 1 year</TableCell>
                <TableCell>{sigNo.age[num].length}</TableCell>
                <TableCell>
                  <AnalysisCountPatients
                    IoDatas={sigNo.age[num]}
                    predate={predate}
                    postdate={postdate}
                  />
                </TableCell>
                <TableCell>
                  <AnalysisCountHosday
                    IoDatas={sigNo.age[num]}
                    predate={predate}
                    postdate={postdate}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => setSelectedDatas(sigNo.age[num])}>
                    자세히
                  </Button>
                </TableCell>
              </TableRow>
            ) : Number(num) === 20 ? (
              <TableRow key={i}>
                <TableCell>More than 20 years</TableCell>
                <TableCell>{sigNo.age['20'].length}</TableCell>
                <TableCell>
                  <AnalysisCountPatients
                    IoDatas={sigNo.age['20']}
                    predate={predate}
                    postdate={postdate}
                  />
                </TableCell>
                <TableCell>
                  <AnalysisCountHosday
                    IoDatas={sigNo.age['20']}
                    predate={predate}
                    postdate={postdate}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => setSelectedDatas(sigNo.age['20'])}>
                    자세히
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={i}>
                <TableCell>
                  {num} ~ {Number(num) + 1} years
                </TableCell>
                <TableCell>{sigNo.age[num].length}</TableCell>
                <TableCell>
                  <AnalysisCountPatients
                    IoDatas={sigNo.age[num]}
                    predate={predate}
                    postdate={postdate}
                  />
                </TableCell>
                <TableCell>
                  <AnalysisCountHosday
                    IoDatas={sigNo.age[num]}
                    predate={predate}
                    postdate={postdate}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => setSelectedDatas(sigNo.age[num])}>
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
