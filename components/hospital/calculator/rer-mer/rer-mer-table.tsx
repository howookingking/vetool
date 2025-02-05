import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function RerMerTable() {
  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow>
          <TableHead>Nutritional Assessment Factors</TableHead>
          <TableHead>Feline Life Stage Factors</TableHead>
          <TableHead>Canine Life Stage Factors</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Neutered adults</TableCell>
          <TableCell>1.2-1.4</TableCell>
          <TableCell>1.4-1.6</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Intact adult</TableCell>
          <TableCell>1.4-1.6</TableCell>
          <TableCell>1.6-1.8</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Inactive/obese prone</TableCell>
          <TableCell>1.0</TableCell>
          <TableCell>1.0-1.2</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Weight loss</TableCell>
          <TableCell>0.8</TableCell>
          <TableCell>1.0</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Gestation</TableCell>
          <TableCell>1.6-2.0</TableCell>
          <TableCell>3.0 (for last 21 days)</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Lactation (based on number of offspring and weeks of lactation)
          </TableCell>
          <TableCell>2.0-6.0</TableCell>
          <TableCell>3.0 to ≥6.0</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Growth</TableCell>
          <TableCell>2.5</TableCell>
          <TableCell>
            {'<4 mo: 3.0'} <br />
            {'>=4 mo: 2.0'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Work</TableCell>
          <TableCell>-</TableCell>
          <TableCell>
            Light: 1.6-2.0 <br />
            Moderate: 2.0-5.0 <br />
            Heavy: 5.0-11.0
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
