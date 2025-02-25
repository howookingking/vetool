import PricingCard from '@/components/company/main/pricing/pricing-card'
import PricingHeader from '@/components/company/main/pricing/pricing-header'
import { PLANS } from '@/constants/company/main'

export default function PricingPlans() {
  return (
    <section
      id="pricing"
      className="flex flex-col justify-center overflow-y-auto p-8"
    >
      <div className="container px-4 sm:px-6">
        <div className="grid items-center gap-12 sm:gap-16 lg:gap-24">
          <PricingHeader />

          <div className="grid grid-cols-1 gap-6 pb-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {PLANS.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
