import { Input } from '@/components/ui/input'

export default function CompanyColumn({
  id,
  company,
}: {
  id: string
  company: string
}) {
  return <Input value={company} className="mx-auto w-24" />
}
