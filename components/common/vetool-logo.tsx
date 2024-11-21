import { cn } from '@/lib/utils/utils'
import logo from '@/public/logo.svg'
import Image from 'next/image'

export default function VetoolLogo({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="vetool logo"
      unoptimized
      className={cn(className, 'h-8 w-auto')}
    />
  )
}
