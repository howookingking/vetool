'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils/utils'
import { AuroraBackground } from '@/components/company/main/pricing/ui/aurora-background'
import { PLANS } from '@/constants/company/main'
import Link from 'next/link'
import { OPEN_KAKAO_URL } from '../../ui/open-kakao'

type Props = {
  plan: (typeof PLANS)[number]
}

const HoverButton = ({
  value,
  highlighted,
}: {
  value: string
  highlighted: boolean
}) => {
  return (
    <Link href={OPEN_KAKAO_URL} target="_blank" className="w-full">
      <button
        className={cn(
          'w-full items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2 shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)] transition-all hover:text-primary hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]',
          highlighted &&
            'border-none bg-primary text-white shadow-lg hover:text-white',
        )}
      >
        <span>{value}</span>
      </button>
    </Link>
  )
}

export default function PricingCard({ plan }: Props) {
  const CardWrapper = plan.highlighted ? AuroraBackground : 'div'

  return (
    <CardWrapper className="h-full">
      <Card
        className={cn(
          'flex h-full w-full flex-col justify-between',
          plan.highlighted && 'border-2 border-primary shadow-lg',
        )}
      >
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold sm:text-3xl">
            {plan.name}
          </CardTitle>

          <CardDescription className="text-base sm:text-lg">
            {plan.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="min-h-[280px] sm:min-h-[320px]">
          <div className="mb-4 text-3xl font-bold sm:text-4xl">
            {plan.price} <span className="text-sm font-light">(VAT 별도)</span>
          </div>

          <Separator className="my-6 w-auto" />

          <ul className="mb-6 space-y-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center">
                <Check
                  className="mr-2 h-5 w-5 text-green-500"
                  strokeWidth={2}
                />
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="z-10 w-full">
          <HoverButton value={plan.cta} highlighted={plan.highlighted} />
        </CardFooter>
      </Card>
    </CardWrapper>
  )
}
