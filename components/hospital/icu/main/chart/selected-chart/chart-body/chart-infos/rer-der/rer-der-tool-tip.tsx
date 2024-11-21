import HelperTooltip from '@/components/common/helper-tooltip'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const FACTORS = [
  {
    factor: 'Neutered adults',
    canine: '1.4 - 1.6',
    feline: '1.2 - 1.4',
  },
  {
    factor: 'Intact adult',
    canine: '1.6 - 1.8',
    feline: '1.4 - 1.6',
  },
  {
    factor: 'Inactive/obese prone',
    canine: '1.0 - 1.2',
    feline: '1.0',
  },
  {
    factor: 'Weight loss',
    canine: '1.0',
    feline: '0.8',
  },
  {
    factor: 'Gestation',
    canine: '3.0 (for last 21 days)',
    feline: '1.6 - 2.0',
  },
  {
    factor: 'Lactation',
    canine: '3.0 to ≥6.0',
    feline: '2.0 - 6.0',
  },
  {
    factor: 'Growth',
    canine: (
      <>
        {'<4 mo: 3.0'}
        <br />
        {'≥4 mo: 2.0'}
      </>
    ),
    feline: '2.5',
  },
  {
    factor: 'Work',
    canine: (
      <>
        Light: 1.6 - 2.0
        <br />
        Moderate: 2.0 - 5.0
        <br />
        Heavy: 5.0 - 11.0
      </>
    ),
    feline: '',
  },
]

export default function RerDerToolTip({
  rerCalcMethod,
}: {
  rerCalcMethod: 'a' | 'b'
}) {
  return (
    <HelperTooltip side="right">
      <div className="px-1 py-2">
        <div className="">
          <h4 className="text-base font-bold">- RER 계산</h4>
          {rerCalcMethod === 'a' ? (
            <>
              <div>개 : (몸무게) * 30 + 70 kcal/day</div>
              <div>
                <div>고양이 : (몸무게) * 40 kcal/day</div>
              </div>
            </>
          ) : (
            <div>
              개, 고양이 : 70 * (몸무게) <sup>0.75</sup> kcal/day
            </div>
          )}
        </div>

        <div className="pt-4">
          <h4 className="text-base font-bold">- DER 인자</h4>
          <Table className="text-sm">
            <TableCaption className="text-xs text-white"></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-xs text-white">
                  Factors
                </TableHead>
                <TableHead className="text-xs text-white">Canine</TableHead>
                <TableHead className="text-xs text-white">Feline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FACTORS.map((invoice) => (
                <TableRow key={invoice.factor}>
                  <TableCell className="text-xs font-medium">
                    {invoice.factor}
                  </TableCell>
                  <TableCell className="text-xs">{invoice.canine}</TableCell>
                  <TableCell className="text-xs">{invoice.feline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <p>
            * The 2021 AAHA Nutrition and Weight Management Guidelines for Dogs
            and Cats
          </p>
          <p>
            * Sedentary, indoor, hopitalized pets may require less caloric
            intake than indicated above.
          </p>
        </div>
      </div>
    </HelperTooltip>
  )
}
