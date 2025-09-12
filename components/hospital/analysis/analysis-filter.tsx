import { useEffect, useState } from 'react'
import { IcuIo } from './analysis-type'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { Checkbox } from '@/components/ui/checkbox'
import { set } from 'date-fns'
import { Button } from '@/components/ui/button'
import { se } from 'date-fns/locale'

type Props = {
  IoDatas: IcuIo[] | null
  setFilteredDatas: React.Dispatch<React.SetStateAction<IcuIo[]>>
}
export default function AnalysisFilter({ IoDatas, setFilteredDatas }: Props) {
  const [filter, setFilter] = useState<{
    species: string[]
    breed: string[]
    gender: string[]
    age: number[]
  }>({
    species: [],
    breed: [],
    gender: [],
    age: [],
  })
  const [breeds, setBreeds] = useState<string[]>([])
  const [isChangedFilter, setIsChangedFilter] = useState(false)

  useEffect(() => {
    const breednames: string[] = []
    IoDatas &&
      IoDatas &&
      IoDatas.forEach((ioData) => {
        if (ioData && ioData.icu_io_tags) {
          const ioTagArray = ioData.icu_io_tags.split('#')
          const ioBreed = String(ioTagArray[2]) ?? ''
          breednames.push(ioBreed)
        }
      })
    // const predata = {
    //   species: ['canine', 'feline', 'other'],
    //   breed: [...new Set(breednames)],
    //   gender: ['im', 'cm', 'if', 'sf', ''],
    //   age: [
    //     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    //   ],
    // }
    // setFilter(predata)
    setBreeds([...new Set(breednames)])
    setIsChangedFilter(false)
    // im: [], cm: [], if: [], sf
  }, [IoDatas])
  const ages = {
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
  }
  const filtering = () => {
    const preFilteredDatas: IcuIo[] = IoDatas ? [...IoDatas] : []
    let filteredDatas: IcuIo[] = []
    // IoDatas &&
    //   IoDatas.forEach((ioData) => {
    //     if (ioData && ioData.icu_io_tags && ioData.age_in_days) {
    //       const ioTagArray = ioData.icu_io_tags.split('#')
    //       const ioSpecies = ioTagArray[1] ?? ''
    //       const ioBreed = String(ioTagArray[2]) ?? ''
    //       const iogender = ioTagArray[3] ?? ''
    //       const ioAge = ioData.age_in_days ?? 1
    //       const ageyear =
    //         Number(ioAge) && Number(ioAge) > 0
    //           ? Math.floor(Number(ioAge) / 365)
    //           : 0
    //       if (
    //         filter.species.includes(ioSpecies) &&
    //         filter.breed.includes(ioBreed) &&
    //         filter.gender.includes(iogender) &&
    //         (filter.age.includes(ageyear) ||
    //           (ageyear > 19 && filter.age.includes(19)))
    //       ) {
    //         preFilteredDatas.push(ioData)
    //       }
    //     }
    //   })

    filter && filter.species.length > 0
      ? filteredDatas.push(...speciesfilter(preFilteredDatas))
      : filteredDatas.push(...preFilteredDatas)
    filter &&
      filter.breed.length > 0 &&
      (filteredDatas = [...breedfilter(filteredDatas)])
    filter &&
      filter.gender.length > 0 &&
      (filteredDatas = [...genderfilter(filteredDatas)])
    filter &&
      filter.age.length > 0 &&
      (filteredDatas = [...agefilter(filteredDatas)])
    setFilteredDatas(filteredDatas)
    setIsChangedFilter(false)
  }

  const speciesfilter = (predatas: IcuIo[]) => {
    const filtreddata: IcuIo[] = []
    predatas.forEach((ioData) => {
      if (ioData && ioData.icu_io_tags) {
        const ioTagArray = ioData.icu_io_tags.split('#')
        const iospecies = ioTagArray[1] ?? ''
        if (filter.species.includes(iospecies)) {
          filtreddata.push(ioData)
        }
      }
    })
    return filtreddata
  }
  const agefilter = (predatas: IcuIo[]) => {
    const filtreddata: IcuIo[] = []
    predatas.forEach((ioData) => {
      if (ioData && ioData.age_in_days) {
        const ioAge = ioData.age_in_days ?? 0
        const ageyear =
          Number(ioAge) && Number(ioAge) > 0
            ? Math.floor(Number(ioAge) / 365)
            : 0
        if (filter.age.includes(ageyear)) {
          filtreddata.push(ioData)
        }
      }
    })
    return filtreddata
  }
  const genderfilter = (predatas: IcuIo[]) => {
    const filtreddata: IcuIo[] = []
    predatas.forEach((ioData) => {
      if (ioData && ioData.icu_io_tags) {
        const ioTagArray = ioData.icu_io_tags.split('#')
        const iogender = ioTagArray[3] ?? ''
        if (filter.gender.includes(iogender)) {
          filtreddata.push(ioData)
        }
      }
    })
    return filtreddata
  }
  const breedfilter = (predatas: IcuIo[]) => {
    const filtreddata: IcuIo[] = []
    predatas.forEach((ioData) => {
      if (ioData && ioData.icu_io_tags) {
        const ioTagArray = ioData.icu_io_tags.split('#')
        const ioBreed = String(ioTagArray[2]) ?? ''
        if (filter.breed.includes(ioBreed)) {
          filtreddata.push(ioData)
        }
      }
    })
    return filtreddata
  }
  const resetFilter = () => {
    setFilter({
      species: [],
      breed: [],
      gender: [],
      age: [],
    })
    IoDatas && setFilteredDatas(IoDatas)
    setIsChangedFilter(false)
  }
  return (
    <div className="m-5">
      <div>Filter</div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Species</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Checkbox
                checked={filter.species.includes('canine')}
                onCheckedChange={(checked) => {
                  checked
                    ? setFilter((prev) => ({
                        ...prev,
                        species: [...prev.species, 'canine'],
                      }))
                    : setFilter((prev) => ({
                        ...prev,
                        species: prev.species.filter((s) => s !== 'canine'),
                      }))
                  setIsChangedFilter(true)
                }}
              ></Checkbox>
              <span>canine</span>
            </MenubarItem>
            <MenubarItem
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Checkbox
                checked={filter.species.includes('feline')}
                onCheckedChange={(checked) => {
                  checked
                    ? setFilter((prev) => ({
                        ...prev,
                        species: [...prev.species, 'feline'],
                      }))
                    : setFilter((prev) => ({
                        ...prev,
                        species: prev.species.filter((s) => s !== 'feline'),
                      }))
                  setIsChangedFilter(true)
                }}
              ></Checkbox>
              <span>feline</span>
            </MenubarItem>
            <MenubarItem
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Checkbox
                checked={filter.species.includes('other')}
                onCheckedChange={(checked) => {
                  checked
                    ? setFilter((prev) => ({
                        ...prev,
                        species: [...prev.species, 'other'],
                      }))
                    : setFilter((prev) => ({
                        ...prev,
                        species: prev.species.filter((s) => s !== 'other'),
                      }))
                  setIsChangedFilter(true)
                }}
              ></Checkbox>
              <span>other</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Gender</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Checkbox
                checked={filter.gender.includes('im')}
                onCheckedChange={(checked) => {
                  checked
                    ? setFilter((prev) => ({
                        ...prev,
                        gender: [...prev.gender, 'im'],
                      }))
                    : setFilter((prev) => ({
                        ...prev,
                        gender: prev.gender.filter((s) => s !== 'im'),
                      }))
                  setIsChangedFilter(true)
                }}
              ></Checkbox>
              <span>im</span>
            </MenubarItem>
            <MenubarItem
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Checkbox
                checked={filter.gender.includes('cm')}
                onCheckedChange={(checked) => {
                  checked
                    ? setFilter((prev) => ({
                        ...prev,
                        gender: [...prev.gender, 'cm'],
                      }))
                    : setFilter((prev) => ({
                        ...prev,
                        gender: prev.gender.filter((s) => s !== 'cm'),
                      }))
                  setIsChangedFilter(true)
                }}
              ></Checkbox>
              <span>cm</span>
            </MenubarItem>
            <MenubarItem
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Checkbox
                checked={filter.gender.includes('if')}
                onCheckedChange={(checked) => {
                  checked
                    ? setFilter((prev) => ({
                        ...prev,
                        gender: [...prev.gender, 'if'],
                      }))
                    : setFilter((prev) => ({
                        ...prev,
                        gender: prev.gender.filter((s) => s !== 'if'),
                      }))
                  setIsChangedFilter(true)
                }}
              ></Checkbox>
              <span>if</span>
            </MenubarItem>
            <MenubarItem
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Checkbox
                checked={filter.gender.includes('sf')}
                onCheckedChange={(checked) => {
                  checked
                    ? setFilter((prev) => ({
                        ...prev,
                        gender: [...prev.gender, 'sf'],
                      }))
                    : setFilter((prev) => ({
                        ...prev,
                        gender: prev.gender.filter((s) => s !== 'sf'),
                      }))
                  setIsChangedFilter(true)
                }}
              ></Checkbox>
              <span>sf</span>
            </MenubarItem>
            <MenubarItem
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <span></span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Age</MenubarTrigger>
          <MenubarContent>
            {Object.keys(ages).map((key, i) => (
              <MenubarItem
                key={i}
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <Checkbox
                  checked={filter.age.includes(i)}
                  onCheckedChange={(checked) => {
                    checked
                      ? setFilter((prev) => ({
                          ...prev,
                          age: [...prev.age, i],
                        }))
                      : setFilter((prev) => ({
                          ...prev,
                          age: prev.age.filter((s) => s !== i),
                        }))
                    setIsChangedFilter(true)
                  }}
                ></Checkbox>
                <span>{i === 19 ? '20+' : '~' + (i + 1)}</span>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Breed</MenubarTrigger>
          <MenubarContent>
            {breeds.map((breed, i) => (
              <MenubarItem
                key={'breed' + i}
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <Checkbox
                  checked={filter.breed.includes(breed)}
                  onCheckedChange={(checked) => {
                    checked
                      ? setFilter((prev) => ({
                          ...prev,
                          breed: [...prev.breed, breed],
                        }))
                      : setFilter((prev) => ({
                          ...prev,
                          breed: prev.breed.filter((s) => s !== breed),
                        }))
                    setIsChangedFilter(true)
                  }}
                ></Checkbox>
                <span>{breed}</span>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="flex items-center gap-2">
        {isChangedFilter && (
          <div>
            <Button onClick={filtering}>Apply</Button>
          </div>
        )}
        <div>
          <Button onClick={resetFilter}>Reset</Button>
        </div>
      </div>
    </div>
  )
}
