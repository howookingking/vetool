import PatientBriefInfo from '@/components/hospital/common/patient/patient-brief-info'
import { AccordionTrigger } from '@/components/ui/accordion'
import type { Species } from '@/constants/hospital/register/signalments'
import { getAgeFromAgeInDays } from '@/lib/utils/utils'

type Props = {
  species: string
  name: string
  breed: string
  owner_name: string
  inAndOutDate: string
  age_in_days: number
  icu_io_dx: string
  icu_io_cc: string
}

export default function GroupedAccordionTrigger({
  species,
  name,
  breed,
  owner_name,
  inAndOutDate,
  age_in_days,
  icu_io_dx,
  icu_io_cc,
}: Props) {
  return (
    <AccordionTrigger className="h-10 w-full hover:bg-muted/50 [&[data-state=open]]:bg-muted">
      <div className="flex w-1/6 justify-center">
        <PatientBriefInfo
          name={name}
          species={species as Species}
          breed={breed}
        />
      </div>
      <div className="w-1/6 text-center">{owner_name || '미등록'}</div>
      <div className="w-1/6 text-center">{inAndOutDate}</div>
      <div className="w-1/6 text-center">
        {getAgeFromAgeInDays(age_in_days)}
      </div>
      <div className="line-clamp-1 w-1/6 text-center" title={icu_io_dx}>
        {icu_io_dx}
      </div>
      <div className="line-clamp-1 w-1/6 text-center" title={icu_io_cc}>
        {icu_io_cc}
      </div>
    </AccordionTrigger>
  )
}
