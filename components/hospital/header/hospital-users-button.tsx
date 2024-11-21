'use client'

import { Button } from '@/components/ui/button'
import { Hospital } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function HospitalUsersButton() {
  const router = useRouter()
  const { hos_id } = useParams()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        router.push(`/hospital/${hos_id}/super`)
      }}
    >
      <Hospital size={18} />
    </Button>
  )
}
