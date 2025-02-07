import CriCalculator from '@/components/hospital/calculator/cri/cri-calculator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CRI_DRUGS } from '@/constants/hospital/icu/calculator/calculator'

export default function Cri({ weight }: { weight: string }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>CRI</CardTitle>
        <CardDescription>약물 CRI을 계산합니다</CardDescription>
      </CardHeader>

      <CardContent>
        <Accordion type="multiple">
          {CRI_DRUGS.map((drug) => (
            <AccordionItem key={drug.label} value={drug.label}>
              <AccordionTrigger>
                <div className="flex flex-col items-start">
                  <span>{drug.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {drug.volumne}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <CriCalculator weight={weight} drug={drug.value} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
