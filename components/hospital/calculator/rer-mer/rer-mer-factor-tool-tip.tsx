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

export default function FactorToolTip() {
  return (
    <HelperTooltip side="right">
      <Table className="text-sm">
        <TableCaption className="text-xs text-muted-foreground">
          <p>
            *2021 AAHA Nutrition and Weight Management Guidelines for Dogs and
            Cats
          </p>
          <p>
            *Sedentary, indoor, hopitalized pets may require less caloric intake
            than indicated above.
          </p>
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Factors</TableHead>
            <TableHead className="w-[180px] text-center text-sm font-bold">
              개
            </TableHead>
            <TableHead className="w-[180px] text-center text-sm font-bold">
              고양이
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FACTORS.map((invoice) => (
            <TableRow key={invoice.factor}>
              <TableCell className="font-medium">{invoice.factor}</TableCell>
              <TableCell className="text-center">{invoice.canine}</TableCell>
              <TableCell className="text-center">{invoice.feline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </HelperTooltip>
  )
}
