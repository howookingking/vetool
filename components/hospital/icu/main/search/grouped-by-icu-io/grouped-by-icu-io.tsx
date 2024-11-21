import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { TableCell, TableRow } from '@/components/ui/table'
import type { SearchedIcuCharts, SearchedIcuIos } from '@/types/icu/search'
import { useEffect, useState } from 'react'
import GroupedAccordionContents from './grouped-accordion-contents'
import GroupedAccordionTrigger from './grouped-accordion-trigger'
import { getSelectedCharts } from '@/lib/services/icu/search/search-charts'

export default function GroupedByIcuIo({ icuIo }: { icuIo: SearchedIcuIos }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [searchedIcuCharts, setSearchedIcuCharts] = useState<
    SearchedIcuCharts[]
  >([])

  const {
    icu_io_id,
    age_in_days,
    in_date,
    out_date,
    icu_io_dx,
    icu_io_cc,
    patient_id: { name, owner_name, species, breed },
  } = icuIo
  const inAndOutDate = `${in_date} ~ ${out_date}`

  useEffect(() => {
    if (isAccordionOpen) {
      const fetchSelectedCharts = async () => {
        const selectedIcuChartData = await getSelectedCharts(icu_io_id)

        setSearchedIcuCharts(selectedIcuChartData)
      }

      fetchSelectedCharts()
    }
  }, [icu_io_id, isAccordionOpen])

  return (
    <TableRow key={icu_io_id}>
      <TableCell colSpan={7} className="border-0 p-0 pl-[1px]">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          onValueChange={(value) => setIsAccordionOpen(!!value)}
        >
          <AccordionItem value={icu_io_id} className="border-b-0">
            <GroupedAccordionTrigger
              age_in_days={age_in_days}
              name={name}
              breed={breed}
              owner_name={owner_name ?? ''}
              inAndOutDate={inAndOutDate}
              icu_io_dx={icu_io_dx}
              icu_io_cc={icu_io_cc}
              species={species}
            />

            <GroupedAccordionContents searchedIcuCharts={searchedIcuCharts} />
          </AccordionItem>
        </Accordion>
      </TableCell>
    </TableRow>
  )
}
