import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function useCellAutofocus() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const orderId = searchParams.get('order-id')
    const orderTime = searchParams.get('time')

    // 🔒 query 없으면 아무 것도 안 함
    if (!orderId || !orderTime) return

    const cellInput = document.getElementById(`${orderId}&${orderTime}`)
    if (!cellInput) return

    cellInput.focus()

    // 🔥 query 제거
    router.replace(pathname as any, { scroll: false })
  }, [searchParams, router, pathname])
}
