import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { KCL_SUPPLEMENT_TABLE } from '@/constants/hospital/kcl'

type Props = {
  localWeight: number
  selectedKCl: string | null
  setSelectedKCl: (value: string | null) => void
}

export default function KclTable({
  localWeight,
  selectedKCl,
  setSelectedKCl,
}: Props) {
  const handleCheckboxChange = (id: string) =>
    setSelectedKCl(selectedKCl === id ? null : id)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="border-r text-center" rowSpan={2}>
            혈중 K+
            <br />
            (mEq/L)
          </TableHead>
          <TableHead className="border-r text-center" colSpan={3}>
            KCl(2mEq/mL) 첨가량(mL)
          </TableHead>
          <TableHead className="text-center" colSpan={2}>
            최대 수액속도
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="text-center">NS 500mL</TableHead>
          <TableHead className="text-center">HS 500mL</TableHead>
          <TableHead className="border-r text-center">PS 500mL</TableHead>
          <TableHead className="text-center">(mL/kg/hr)</TableHead>
          <TableHead className="text-center">(mL/hr)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {KCL_SUPPLEMENT_TABLE.map(
          ({ serumPotassium, ns500, hs500, ps500, maxFluidRate }) => (
            <TableRow key={serumPotassium}>
              <TableCell className="border-r text-center">
                {serumPotassium}
              </TableCell>

              <TableCell>
                <div className="mx-auto grid w-16 grid-cols-[auto_1fr] items-center justify-center">
                  <Checkbox
                    id={`ns-${ns500}`}
                    checked={selectedKCl === `ns-${ns500}`}
                    onCheckedChange={() => handleCheckboxChange(`ns-${ns500}`)}
                  />
                  <Label
                    className="cursor-pointer text-center"
                    htmlFor={`ns-${ns500}`}
                  >
                    {ns500}
                  </Label>
                </div>
              </TableCell>

              <TableCell>
                <div className="mx-auto grid w-16 grid-cols-[auto_1fr] items-center justify-center">
                  <Checkbox
                    id={`hs-${hs500}`}
                    checked={selectedKCl === `hs-${hs500}`}
                    onCheckedChange={() => handleCheckboxChange(`hs-${hs500}`)}
                  />
                  <Label
                    className="cursor-pointer text-center"
                    htmlFor={`hs-${hs500}`}
                  >
                    {hs500}
                  </Label>
                </div>
              </TableCell>

              <TableCell className="border-r">
                <div className="mx-auto grid w-16 grid-cols-[auto_1fr] items-center justify-center">
                  <Checkbox
                    id={`ps-${ps500}`}
                    checked={selectedKCl === `ps-${ps500}`}
                    onCheckedChange={() => handleCheckboxChange(`ps-${ps500}`)}
                  />
                  <Label
                    className="cursor-pointer text-center"
                    htmlFor={`ps-${ps500}`}
                  >
                    {ps500}
                  </Label>
                </div>
              </TableCell>

              <TableCell className="text-center">{maxFluidRate}</TableCell>
              <TableCell className="text-center">
                {localWeight ? (
                  (maxFluidRate * localWeight).toFixed(1)
                ) : (
                  <span className="text-destructive">체중입력</span>
                )}
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  )
}
